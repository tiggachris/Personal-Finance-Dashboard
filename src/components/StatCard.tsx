import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: number;
  changeLabel?: string;
  iconBgColor: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeLabel,
  iconBgColor,
  iconColor
}) => {
  return (
    <div className="card p-5 flex items-start gap-4 animate-in">
      <div 
        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}
        style={{ backgroundColor: iconBgColor }}
      >
        <div style={{ color: iconColor }}>
          {icon}
        </div>
      </div>
      
      <div className="flex-1">
        <p className="text-sm text-neutral-600 mb-1">{title}</p>
        <h3 className="text-2xl font-semibold text-neutral-900 mb-1">{value}</h3>
        
        {typeof change !== 'undefined' && (
          <div className="flex items-center">
            <span className={`flex items-center text-sm mr-1
              ${change >= 0 ? 'text-success-600' : 'text-danger-600'}`}
            >
              {change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              {Math.abs(change)}%
            </span>
            {changeLabel && (
              <span className="text-sm text-neutral-500">
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;