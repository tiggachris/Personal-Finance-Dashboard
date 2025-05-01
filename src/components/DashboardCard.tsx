import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  children, 
  className = '',
  action
}) => {
  return (
    <div className={`card p-5 animate-in ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-neutral-800">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardCard;