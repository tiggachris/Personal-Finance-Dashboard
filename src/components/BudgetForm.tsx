import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Budget } from '../types';

interface BudgetFormProps {
  budget?: Budget;
  onClose: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ budget, onClose }) => {
  const { categories, addBudget, updateBudget } = useData();
  
  const [formData, setFormData] = useState<Omit<Budget, 'id'>>({
    category: '',
    amount: 0,
    period: 'monthly',
    spent: 0,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (budget) {
      setFormData({
        category: budget.category,
        amount: budget.amount,
        period: budget.period,
        spent: budget.spent,
      });
    }
  }, [budget]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (budget) {
        updateBudget(budget.id, formData);
      } else {
        addBudget({
          ...formData,
          spent: 0,
        });
      }
      onClose();
    }
  };
  
  // Filter categories to only show expense categories
  const expenseCategories = categories.filter(cat => cat.type === 'expense');
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {budget ? 'Edit Budget' : 'Add Budget'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Select a category</option>
            {expenseCategories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={`w-full px-3 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Period
          </label>
          <select
            name="period"
            value={formData.period}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {budget ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm; 