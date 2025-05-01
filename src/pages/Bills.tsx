import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import BillItem from '../components/BillItem';
import Modal from '../components/Modal';
import BillForm from '../components/BillForm';
import { Calendar } from '../components/Calendar';
import { useData } from '../context/DataContext';
import { Bill } from '../types';

const Bills = () => {
  const { bills, addBill, updateBill, deleteBill } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | undefined>(undefined);

  const upcomingBills = bills.filter(bill => !bill.paid);
  const paidBills = bills.filter(bill => bill.paid);

  const handleAddBill = () => {
    setSelectedBill(undefined);
    setIsModalOpen(true);
  };

  const handleEditBill = (bill: Bill) => {
    setSelectedBill(bill);
    setIsModalOpen(true);
  };

  const handleDeleteBill = (bill: Bill) => {
    if (window.confirm(`Are you sure you want to delete the bill for ${bill.name}?`)) {
      deleteBill(bill.id);
    }
  };

  const handleTogglePaid = (id: string, paid: boolean) => {
    const bill = bills.find(b => b.id === id);
    if (bill) {
      updateBill({ ...bill, paid });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBill(undefined);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Bills & Payments</h1>
        <button 
          onClick={handleAddBill}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add New Bill
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCard title="Upcoming Bills">
            <div className="overflow-y-auto max-h-[400px]">
              {upcomingBills.length > 0 ? (
                upcomingBills.map(bill => (
                  <BillItem 
                    key={bill.id} 
                    bill={bill} 
                    onTogglePaid={handleTogglePaid}
                    onDelete={handleDeleteBill}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-neutral-500">
                  No upcoming bills. You're all caught up!
                </div>
              )}
            </div>
          </DashboardCard>
          
          <DashboardCard title="Paid Bills" className="mt-6">
            <div className="overflow-y-auto max-h-[300px]">
              {paidBills.length > 0 ? (
                paidBills.map(bill => (
                  <BillItem 
                    key={bill.id} 
                    bill={bill} 
                    onTogglePaid={handleTogglePaid}
                    onDelete={handleDeleteBill}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-neutral-500">
                  No paid bills yet.
                </div>
              )}
            </div>
          </DashboardCard>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Calendar</h3>
            <Calendar 
              bills={bills}
              onBillClick={handleEditBill}
            />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <BillForm 
          bill={selectedBill}
          onSubmit={(billData) => {
            if (selectedBill) {
              updateBill({ ...billData, id: selectedBill.id });
            } else {
              addBill({ ...billData, id: `bill-${Date.now()}` });
            }
            handleCloseModal();
          }}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Bills;