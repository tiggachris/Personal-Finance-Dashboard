/**
 * Formats a number as Indian Rupees (₹)
 * @param amount - The amount to format
 * @returns A string with the formatted amount
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}; 