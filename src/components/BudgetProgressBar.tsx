import React from 'react';
import { Budget } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

interface BudgetProgressBarProps {
  budget: Budget;
}

const BudgetProgressBar: React.FC<BudgetProgressBarProps> = ({ budget }) => {
  const { amount, spent, category } = budget;
  const percentage = Math.min(Math.round((spent / amount) * 100), 100);
  
  let progressColor = 'bg-success-500';
  if (percentage > 80 && percentage < 100) {
    progressColor = 'bg-warning-500';
  } else if (percentage >= 100) {
    progressColor = 'bg-danger-500';
  }
  
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium text-neutral-800 text-sm">{category}</span>
      </div>
      <div className="flex justify-end mb-1">
        <div className="text-sm text-neutral-600">
          <span className="font-medium">{formatCurrency(spent)}</span>
          <span> / {formatCurrency(amount)}</span>
        </div>
      </div>
      
      <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-1">
        <div 
          className={`h-2.5 rounded-full ${progressColor} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between">
        <span className="text-xs text-neutral-500">{percentage}% spent</span>
        <div className="text-sm text-neutral-600">
          {formatCurrency(amount - spent)} left
        </div>
      </div>
    </div>
  );
};

export default BudgetProgressBar;