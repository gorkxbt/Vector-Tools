/**
 * Types for market and token pair data
 */

// Solana market data
export interface SolanaMarketData {
  price: number;
  change24h: number;
  timestamp: string;
}

// New token pair data from PumpFun
export interface NewPairData {
  address: string;       // Token mint address
  name: string;          // Token name
  symbol: string;        // Token symbol
  poolAddress: string;   // Liquidity pool address
  poolSize: number;      // Size of liquidity pool in USD
  createdAt: string;     // Creation timestamp
  pairWithSymbol: string; // Symbol of paired token (usually SOL)
  pairWithAddress: string; // Address of paired token
  initialPrice: number;   // Initial token price
  currentPrice: number;   // Current token price
  priceChange: number;    // Percent price change since creation
  volume24h: number;      // 24h trading volume
  txCount: number;        // Number of transactions
  holders: number;        // Number of token holders
  verified: boolean;      // Whether token is verified
  rugPullRisk?: string;   // Risk assessment if available ('LOW', 'MEDIUM', 'HIGH')
}

// Token price data
export interface TokenPrice {
  mint: string;         // Token mint address
  symbol: string;       // Token symbol
  name: string;         // Token name  
  price: number;        // Current price in USD
  change24h: number;    // 24h price change percentage
  volume24h: number;    // 24h trading volume
  marketCap?: number;   // Market capitalization if available
  updatedAt: string;    // Last update timestamp
}

// Market overview
export interface MarketOverview {
  solPrice: number;
  solChange24h: number;
  totalNewPairs24h: number;
  totalVolume24h: number;
  topGainers: TokenPrice[];
  topLosers: TokenPrice[];
} 