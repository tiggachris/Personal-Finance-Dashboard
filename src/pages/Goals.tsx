import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import SavingsGoalCard from '../components/SavingsGoalCard';
import AreaChart from '../components/AreaChart';
import Modal from '../components/Modal';
import GoalForm from '../components/GoalForm';
import { useData } from '../context/DataContext';
import { SavingsGoal } from '../types';

const Goals = () => {
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal, addTransaction, financialSummary } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | undefined>(undefined);

  const handleAddGoal = () => {
    setSelectedGoal(undefined);
    setIsModalOpen(true);
  };

  const handleEditGoal = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const handleDeleteGoal = (goal: SavingsGoal) => {
    if (window.confirm(`Are you sure you want to delete the goal "${goal.name}"?`)) {
      deleteSavingsGoal(goal.id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGoal(undefined);
  };

  const handleSubmit = (goalData: Omit<SavingsGoal, 'id' | 'currentAmount'>) => {
    if (selectedGoal) {
      updateSavingsGoal({
        ...goalData,
        id: selectedGoal.id,
        currentAmount: selectedGoal.currentAmount,
        color: selectedGoal.color
      });
    } else {
      addSavingsGoal({
        ...goalData,
        id: `goal-${Date.now()}`,
        currentAmount: 0,
        color: '#0A84FF'
      });
    }
    handleCloseModal();
  };

  const handleAddSavings = (goal: SavingsGoal, amount: number) => {
    updateSavingsGoal({ ...goal, currentAmount: goal.currentAmount + amount });
    addTransaction({
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      category: goal.name,
      description: `Savings for ${goal.name}`,
      amount,
      type: 'expense',
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Savings Goals</h1>
        
        <div className="flex gap-2 mt-3 sm:mt-0">
          <button 
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            onClick={handleAddGoal}
          >
            <Plus size={20} className="mr-2" />
            Create Goal
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {savingsGoals.map(goal => (
          <SavingsGoalCard 
            key={goal.id} 
            goal={goal}
            onEdit={() => handleEditGoal(goal)}
            onDelete={() => handleDeleteGoal(goal)}
            onAddSavings={handleAddSavings}
            balance={financialSummary.totalBalance}
          />
        ))}
        {savingsGoals.length === 0 && (
          <div className="col-span-2 text-center py-8 bg-neutral-50 rounded-lg border border-neutral-200">
            <h3 className="text-lg font-medium text-neutral-600 mb-2">No Savings Goals Yet</h3>
            <p className="text-neutral-500 mb-4">Create your first savings goal to start tracking your progress!</p>
            <button 
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              onClick={handleAddGoal}
            >
              <Plus size={20} className="mr-2" />
              Create Goal
            </button>
          </div>
        )}
      </div>
      
      {savingsGoals.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AreaChart 
              data={savingsGoals.map(goal => ({
                name: goal.name,
                amount: goal.currentAmount,
              }))}
              title="Savings Progress"
              dataKey="amount"
              color="#0A84FF"
              gradientStartColor="#0A84FF"
              gradientEndColor="#0A84FF"
            />
          </div>
          
          <div>
            <DashboardCard title="Savings Tips">
              <div className="space-y-4">
                <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                  <h4 className="font-medium text-primary-800 mb-2">Automate Your Savings</h4>
                  <p className="text-sm text-primary-700">
                    Set up automatic savings transfers on payday to ensure you're consistently saving.
                  </p>
                </div>
                
                <div className="bg-success-50 p-4 rounded-lg border border-success-100">
                  <h4 className="font-medium text-success-800 mb-2">Use the 24-Hour Rule</h4>
                  <p className="text-sm text-success-700">
                    Wait 24 hours before making non-essential purchases to avoid impulse buying.
                  </p>
                </div>
                
                <div className="bg-warning-50 p-4 rounded-lg border border-warning-100">
                  <h4 className="font-medium text-warning-800 mb-2">Save Windfalls</h4>
                  <p className="text-sm text-warning-700">
                    When you receive unexpected money, like a bonus or tax refund, save at least half of it.
                  </p>
                </div>
              </div>
            </DashboardCard>
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <GoalForm
          goal={selectedGoal}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Goals;