import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Download, ArrowDownUp } from 'lucide-react';
import TransactionItem from '../components/TransactionItem';
import TransactionForm from '../components/TransactionForm';
import Modal from '../components/Modal';
import { useData } from '../context/DataContext';
import { Transaction } from '../types';

const Transactions = () => {
  const { transactions: allTransactions } = useData();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined);
  
  // Update filtered transactions when allTransactions, filterType, or searchQuery changes
  useEffect(() => {
    let filtered = allTransactions;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(tx => tx.type === filterType);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(tx => 
        tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setTransactions(filtered);
  }, [allTransactions, filterType, searchQuery]);
  
  const handleFilterChange = (type: 'all' | 'income' | 'expense') => {
    setFilterType(type);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleAddTransaction = () => {
    setSelectedTransaction(undefined);
    setIsModalOpen(true);
  };
  
  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(undefined);
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        
        <div className="flex gap-2 mt-3 sm:mt-0">
          <button 
            className="btn btn-primary flex items-center"
            onClick={handleAddTransaction}
          >
            <Plus size={18} className="mr-1" />
            Add Transaction
          </button>
          <button className="btn btn-secondary flex items-center">
            <Download size={18} className="mr-1" />
            Export
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-card border border-neutral-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search transactions..."
              className="input pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-neutral-100 rounded-lg p-1">
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  filterType === 'all' ? 'bg-white shadow-sm text-neutral-800' : 'text-neutral-600'
                }`}
                onClick={() => handleFilterChange('all')}
              >
                All
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  filterType === 'income' ? 'bg-white shadow-sm text-neutral-800' : 'text-neutral-600'
                }`}
                onClick={() => handleFilterChange('income')}
              >
                Income
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  filterType === 'expense' ? 'bg-white shadow-sm text-neutral-800' : 'text-neutral-600'
                }`}
                onClick={() => handleFilterChange('expense')}
              >
                Expense
              </button>
            </div>
            
            <button className="btn btn-secondary py-1 px-3 flex items-center">
              <Filter size={16} className="mr-1" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="btn btn-secondary py-1 px-3 flex items-center">
              <ArrowDownUp size={16} className="mr-1" />
              <span className="hidden sm:inline">Sort</span>
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="overflow-y-auto max-h-[600px]">
            {transactions.length > 0 ? (
              transactions.map(transaction => (
                <div 
                  key={transaction.id} 
                  onClick={() => handleEditTransaction(transaction)}
                  className="cursor-pointer hover:bg-neutral-50"
                >
                  <TransactionItem transaction={transaction} />
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-neutral-500">
                {allTransactions.length === 0 
                  ? "No transactions yet. Add your first transaction!" 
                  : "No transactions found. Try adjusting your filters."}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TransactionForm 
          transaction={selectedTransaction} 
          onClose={handleCloseModal} 
        />
      </Modal>
    </div>
  );
};

export default Transactions;