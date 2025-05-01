import React, { useState } from 'react';
import { Bill } from '../types';
import clsx from 'clsx';

interface CalendarProps {
  bills: Bill[];
  onBillClick?: (bill: Bill) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ bills, onBillClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getBillsForDay = (day: number) => {
    return bills.filter(bill => {
      const billDate = new Date(bill.dueDate);
      return (
        billDate.getDate() === day &&
        billDate.getMonth() === currentDate.getMonth() &&
        billDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            ←
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} className="h-24" />
        ))}

        {days.map(day => {
          const dayBills = getBillsForDay(day);
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

          return (
            <div
              key={day}
              className={clsx(
                'h-24 p-1 border border-gray-100 rounded-md',
                isToday && 'bg-blue-50'
              )}
            >
              <div className="text-sm font-medium mb-1">{day}</div>
              <div className="space-y-1">
                {dayBills.map(bill => (
                  <div
                    key={bill.id}
                    onClick={() => onBillClick?.(bill)}
                    className={clsx(
                      'text-xs p-1 rounded cursor-pointer truncate',
                      bill.paid
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    )}
                  >
                    {bill.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 