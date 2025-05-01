import React from 'react';
import { format, isPast, addDays } from 'date-fns';
import { Bill } from '../types';
import { Calendar, Check, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

interface BillItemProps {
  bill: Bill;
  onTogglePaid?: (id: string, paid: boolean) => void;
  onDelete?: (bill: Bill) => void;
}

const BillItem: React.FC<BillItemProps> = ({ bill, onTogglePaid, onDelete }) => {
  const { id, name, amount, dueDate, paid, recurring } = bill;
  const formattedDate = format(new Date(dueDate), 'MMM dd');
  const isPastDue = isPast(new Date(dueDate)) && !paid;
  const isComingSoon = !paid && !isPastDue && isPast(addDays(new Date(), -5));
  
  const handleToggle = () => {
    if (onTogglePaid) {
      onTogglePaid(id, !paid);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(bill);
    }
  };
  
  return (
    <div className={`
      flex items-center py-3 px-4 border-b border-neutral-200 last:border-0 
      transition-all hover:bg-neutral-50 rounded-lg group
      ${isPastDue ? 'bg-danger-50' : ''}
    `}>
      <button 
        className={`
          w-5 h-5 rounded-full mr-3 flex items-center justify-center
          border ${paid ? 'bg-success-500 border-success-500' : 'border-neutral-300'}
        `}
        onClick={handleToggle}
      >
        {paid && <Check className="h-3 w-3 text-white" />}
      </button>
      
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <span className={`font-medium ${paid ? 'text-neutral-500 line-through' : 'text-neutral-800'}`}>
            {name}
          </span>
          <div className="flex items-center gap-4">
            <span className={`font-medium ${paid ? 'text-neutral-500 line-through' : 'text-neutral-800'}`}>
              {formatCurrency(amount)}
            </span>
            <button
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-100 rounded-full text-red-600 transition-all duration-200"
              title="Delete bill"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between mt-0.5">
          {recurring && (
            <span className="text-xs bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">
              Recurring
            </span>
          )}
          
          <div className="flex items-center text-sm">
            <Calendar className="h-3 w-3 mr-1 text-neutral-500" />
            <span className={`
              ${isPastDue ? 'text-danger-600 font-medium' : 'text-neutral-500'}
              ${isComingSoon && !isPastDue ? 'text-warning-600 font-medium' : ''}
            `}>
              {isPastDue ? 'Past due: ' : ''}
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillItem;