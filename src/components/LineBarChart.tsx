import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { formatCurrency } from '../utils/formatCurrency';

interface LineBarChartProps {
  data: any[];
  title: string;
  barKey: string;
  barColor: string;
  lineKey: string;
  lineColor: string;
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

const LineBarChart: React.FC<LineBarChartProps> = ({
  data,
  title,
  barKey,
  barColor,
  lineKey,
  lineColor
}) => {
  return (
    <div className="card p-5 h-full">
      <h3 className="text-lg font-medium text-neutral-800 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
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
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey={barKey} name={barKey} barSize={20} fill={barColor} />
          <Line
            type="monotone"
            dataKey={lineKey}
            name={lineKey}
            stroke={lineColor}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineBarChart;