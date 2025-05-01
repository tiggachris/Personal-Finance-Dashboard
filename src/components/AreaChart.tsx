import React from 'react';
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { formatCurrency } from '../utils/formatCurrency';

interface AreaChartProps {
  data: any[];
  title: string;
  dataKey: string;
  color: string;
  gradientStartColor: string;
  gradientEndColor: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md rounded border border-neutral-200">
        <p className="font-medium text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`tooltip-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  title,
  dataKey,
  color,
  gradientStartColor,
  gradientEndColor
}) => {
  return (
    <div className="card p-5 h-full">
      <h3 className="text-lg font-medium text-neutral-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientStartColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={gradientEndColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e3e8ef" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }} 
            axisLine={{ stroke: '#e3e8ef' }}
            tickLine={{ stroke: '#e3e8ef' }}
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value)} 
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e3e8ef' }}
            tickLine={{ stroke: '#e3e8ef' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            name="Savings"
            stroke={color}
            fillOpacity={1}
            fill={`url(#gradient-${dataKey})`}
            strokeWidth={2}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;