import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Transaction } from '../types';

interface TransactionFormProps {
  transaction?: Transaction;
  onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ transaction, onClose }) => {
  const { categories, addTransaction, updateTransaction } = useData();
  
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
    type: 'expense',
    amount: 0,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        description: transaction.description,
        date: transaction.date,
      });
    }
  }, [transaction]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (transaction) {
        updateTransaction({ ...formData, id: transaction.id });
      } else {
        addTransaction({ ...formData, id: Date.now().toString() });
      }
      onClose();
    }
  };
  
  const filteredCategories = categories.filter(cat => cat.type === formData.type);
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {transaction ? 'Edit Transaction' : 'Add Transaction'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
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
            {filteredCategories.map(category => (
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
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
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
            {transaction ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm; 