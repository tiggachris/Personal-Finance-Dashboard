import React from 'react';
import { SavingsGoal } from '../types';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import Modal from './Modal';

interface SavingsGoalCardProps {
  goal: SavingsGoal;
  onEdit: () => void;
  onDelete: () => void;
  onAddSavings: (goal: SavingsGoal, amount: number) => void;
  balance: number;
}

const SavingsGoalCard: React.FC<SavingsGoalCardProps> = ({ goal, onEdit, onDelete, onAddSavings, balance }) => {
  const { name, targetAmount, currentAmount, targetDate, color } = goal;
  const percentage = Math.round((currentAmount / targetAmount) * 100);
  const formattedDate = format(new Date(targetDate), 'MMM d, yyyy');
  const [showInput, setShowInput] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [error, setError] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [showTargetModal, setShowTargetModal] = React.useState(false);

  const handleAddClick = () => {
    setShowInput(true);
    setError('');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setError('');
  };
  const handleAddSavings = () => {
    const amt = Number(amount);
    if (!amount || isNaN(amt) || amt <= 0) return;
    if (amt > balance) {
      setError('Cannot save more than your available balance.');
      setShowModal(true);
      return;
    }
    if (currentAmount + amt > targetAmount) {
      setError('Cannot save more than the target amount for this goal.');
      setShowTargetModal(true);
      return;
    }
    onAddSavings(goal, amt);
    setAmount('');
    setShowInput(false);
    setError('');
  };
  const disableAdd = !amount || isNaN(Number(amount)) || Number(amount) <= 0;

  return (
    <div className="card p-4 mb-4 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-neutral-800">{name}</h4>
        <div className="flex items-center gap-2">
          <div className="text-sm px-2 py-1 bg-neutral-100 rounded-full">
            {formattedDate}
          </div>
          <button
            onClick={onEdit}
            className="p-1 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-100"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-neutral-600 hover:text-red-600 rounded-full hover:bg-neutral-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex justify-between mb-1">
        <span className="text-sm text-neutral-600">Progress:</span>
        <span className="text-sm font-medium">{percentage}%</span>
      </div>
      
      <div className="w-full bg-neutral-200 rounded-full h-2 mb-2">
        <div 
          className="h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      
      <div className="flex justify-between text-sm">
        <div className="text-neutral-800">
          <span className="font-medium">{formatCurrency(currentAmount)}</span>
          <span className="text-neutral-500"> saved</span>
        </div>
        <div>
          <span className="text-neutral-500">of </span>
          <span className="font-medium">{formatCurrency(targetAmount)}</span>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {showInput ? (
          <>
            <input
              type="number"
              min="1"
              className="border rounded px-2 py-1 text-sm w-24"
              value={amount}
              onChange={handleInputChange}
              placeholder="Amount"
            />
            <button className="btn btn-primary btn-sm" onClick={handleAddSavings} disabled={disableAdd}>Add</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowInput(false)}>Cancel</button>
            {error && <div className="text-danger-600 text-xs mt-1">{error}</div>}
          </>
        ) : (
          <button className="btn btn-primary btn-sm w-full" onClick={handleAddClick}>Add Savings</button>
        )}
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2 text-danger-600">Insufficient Balance</h2>
          <p className="mb-4">You do not have enough money to save this amount.</p>
          <button className="btn btn-primary" onClick={() => setShowModal(false)}>OK</button>
        </div>
      </Modal>
      <Modal isOpen={showTargetModal} onClose={() => setShowTargetModal(false)}>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2 text-danger-600">Target Exceeded</h2>
          <p className="mb-4">You cannot save more than the target amount for this goal.</p>
          <button className="btn btn-primary" onClick={() => setShowTargetModal(false)}>OK</button>
        </div>
      </Modal>
    </div>
  );
};

export default SavingsGoalCard;