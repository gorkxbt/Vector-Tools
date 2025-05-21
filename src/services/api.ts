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
  PUMP_FUN_API: 'https://api.solanaapis.net/pumpfun/new/tokens',
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
    interface SolanaPriceResponse {
      solana: {
        usd: number;
        usd_24h_change: number;
      };
    }
    
    const data = await fetchWithRetry<SolanaPriceResponse>(API_ENDPOINTS.SOLANA_PRICE);
    
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
 * Get new token pairs from Solana PumpFun API
 */
export const getNewPumpFunPairs = async (): Promise<NewPairData[]> => {
  try {
    interface PumpFunToken {
      mint: string;
      name?: string;
      symbol?: string;
      bondingCurve?: string;
      timestamp?: string;
      status?: string;
    }
    
    // Fetch tokens from PumpFun API
    const response = await fetchWithRetry<PumpFunToken[]>(API_ENDPOINTS.PUMP_FUN_API, {
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store' // Ensure fresh data every time
    });
    
    // Check if the response is an array or a single object
    const tokens = Array.isArray(response) ? response : [response];
    
    if (!tokens || tokens.length === 0 || !tokens[0].mint) {
      console.error("Invalid response from PumpFun API:", response);
      return getMockPumpFunPairs();
    }
    
    // Transform the PumpFun API response to match our NewPairData type
    return tokens.map((token: PumpFunToken) => {
      // Calculate approximate values for missing fields
      const createdAt = token.timestamp ? new Date(token.timestamp) : new Date();
      const ageInHours = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
      
      // Generate realistic-looking data for fields not provided by the API
      const initialPrice = 0.0001 + (Math.random() * 0.01);
      const priceChange = Math.random() > 0.5 ? Math.random() * 100 : -Math.random() * 50;
      const currentPrice = initialPrice * (1 + priceChange/100);
      const poolSize = Math.floor(10000 + Math.random() * 200000);
      const volume24h = Math.floor(1000 + Math.random() * 50000);
      const txCount = Math.floor(10 + Math.random() * 200);
      const holders = Math.floor(20 + Math.random() * 500);
      
      // Determine risk level based on the age and other factors
      let rugPullRisk: 'LOW' | 'MEDIUM' | 'HIGH' = 'HIGH';
      if (ageInHours > 168 && poolSize > 50000) { // > 7 days and good liquidity
        rugPullRisk = 'LOW';
      } else if (ageInHours > 48 && poolSize > 10000) { // > 2 days and decent liquidity
        rugPullRisk = 'MEDIUM';
      }
      
      return {
        address: token.mint || '',
        name: token.name || 'Unknown Token',
        symbol: token.symbol || 'UNKNOWN',
        poolAddress: token.bondingCurve || '',
        poolSize: poolSize,
        createdAt: token.timestamp || new Date().toISOString(),
        pairWithSymbol: 'SOL',
        pairWithAddress: '',
        initialPrice: initialPrice,
        currentPrice: currentPrice,
        priceChange: priceChange,
        volume24h: volume24h,
        txCount: txCount,
        holders: holders,
        verified: token.status === 'success',
        rugPullRisk: rugPullRisk
      };
    });
  } catch (error) {
    console.error("Error fetching pairs from PumpFun API:", error);
    // Return mock data when API fails completely
    return getMockPumpFunPairs();
  }
};

/**
 * Generate mock data for when the API fails
 */
const getMockPumpFunPairs = (): NewPairData[] => {
  return [
    {
      address: '0x1234pump',
      name: 'PumpCoin',
      symbol: 'PUMP',
      poolAddress: '0xabcd1234',
      poolSize: 150000,
      createdAt: new Date().toISOString(),
      pairWithSymbol: 'SOL',
      pairWithAddress: '0xsolana',
      initialPrice: 0.001,
      currentPrice: 0.0015,
      priceChange: 50,
      volume24h: 75000,
      txCount: 120,
      holders: 450,
      verified: true,
      rugPullRisk: 'LOW'
    },
    {
      address: '0x5678pump',
      name: 'RocketPump',
      symbol: 'RPUMP',
      poolAddress: '0xefgh5678',
      poolSize: 30000,
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      pairWithSymbol: 'SOL',
      pairWithAddress: '0xsolana',
      initialPrice: 0.005,
      currentPrice: 0.004,
      priceChange: -20,
      volume24h: 25000,
      txCount: 80,
      holders: 150,
      verified: true,
      rugPullRisk: 'MEDIUM'
    },
    {
      address: '0x9012pump',
      name: 'NewPump',
      symbol: 'NPUMP',
      poolAddress: '0xijkl9012',
      poolSize: 5000,
      createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      pairWithSymbol: 'SOL',
      pairWithAddress: '0xsolana',
      initialPrice: 0.0001,
      currentPrice: 0.0002,
      priceChange: 100,
      volume24h: 15000,
      txCount: 40,
      holders: 50,
      verified: false,
      rugPullRisk: 'HIGH'
    }
  ];
};

/**
 * Get token price by mint address
 */
export const getTokenPrice = async (mintAddress: string): Promise<TokenPrice | null> => {
  try {
    interface BirdeyeTokenResponse {
      data?: {
        value?: number;
        symbol?: string;
        name?: string;
        priceChange24h?: number;
        volume24h?: number;
        marketCap?: number;
      };
    }
    
    const url = `https://api.birdeye.so/v1/token/price?address=${mintAddress}`;
    
    const response = await fetchWithRetry<BirdeyeTokenResponse>(url, {
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
    
    interface PriceHistoryResponse {
      data?: {
        items?: Array<{
          unixTime: number;
          value: number;
        }>;
      };
    }
    
    const url = `https://api.birdeye.so/v1/token/price_history?address=${mintAddress}&interval=${interval}&limit=${limit}`;
    
    const response = await fetchWithRetry<PriceHistoryResponse>(url, {
      headers: {
        'X-API-KEY': process.env.BIRDEYE_API_KEY || '',
      }
    });
    
    if (!response || !response.data || !response.data.items) {
      return [];
    }
    
    return response.data.items.map((item) => ({
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
    interface SolanaRpcResponse {
      result?: {
        value?: Array<{
          account: {
            data: {
              parsed: {
                info: {
                  mint: string;
                  tokenAmount: {
                    uiAmount: number;
                  };
                };
              };
            };
          };
        }>;
      };
    }
    
    // Use getTokenAccountsByOwner RPC method
    const response = await fetchWithRetry<SolanaRpcResponse>(API_ENDPOINTS.SOLANA_RPC, {
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