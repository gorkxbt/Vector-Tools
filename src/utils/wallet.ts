/**
 * Wallet utilities for Phantom wallet integration
 */

// Type definitions for Phantom wallet provider
interface PhantomProvider {
  isPhantom?: boolean;
  isConnected?: boolean;
  publicKey?: string;
  network?: string;
  connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{
    publicKey: string;
    isConnected: boolean;
    autoApprove: boolean;
  }>;
  disconnect: () => Promise<void>;
  request: (request: {
    method: string;
    params?: Record<string, unknown>;
  }) => Promise<unknown>;
}

declare global {
  interface Window {
    phantom?: {
      solana?: PhantomProvider;
    };
    solana?: PhantomProvider;
  }
}

/**
 * Gets the wallet provider (Phantom)
 */
export const getWalletProvider = (): PhantomProvider | null => {
  if (typeof window === 'undefined') return null;
  
  // Check for Phantom wallet
  const provider = window.phantom?.solana || window.solana;
  
  if (!provider?.isPhantom) {
    console.warn('Phantom wallet not found!');
    return null;
  }
  
  return provider;
};

/**
 * Connects to the Phantom wallet
 */
export const connectWallet = async (): Promise<{
  publicKey: string | null;
  connected: boolean;
  network: string | null;
}> => {
  const provider = getWalletProvider();
  
  if (!provider) {
    throw new Error('Phantom wallet not installed. Please install Phantom wallet extension to continue.');
  }
  
  try {
    const response = await provider.connect();
    
    return {
      publicKey: response.publicKey,
      connected: response.isConnected,
      network: provider.network || null
    };
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    throw new Error('Failed to connect to wallet');
  }
};

/**
 * Disconnects from the Phantom wallet
 */
export const disconnectWallet = async (): Promise<void> => {
  const provider = getWalletProvider();
  
  if (provider) {
    try {
      await provider.disconnect();
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      throw error;
    }
  }
};

/**
 * Requests a network switch to the specified network
 */
export const requestNetworkSwitch = async (network: 'mainnet-beta' | 'devnet' | 'testnet'): Promise<void> => {
  const provider = getWalletProvider();
  
  if (!provider) {
    throw new Error('Phantom wallet not installed');
  }
  
  try {
    await provider.request({
      method: 'switchNetwork',
      params: { network }
    });
  } catch (error) {
    console.error('Error switching network:', error);
    throw error;
  }
};

/**
 * Checks if the Phantom wallet is installed
 */
export const isPhantomInstalled = (): boolean => {
  return typeof window !== 'undefined' && !!(window.phantom?.solana || window.solana?.isPhantom);
};

/**
 * Formats a wallet address for display (truncated form)
 */
export const formatWalletAddress = (address: string | null): string => {
  if (!address) return '';
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
};

/**
 * Opens the Phantom wallet download page
 */
export const openPhantomInstallPage = (): void => {
  window.open('https://phantom.app/', '_blank');
}; 