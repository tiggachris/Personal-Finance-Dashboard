import React from 'react';
import { format } from 'date-fns';
import { Transaction } from '../types';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

interface TransactionItemProps {
  transaction: Transaction;
}

const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    'Salary': '#0A84FF',
    'Investments': '#30D158',
    'Gifts': '#FF9F0A',
    'Side Hustle': '#BF5AF2',
    'Housing': '#FF453A',
    'Food': '#FF9F0A',
    'Transportation': '#0A84FF',
    'Shopping': '#BF5AF2',
    'Entertainment': '#5E5CE6',
    'Healthcare': '#30D158',
    'Utilities': '#FF9F0A',
    'Subscriptions': '#0A84FF',
    'Education': '#BF5AF2',
    'Fitness': '#30D158',
    'Coffee': '#FF9F0A',
    'Travel': '#5E5CE6',
  };
  
  return colorMap[category] || '#8E8E93';
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { type, amount, category, description, date } = transaction;
  const formattedDate = format(new Date(date), 'MMM dd');
  const categoryColor = getCategoryColor(category);
  
  return (
    <div className="flex items-center py-3 border-b border-neutral-200 last:border-0 transition-all hover:bg-neutral-50 rounded-lg px-2">
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
        style={{ backgroundColor: `${categoryColor}20` }}
      >
        {type === 'income' ? (
          <ArrowUp className="h-5 w-5" style={{ color: categoryColor }} />
        ) : (
          <ArrowDown className="h-5 w-5" style={{ color: categoryColor }} />
        )}
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <span className="font-medium text-neutral-800">{description}</span>
          <span className={`font-medium ${type === 'income' ? 'text-success-600' : 'text-neutral-800'}`}>
            {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
          </span>
        </div>
        
        <div className="flex justify-between mt-0.5">
          <span className="text-sm text-neutral-500">{category}</span>
          <span className="text-sm text-neutral-500">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;