/**
 * Utility functions for formatting various data types
 */

/**
 * Format a currency value with appropriate suffixes (K, M, B)
 * @param amount The number to format as currency
 * @param decimals Number of decimal places to show
 * @returns Formatted currency string with $ symbol
 */
export const formatCurrency = (amount: number, decimals = 1): string => {
  if (!amount && amount !== 0) return '$0';
  
  if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(decimals)}B`;
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(decimals)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(decimals)}K`;
  return `$${amount.toFixed(decimals)}`;
};

/**
 * Format a date relative to the current time
 * @param dateString ISO date string
 * @returns Formatted string like "5m ago" or "2h ago"
 */
export const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

/**
 * Format a percentage with color indication
 * @param value Percentage value
 * @param decimals Number of decimal places
 * @returns Formatted percentage with + or - prefix
 */
export const formatPercent = (value: number, decimals = 2): string => {
  if (value === null || value === undefined) return 'N/A';
  
  const isPositive = value >= 0;
  const formattedValue = Math.abs(value).toFixed(decimals);
  return `${isPositive ? '+' : '-'}${formattedValue}%`;
};

/**
 * Format a number with thousands separators
 * @param num The number to format
 * @returns Formatted number with comma separators
 */
export const formatNumber = (num: number): string => {
  if (num === null || num === undefined) return 'N/A';
  return num.toLocaleString();
};

/**
 * Format a price with appropriate precision
 * @param price The price to format
 * @returns Formatted price string with appropriate decimal places
 */
export const formatPrice = (price: number): string => {
  if (price === null || price === undefined) return 'N/A';
  
  if (price < 0.000001) return price.toExponential(2);
  if (price < 0.001) return price.toFixed(6);
  if (price < 1) return price.toFixed(4);
  if (price < 10) return price.toFixed(2);
  return price.toFixed(2);
}; 