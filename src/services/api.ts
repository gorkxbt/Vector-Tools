/**
 * API Service
 * Central interface for all API interactions
 */

import { TokenInfo } from '@/types/tokens';
import { SolanaMarketData, NewPairData, TokenPrice } from '@/types/market';

// API endpoints
const API_ENDPOINTS = {
  SOLANA_PRICE: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true',
  JUPITER_TOKENS: 'https://token.jup.ag/all',
  PUMP_FUN_PAIRS: 'https://api.pump.fun/v1/new-pairs', // PumpFun API
  SOLANA_RPC: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
  BIRDEYE_BASE: 'https://public-api.birdeye.so/public/tokenlist',
};

// Delay between retries in ms (for exponential backoff)
const RETRY_DELAY = [1000, 3000, 5000];

/**
 * Helper function for API requests with retry logic
 */
async function fetchWithRetry<T>(
  url: string, 
  options: RequestInit = {}, 
  retries = 3
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      // Check if rate limited
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('retry-after') || '1', 10);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      lastError = error as Error;
      
      // Wait before retry with exponential backoff
      if (i < retries - 1) {
        await new Promise(resolve => 
          setTimeout(resolve, RETRY_DELAY[i] || RETRY_DELAY[RETRY_DELAY.length - 1])
        );
      }
    }
  }
  
  throw lastError || new Error('Failed to fetch after retries');
}

/**
 * Fetch Solana price and 24h change
 */
export const getSolanaPrice = async (): Promise<SolanaMarketData> => {
  try {
    const data = await fetchWithRetry<any>(API_ENDPOINTS.SOLANA_PRICE);
    
    return {
      price: data.solana.usd || 0,
      change24h: data.solana.usd_24h_change || 0,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error fetching Solana price:", error);
    throw new Error('Failed to fetch Solana price data');
  }
};

/**
 * Fetch token data from Jupiter Aggregator
 * This provides metadata for most Solana tokens
 */
export const getJupiterTokens = async (): Promise<TokenInfo[]> => {
  try {
    const data = await fetchWithRetry<TokenInfo[]>(API_ENDPOINTS.JUPITER_TOKENS);
    return data;
  } catch (error) {
    console.error("Error fetching Jupiter tokens:", error);
    throw new Error('Failed to fetch token data from Jupiter');
  }
};

/**
 * Get new token pairs from PumpFun
 * Main function for tracking freshly created Solana tokens
 */
export const getNewPumpFunPairs = async (): Promise<NewPairData[]> => {
  try {
    const response = await fetchWithRetry<any>(API_ENDPOINTS.PUMP_FUN_PAIRS);
    
    // Transform the API response to match our NewPairData type
    return response.pairs.map((pair: any) => ({
      address: pair.tokenAddress,
      name: pair.name || `Unknown Token (${pair.symbol})`,
      symbol: pair.symbol,
      poolAddress: pair.poolAddress,
      poolSize: pair.liquidity || 0,
      createdAt: new Date(pair.createdAt).toISOString(),
      pairWithSymbol: pair.pairedWithSymbol || 'SOL',
      pairWithAddress: pair.pairedWithAddress,
      initialPrice: pair.initialPrice || 0,
      currentPrice: pair.price || 0,
      priceChange: pair.priceChange || 0,
      volume24h: pair.volume24h || 0,
      txCount: pair.transactionCount || 0,
      holders: pair.holderCount || 0,
      verified: !!pair.verified,
      rugPullRisk: pair.rugPullRisk
    }));
  } catch (error) {
    console.error("Error fetching new PumpFun pairs:", error);
    throw new Error('Failed to fetch new token pairs');
  }
};

/**
 * Get token price by mint address
 */
export const getTokenPrice = async (mintAddress: string): Promise<TokenPrice | null> => {
  try {
    const url = `https://api.birdeye.so/v1/token/price?address=${mintAddress}`;
    
    const response = await fetchWithRetry<any>(url, {
      headers: {
        'X-API-KEY': process.env.BIRDEYE_API_KEY || '',
      }
    });
    
    if (!response || !response.data || !response.data.value) {
      return null;
    }
    
    return {
      mint: mintAddress,
      symbol: response.data.symbol || 'UNKNOWN',
      name: response.data.name || 'Unknown Token',
      price: response.data.value || 0,
      change24h: response.data.priceChange24h || 0,
      volume24h: response.data.volume24h || 0,
      marketCap: response.data.marketCap || 0,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error fetching price for token ${mintAddress}:`, error);
    return null;
  }
};

/**
 * Get token historical price data for charts
 */
export const getTokenHistoricalPrices = async (
  mintAddress: string, 
  timeframe: '1h' | '1d' | '1w' = '1d'
): Promise<{timestamp: number, price: number}[]> => {
  try {
    let interval = 'h1';
    let limit = 24;
    
    if (timeframe === '1w') {
      interval = 'd1';
      limit = 7;
    } else if (timeframe === '1h') {
      interval = 'm5';
      limit = 12;
    }
    
    const url = `https://api.birdeye.so/v1/token/price_history?address=${mintAddress}&interval=${interval}&limit=${limit}`;
    
    const response = await fetchWithRetry<any>(url, {
      headers: {
        'X-API-KEY': process.env.BIRDEYE_API_KEY || '',
      }
    });
    
    if (!response || !response.data || !response.data.items) {
      return [];
    }
    
    return response.data.items.map((item: any) => ({
      timestamp: item.unixTime,
      price: item.value
    }));
  } catch (error) {
    console.error(`Error fetching historical prices for token ${mintAddress}:`, error);
    return [];
  }
};

/**
 * Get wallet token balances from RPC node
 */
export const getWalletTokenBalances = async (
  walletAddress: string
): Promise<TokenInfo[]> => {
  try {
    // Use getTokenAccountsByOwner RPC method
    const response = await fetchWithRetry<any>(API_ENDPOINTS.SOLANA_RPC, {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenAccountsByOwner',
        params: [
          walletAddress,
          {
            programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
          },
          {
            encoding: 'jsonParsed'
          }
        ]
      })
    });
    
    if (!response || !response.result || !response.result.value) {
      return [];
    }
    
    // Get Jupiter token data to merge with balances
    const jupiterTokens = await getJupiterTokens();
    const tokenMap = new Map(jupiterTokens.map(token => [token.address, token]));
    
    // Process token accounts
    const tokenAccounts = response.result.value;
    const balances: TokenInfo[] = [];
    
    for (const account of tokenAccounts) {
      try {
        const parsedInfo = account.account.data.parsed.info;
        const mintAddress = parsedInfo.mint;
        const amount = parsedInfo.tokenAmount.uiAmount;
        
        // Skip dust amounts
        if (amount < 0.001) continue;
        
        // Get token info from Jupiter data
        const tokenInfo = tokenMap.get(mintAddress);
        
        if (tokenInfo) {
          balances.push({
            ...tokenInfo,
            // Add balance info
            balance: amount,
            uiAmount: amount,
            value: 0, // Will be calculated by the component using price data
          });
        }
      } catch (err) {
        console.error('Error parsing token account:', err);
      }
    }
    
    return balances;
  } catch (error) {
    console.error(`Error fetching balances for wallet ${walletAddress}:`, error);
    throw new Error('Failed to fetch wallet token balances');
  }
}; 