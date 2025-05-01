import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Calendar as CalendarComponent } from '../components/Calendar';
import { Bill } from '../types';
import Modal from '../components/Modal';
import BillForm from '../components/BillForm';
import { Plus, Filter } from 'lucide-react';

const CalendarPage = () => {
  const { bills, addBill, updateBill } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | undefined>(undefined);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

  const filteredBills = bills.filter(bill => {
    if (filter === 'all') return true;
    if (filter === 'paid') return bill.paid;
    if (filter === 'unpaid') return !bill.paid;
    return true;
  });

  const handleAddBill = () => {
    setSelectedBill(undefined);
    setIsModalOpen(true);
  };

  const handleEditBill = (bill: Bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBill(undefined);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Bill Calendar</h1>
        
        <div className="flex gap-2 mt-3 sm:mt-0">
          <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unpaid')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'unpaid' ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Unpaid
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'paid' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Paid
            </button>
          </div>
          
          <button 
            className="btn btn-primary flex items-center"
            onClick={handleAddBill}
          >
            <Plus size={18} className="mr-1" />
            Add Bill
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <CalendarComponent 
          bills={filteredBills}
          onBillClick={handleEditBill}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <BillForm 
          bill={selectedBill}
          onSubmit={(billData) => {
            if (selectedBill) {
              updateBill(selectedBill.id, billData);
            } else {
              addBill(billData);
            }
            handleCloseModal();
          }}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default CalendarPage; 