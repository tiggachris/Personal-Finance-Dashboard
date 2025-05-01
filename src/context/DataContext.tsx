import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Transaction, 
  Category, 
  Budget, 
  SavingsGoal, 
  Bill, 
  FinancialSummary,
  MonthlyIncomeExpense,
  SavingsGrowth
} from '../types/index';
import {
  getTransactions,
  getCategories,
  getBudgets,
  getSavingsGoals,
  getBills,
  getFinancialSummary,
  setTransactions,
  setCategories,
  setBudgets,
  setSavingsGoals,
  setBills,
  setFinancialSummary,
  setMonthlyIncomeExpenses,
  setSavingsGrowth,
  initializeAppData
} from '../utils/storage';

// Default categories
const defaultCategories: Category[] = [
  { id: 'cat1', name: 'Salary', type: 'income', color: '#0A84FF', icon: 'Briefcase' },
  { id: 'cat2', name: 'Investments', type: 'income', color: '#30D158', icon: 'PiggyBank' },
  { id: 'cat3', name: 'Gifts', type: 'income', color: '#FF9F0A', icon: 'Gift' },
  { id: 'cat4', name: 'Side Hustle', type: 'income', color: '#BF5AF2', icon: 'Laptop' },
  { id: 'cat5', name: 'Housing', type: 'expense', color: '#FF453A', icon: 'Home' },
  { id: 'cat6', name: 'Food', type: 'expense', color: '#FF9F0A', icon: 'Utensils' },
  { id: 'cat7', name: 'Transportation', type: 'expense', color: '#0A84FF', icon: 'Car' },
  { id: 'cat8', name: 'Shopping', type: 'expense', color: '#BF5AF2', icon: 'ShoppingBag' },
  { id: 'cat9', name: 'Entertainment', type: 'expense', color: '#5E5CE6', icon: 'Film' },
  { id: 'cat10', name: 'Healthcare', type: 'expense', color: '#30D158', icon: 'Heart' },
  { id: 'cat11', name: 'Utilities', type: 'expense', color: '#FF9F0A', icon: 'Zap' },
  { id: 'cat12', name: 'Subscriptions', type: 'expense', color: '#0A84FF', icon: 'Wifi' },
  { id: 'cat13', name: 'Education', type: 'expense', color: '#BF5AF2', icon: 'BookOpen' },
  { id: 'cat14', name: 'Fitness', type: 'expense', color: '#30D158', icon: 'Dumbbell' },
  { id: 'cat15', name: 'Coffee', type: 'expense', color: '#FF9F0A', icon: 'Coffee' },
  { id: 'cat16', name: 'Travel', type: 'expense', color: '#5E5CE6', icon: 'Plane' },
];

// Default financial summary
const defaultFinancialSummary: FinancialSummary = {
  totalBalance: 0,
  totalIncome: 0,
  totalExpenses: 0,
  savingsRate: 0,
  netWorth: 0,
  monthlyChange: 0,
};

interface DataContextType {
  // Data
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  bills: Bill[];
  financialSummary: FinancialSummary;
  monthlyIncomeExpenses: MonthlyIncomeExpense[];
  savingsGrowth: SavingsGrowth[];
  
  // Actions
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  
  addBudget: (budget: Budget) => void;
  updateBudget: (id: string, updates: Partial<Omit<Budget, 'id'>>) => void;
  deleteBudget: (id: string) => void;
  
  addSavingsGoal: (goal: SavingsGoal) => void;
  updateSavingsGoal: (goal: SavingsGoal) => void;
  deleteSavingsGoal: (id: string) => void;
  
  addBill: (bill: Bill) => void;
  updateBill: (bill: Bill) => void;
  deleteBill: (id: string) => void;
  
  getFinancialSummary: () => FinancialSummary;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Initialize app data on first load
  useEffect(() => {
    // Force reinitialize data
    initializeAppData();
    
    // Update all states with fresh data
    setTransactionsState(getTransactions());
    setCategoriesState(getCategories());
    setBudgetsState(getBudgets());
    setSavingsGoalsState(getSavingsGoals());
    setBillsState(getBills());
    setFinancialSummaryState(getFinancialSummary());
  }, []);

  // State initialization from storage
  const [transactions, setTransactionsState] = useState<Transaction[]>(() => getTransactions());
  const [categories, setCategoriesState] = useState<Category[]>(() => getCategories());
  const [budgets, setBudgetsState] = useState<Budget[]>(() => getBudgets());
  const [savingsGoals, setSavingsGoalsState] = useState<SavingsGoal[]>(() => getSavingsGoals());
  const [bills, setBillsState] = useState<Bill[]>(() => getBills());
  const [financialSummary, setFinancialSummaryState] = useState<FinancialSummary>(() => getFinancialSummary());
  const [monthlyIncomeExpenses, setMonthlyIncomeExpensesState] = useState<MonthlyIncomeExpense[]>([]);
  const [savingsGrowth, setSavingsGrowthState] = useState<SavingsGrowth[]>([]);

  // Calculate financial summary whenever transactions change
  useEffect(() => {
    const calculateFinancialSummary = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // Calculate total income and expenses (all time)
      const totalIncome = transactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0);
        
      const totalExpenses = transactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0);
      
      // Calculate total balance
      const totalBalance = totalIncome - totalExpenses;
      
      // Calculate savings rate
      const savingsRate = totalIncome > 0 ? (totalIncome - totalExpenses) / totalIncome : 0;
      
      // Calculate monthly change (current month only)
      const currentMonthTransactions = transactions.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
      });
      
      const currentMonthIncome = currentMonthTransactions
        .filter(tx => tx.type === 'income')
        .reduce((sum, tx) => sum + tx.amount, 0);
        
      const currentMonthExpenses = currentMonthTransactions
        .filter(tx => tx.type === 'expense')
        .reduce((sum, tx) => sum + tx.amount, 0);
      
      const monthlyChange = currentMonthIncome > 0 ? 
        ((currentMonthIncome - currentMonthExpenses) / currentMonthIncome) * 100 : 0;
      
      const newSummary: FinancialSummary = {
        totalBalance,
        totalIncome,
        totalExpenses,
        savingsRate,
        netWorth: totalBalance, // Simplified calculation
        monthlyChange: monthlyChange || 0,
      };
      
      setFinancialSummaryState(newSummary);
      setFinancialSummary(newSummary);
    };
    
    calculateFinancialSummary();
  }, [transactions]);

  // Calculate monthly income vs expenses
  useEffect(() => {
    const calculateMonthlyData = () => {
      const currentYear = new Date().getFullYear();
      const monthlyData: MonthlyIncomeExpense[] = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      for (let i = 0; i < 12; i++) {
        const monthTransactions = transactions.filter(tx => {
          const txDate = new Date(tx.date);
          return txDate.getMonth() === i && txDate.getFullYear() === currentYear;
        });
        
        const income = monthTransactions
          .filter(tx => tx.type === 'income')
          .reduce((sum, tx) => sum + tx.amount, 0);
          
        const expenses = monthTransactions
          .filter(tx => tx.type === 'expense')
          .reduce((sum, tx) => sum + tx.amount, 0);
        
        monthlyData.push({
          month: months[i],
          income,
          expenses
        });
      }
      
      setMonthlyIncomeExpensesState(monthlyData);
      setMonthlyIncomeExpenses(monthlyData);
    };
    
    calculateMonthlyData();
  }, [transactions]);

  // Calculate savings growth based on cumulative savings
  useEffect(() => {
    const calculateSavingsGrowth = () => {
      const savingsData: SavingsGrowth[] = [];
      let cumulativeSavings = 0;
      
      monthlyIncomeExpenses.forEach(({ month, income, expenses }) => {
        cumulativeSavings += (income - expenses);
        savingsData.push({
          month,
          amount: Math.max(0, cumulativeSavings)
        });
      });
      
      setSavingsGrowthState(savingsData);
      setSavingsGrowth(savingsData);
    };
    
    calculateSavingsGrowth();
  }, [monthlyIncomeExpenses]);

  // Transaction actions
  const addTransaction = (transaction: Transaction) => {
    const newTransactions = [...transactions, transaction];
    setTransactionsState(newTransactions);
    setTransactions(newTransactions);

    // Update budget if it's an expense transaction
    if (transaction.type === 'expense') {
      const budgetToUpdate = budgets.find(b => b.category === transaction.category);
      if (budgetToUpdate) {
        const updatedBudget = {
          ...budgetToUpdate,
          spent: budgetToUpdate.spent + transaction.amount
        };
        const newBudgets = budgets.map(b => b.id === updatedBudget.id ? updatedBudget : b);
        setBudgetsState(newBudgets);
        setBudgets(newBudgets);
      }
    }
  };
  
  const updateTransaction = (transaction: Transaction) => {
    const oldTransaction = transactions.find(t => t.id === transaction.id);
    const newTransactions = transactions.map(t => t.id === transaction.id ? transaction : t);
    setTransactionsState(newTransactions);
    setTransactions(newTransactions);

    // Update budgets if expense amounts changed
    if (oldTransaction && (oldTransaction.type === 'expense' || transaction.type === 'expense')) {
      let updatedBudgets = [...budgets];

      // Remove old amount from previous category if it was an expense
      if (oldTransaction.type === 'expense') {
        const oldBudget = updatedBudgets.find(b => b.category === oldTransaction.category);
        if (oldBudget) {
          const updatedOldBudget = {
            ...oldBudget,
            spent: Math.max(0, oldBudget.spent - oldTransaction.amount)
          };
          updatedBudgets = updatedBudgets.map(b => b.id === oldBudget.id ? updatedOldBudget : b);
        }
      }

      // Add new amount to new category if it's an expense
      if (transaction.type === 'expense') {
        const newBudget = updatedBudgets.find(b => b.category === transaction.category);
        if (newBudget) {
          const updatedNewBudget = {
            ...newBudget,
            spent: newBudget.spent + transaction.amount
          };
          updatedBudgets = updatedBudgets.map(b => b.id === newBudget.id ? updatedNewBudget : b);
        }
      }

      setBudgetsState(updatedBudgets);
      setBudgets(updatedBudgets);
    }
  };
  
  const deleteTransaction = (id: string) => {
    const transactionToDelete = transactions.find(t => t.id === id);
    const newTransactions = transactions.filter(t => t.id !== id);
    setTransactionsState(newTransactions);
    setTransactions(newTransactions);

    // Update budget if it was an expense transaction
    if (transactionToDelete && transactionToDelete.type === 'expense') {
      const budgetToUpdate = budgets.find(b => b.category === transactionToDelete.category);
      if (budgetToUpdate) {
        const updatedBudget = {
          ...budgetToUpdate,
          spent: Math.max(0, budgetToUpdate.spent - transactionToDelete.amount)
        };
        const newBudgets = budgets.map(b => b.id === updatedBudget.id ? updatedBudget : b);
        setBudgetsState(newBudgets);
        setBudgets(newBudgets);
      }
    }
  };
  
  // Category actions
  const addCategory = (category: Category) => {
    const newCategories = [...categories, category];
    setCategoriesState(newCategories);
    setCategories(newCategories);
  };
  
  const updateCategory = (category: Category) => {
    const newCategories = categories.map(c => c.id === category.id ? category : c);
    setCategoriesState(newCategories);
    setCategories(newCategories);
  };
  
  const deleteCategory = (id: string) => {
    const newCategories = categories.filter(c => c.id !== id);
    setCategoriesState(newCategories);
    setCategories(newCategories);
  };
  
  // Budget actions
  const addBudget = (budget: Budget) => {
    const newBudgets = [...budgets, budget];
    setBudgetsState(newBudgets);
    setBudgets(newBudgets);
  };
  
  const updateBudget = (id: string, updates: Partial<Omit<Budget, 'id'>>) => {
    const budgetToUpdate = budgets.find(b => b.id === id);
    if (!budgetToUpdate) return;

    const updatedBudget: Budget = {
      ...budgetToUpdate,
      ...updates
    };

    const newBudgets = budgets.map(b => b.id === id ? updatedBudget : b);
    setBudgetsState(newBudgets);
    setBudgets(newBudgets);
  };
  
  const deleteBudget = (id: string) => {
    const newBudgets = budgets.filter(b => b.id !== id);
    setBudgetsState(newBudgets);
    setBudgets(newBudgets);
  };
  
  // Savings goal actions
  const addSavingsGoal = (goal: SavingsGoal) => {
    const newGoals = [...savingsGoals, goal];
    setSavingsGoalsState(newGoals);
    setSavingsGoals(newGoals);
  };
  
  const updateSavingsGoal = (goal: SavingsGoal) => {
    const newGoals = savingsGoals.map(g => g.id === goal.id ? goal : g);
    setSavingsGoalsState(newGoals);
    setSavingsGoals(newGoals);
  };
  
  const deleteSavingsGoal = (id: string) => {
    const newGoals = savingsGoals.filter(g => g.id !== id);
    setSavingsGoalsState(newGoals);
    setSavingsGoals(newGoals);
  };
  
  // Bill actions
  const addBill = (bill: Bill) => {
    const newBills = [...bills, bill];
    setBillsState(newBills);
    setBills(newBills);
  };
  
  const updateBill = (bill: Bill) => {
    const newBills = bills.map(b => b.id === bill.id ? bill : b);
    setBillsState(newBills);
    setBills(newBills);
  };
  
  const deleteBill = (id: string) => {
    const newBills = bills.filter(b => b.id !== id);
    setBillsState(newBills);
    setBills(newBills);
  };

  const value: DataContextType = {
    // Data
    transactions,
    categories,
    budgets,
    savingsGoals,
    bills,
    financialSummary,
    monthlyIncomeExpenses,
    savingsGrowth,
    
    // Actions
    addTransaction,
    updateTransaction,
    deleteTransaction,
    
    addCategory,
    updateCategory,
    deleteCategory,
    
    addBudget,
    updateBudget,
    deleteBudget,
    
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    
    addBill,
    updateBill,
    deleteBill,
    
    getFinancialSummary: () => financialSummary,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext; 