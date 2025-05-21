/**
 * Types for token data
 */

export interface TokenInfo {
  // Base token metadata
  address: string;  // Token mint address
  symbol: string;   // Token symbol (e.g., SOL, USDC)
  name: string;     // Full token name
  decimals: number; // Token decimals (e.g., 9 for SOL)
  
  // Optional fields
  logoURI?: string; // URL to token logo
  tags?: string[];  // Token tags for categorization
  extensions?: {
    website?: string;
    twitter?: string;
    telegram?: string;
    discord?: string;
    coingeckoId?: string;
  };
  verified?: boolean; // Whether the token is verified
  
  // Balance-related fields (populated when getting wallet data)
  balance?: number;  // Formatted token balance
  uiAmount?: number; // UI-formatted amount (with decimals applied)
  value?: number;    // USD value of the balance
} 