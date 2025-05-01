import React, { useState, useEffect } from 'react';
import { SavingsGoal } from '../types';

interface GoalFormProps {
  goal?: SavingsGoal;
  onSubmit: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;
  onCancel: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ goal, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<SavingsGoal, 'id' | 'currentAmount'>>({
    name: '',
    targetAmount: 0,
    targetDate: '',
    color: '#0A84FF', // Default color, but no UI for changing it
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.name,
        targetAmount: goal.targetAmount,
        targetDate: goal.targetDate,
        color: goal.color,
      });
    }
  }, [goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">{goal ? 'Edit Goal' : 'Add Goal'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Goal Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter goal name"
          />
        </div>

        <div>
          <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Target Amount
          </label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-1">
            Target Date
          </label>
          <input
            type="date"
            id="targetDate"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {goal ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalForm; 