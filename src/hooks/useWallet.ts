'use client';

import { useState, useEffect, useCallback } from 'react';
import { TokenInfo } from '@/types/tokens';
import { 
  connectWallet, 
  disconnectWallet, 
  getWalletProvider, 
  requestNetworkSwitch 
} from '@/utils/wallet';
import { getWalletTokenBalances, getTokenPrice } from '@/services/api';

/**
 * Wallet state interface
 */
interface WalletState {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  balance: number;
  tokens: TokenInfo[];
  totalValue: number;
  error: string | null;
  isCorrectNetwork: boolean;
}

/**
 * Hook return interface
 */
interface UseWalletHook {
  wallet: WalletState;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  switchToMainnet: () => Promise<void>;
}

/**
 * Custom hook for Solana wallet integration with Phantom
 */
export function useWallet(): UseWalletHook {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    connecting: false,
    address: null,
    balance: 0,
    tokens: [],
    totalValue: 0,
    error: null,
    isCorrectNetwork: false
  });

  /**
   * Refresh wallet balance and token data
   */
  const refreshBalance = useCallback(async () => {
    if (!walletState.address) return;
    
    try {
      // Get token balances from the wallet
      const tokenBalances = await getWalletTokenBalances(walletState.address);
      
      // Get token prices and calculate values
      let totalValue = 0;
      const tokensWithValue = await Promise.all(tokenBalances.map(async (token) => {
        try {
          if (token.balance && token.balance > 0) {
            const priceData = await getTokenPrice(token.address);
            if (priceData && priceData.price) {
              const value = token.balance * priceData.price;
              totalValue += value;
              return {
                ...token,
                value
              };
            }
          }
          return token;
        } catch (err) {
          console.error(`Error getting price for token ${token.symbol}:`, err);
          return token;
        }
      }));
      
      // Sort tokens by value
      const sortedTokens = tokensWithValue.sort((a, b) => 
        (b.value || 0) - (a.value || 0)
      );
      
      setWalletState(prev => ({
        ...prev,
        tokens: sortedTokens,
        totalValue,
        balance: totalValue, // Use total value as the main balance figure
      }));
    } catch (error) {
      console.error('Error refreshing wallet balance:', error);
      setWalletState(prev => ({ 
        ...prev, 
        error: 'Failed to refresh wallet data.' 
      }));
    }
  }, [walletState.address]);

  /**
   * Initialize wallet state on component mount
   */
  useEffect(() => {
    const initWallet = async () => {
      try {
        const provider = getWalletProvider();
        
        // Check if wallet is already connected
        if (provider && provider.isConnected) {
          const accounts = await provider.connect({ onlyIfTrusted: true });
          
          if (accounts && accounts.publicKey) {
            setWalletState(prev => ({
              ...prev,
              connected: true,
              address: accounts.publicKey.toString(),
              isCorrectNetwork: provider.network === 'mainnet-beta'
            }));
            
            await refreshBalance();
          }
        }
      } catch (error) {
        console.error('Failed to initialize wallet connection:', error);
        // Don't set error here as this is just initialization
      }
    };
    
    initWallet();
    
    // Define the event type for wallet connection changes
    interface WalletConnectionEvent {
      detail: {
        connected: boolean;
        address: string | null;
      }
    }
    
    // Listen for wallet connection state changes
    const handleWalletConnectionChange = (event: CustomEvent<WalletConnectionEvent['detail']>) => {
      if (event.detail && event.detail.connected) {
        setWalletState(prev => ({
          ...prev,
          connected: true,
          address: event.detail.address || null,
          error: null
        }));
        refreshBalance();
      } else {
        setWalletState(prev => ({
          ...prev,
          connected: false,
          address: null,
          balance: 0,
          tokens: [],
          totalValue: 0
        }));
      }
    };
    
    window.addEventListener('wallet-connection-change', handleWalletConnectionChange as EventListener);
    
    return () => {
      window.removeEventListener('wallet-connection-change', handleWalletConnectionChange as EventListener);
    };
  }, [refreshBalance]);

  /**
   * Connect to Phantom wallet
   */
  const connect = async () => {
    try {
      setWalletState(prev => ({ ...prev, connecting: true, error: null }));
      
      const { publicKey, connected, network } = await connectWallet();
      
      if (connected && publicKey) {
        setWalletState(prev => ({ 
          ...prev, 
          connected, 
          address: publicKey, 
          connecting: false,
          isCorrectNetwork: network === 'mainnet-beta'
        }));
        
        await refreshBalance();
      } else {
        throw new Error('Failed to connect to wallet');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      setWalletState(prev => ({ 
        ...prev, 
        connecting: false, 
        error: 'Could not connect to wallet. Please try again.' 
      }));
    }
  };

  /**
   * Disconnect from Phantom wallet
   */
  const disconnect = async () => {
    try {
      await disconnectWallet();
      setWalletState({
        connected: false,
        connecting: false,
        address: null,
        balance: 0,
        tokens: [],
        totalValue: 0,
        error: null,
        isCorrectNetwork: false
      });
    } catch (error) {
      console.error('Wallet disconnection error:', error);
      setWalletState(prev => ({ 
        ...prev, 
        error: 'Failed to disconnect wallet.' 
      }));
    }
  };

  /**
   * Switch to Solana mainnet
   */
  const switchToMainnet = async () => {
    try {
      await requestNetworkSwitch('mainnet-beta');
      setWalletState(prev => ({ ...prev, isCorrectNetwork: true }));
    } catch (error) {
      console.error('Failed to switch network:', error);
      setWalletState(prev => ({ 
        ...prev, 
        error: 'Failed to switch to Solana mainnet.' 
      }));
    }
  };

  return {
    wallet: walletState,
    connect,
    disconnect,
    refreshBalance,
    switchToMainnet
  };
} 