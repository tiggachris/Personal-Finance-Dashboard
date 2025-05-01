import React, { useState, useEffect } from 'react';
import { Bill } from '../types';

interface BillFormProps {
  bill?: Bill;
  onSubmit: (bill: Omit<Bill, 'id'>) => void;
  onCancel: () => void;
}

const BillForm: React.FC<BillFormProps> = ({ bill, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Bill, 'id'>>({
    name: '',
    amount: 0,
    dueDate: '',
    paid: false,
    recurring: false,
  });

  useEffect(() => {
    if (bill) {
      setFormData({
        name: bill.name,
        amount: bill.amount,
        dueDate: bill.dueDate,
        paid: bill.paid,
        recurring: bill.recurring,
      });
    }
  }, [bill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value,
    }));
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">{bill ? 'Edit Bill' : 'Add Bill'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Bill Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter bill name"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="recurring"
              name="recurring"
              checked={formData.recurring}
              onChange={handleChange}
              className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
            />
            <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none">
              Recurring Bill
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="paid"
              name="paid"
              checked={formData.paid}
              onChange={handleChange}
              className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
            />
            <label htmlFor="paid" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none">
              Paid
            </label>
          </div>
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
            {bill ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillForm; 