import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import BudgetProgressBar from '../components/BudgetProgressBar';
import BudgetForm from '../components/BudgetForm';
import Modal from '../components/Modal';
import { useData } from '../context/DataContext';
import { Budget } from '../types';
import { forceReinitializeAppData } from '../utils/storage';

const Budgets = () => {
  const { budgets, deleteBudget } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>(undefined);
  
  useEffect(() => {
    // Force reload data on component mount
    forceReinitializeAppData();
  }, []);
  
  const handleAddBudget = () => {
    setSelectedBudget(undefined);
    setIsModalOpen(true);
  };
  
  const handleEditBudget = (budget: Budget) => {
    setSelectedBudget(budget);
    setIsModalOpen(true);
  };
  
  const handleDeleteBudget = (budget: Budget) => {
    if (window.confirm(`Are you sure you want to delete the budget for ${budget.category}?`)) {
      deleteBudget(budget.id);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBudget(undefined);
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Budgets</h1>
        
        <div className="flex gap-2 mt-3 sm:mt-0">
          <button 
            className="btn btn-primary flex items-center"
            onClick={handleAddBudget}
          >
            <Plus size={18} className="mr-1" />
            Create Budget
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <DashboardCard title="Budget Overview">
          {budgets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {budgets.map((budget) => (
                <div key={budget.id} className="card p-4 border-neutral-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{budget.category}</h4>
                    <div className="flex space-x-1">
                      <button 
                        className="p-1 text-neutral-500 hover:text-neutral-700 rounded-full hover:bg-neutral-100"
                        onClick={() => handleEditBudget(budget)}
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        className="p-1 text-neutral-500 hover:text-danger-500 rounded-full hover:bg-neutral-100"
                        onClick={() => handleDeleteBudget(budget)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <BudgetProgressBar budget={budget} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-500">
              No budgets yet. Create your first budget!
            </div>
          )}
        </DashboardCard>
      </div>
      
      <DashboardCard title="Budget Tips">
        <div className="space-y-4">
          <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
            <h4 className="font-medium text-primary-800 mb-2">50/30/20 Rule</h4>
            <p className="text-sm text-primary-700">
              Consider allocating 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.
            </p>
          </div>
          
          <div className="bg-success-50 p-4 rounded-lg border border-success-100">
            <h4 className="font-medium text-success-800 mb-2">Zero-Based Budgeting</h4>
            <p className="text-sm text-success-700">
              Assign every dollar a purpose. Make sure your income minus expenses equals zero.
            </p>
          </div>
          
          <div className="bg-warning-50 p-4 rounded-lg border border-warning-100">
            <h4 className="font-medium text-warning-800 mb-2">Automate Your Savings</h4>
            <p className="text-sm text-warning-700">
              Set up automatic transfers to your savings accounts on payday to ensure you're consistently saving.
            </p>
          </div>
        </div>
      </DashboardCard>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <BudgetForm 
          budget={selectedBudget} 
          onClose={handleCloseModal} 
        />
      </Modal>
    </div>
  );
};

export default Budgets;