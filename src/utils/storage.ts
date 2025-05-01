import { 
  Transaction, 
  Category, 
  Budget, 
  SavingsGoal, 
  Bill, 
  FinancialSummary,
  MonthlyIncomeExpense,
  SavingsGrowth
} from '../types';

import {
  transactions as mockTransactions,
  categories as mockCategories,
  budgets as mockBudgets,
  bills as mockBills,
  financialSummary as mockFinancialSummary,
  monthlyIncomeExpenses as mockMonthlyIncomeExpenses,
  savingsGrowth as mockSavingsGrowth,
  savingsGoals as mockSavingsGoals
} from '../data/mockData';

// Storage keys
const STORAGE_KEYS = {
  INITIALIZED: 'app_initialized',
  TRANSACTIONS: 'transactions',
  CATEGORIES: 'categories',
  BUDGETS: 'budgets',
  SAVINGS_GOALS: 'savingsGoals',
  BILLS: 'bills',
  FINANCIAL_SUMMARY: 'financialSummary',
  MONTHLY_INCOME_EXPENSES: 'monthlyIncomeExpenses',
  SAVINGS_GROWTH: 'savingsGrowth'
};

// Initialize app data with mock data on every refresh (for development)
export const initializeAppData = () => {
  // Force clear existing data
  localStorage.clear();
  
  // Store mock data
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(mockTransactions));
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(mockCategories));
  localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(mockBudgets));
  localStorage.setItem(STORAGE_KEYS.SAVINGS_GOALS, JSON.stringify(mockSavingsGoals));
  localStorage.setItem(STORAGE_KEYS.BILLS, JSON.stringify(mockBills));
  localStorage.setItem(STORAGE_KEYS.FINANCIAL_SUMMARY, JSON.stringify(mockFinancialSummary));
  localStorage.setItem(STORAGE_KEYS.MONTHLY_INCOME_EXPENSES, JSON.stringify(mockMonthlyIncomeExpenses));
  localStorage.setItem(STORAGE_KEYS.SAVINGS_GROWTH, JSON.stringify(mockSavingsGrowth));
  // Do NOT set STORAGE_KEYS.INITIALIZED, so it always reloads
};

// Generic get data function
export const getData = <T>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error getting data for key ${key}:`, error);
    return defaultValue;
  }
};

// Generic set data function
export const setData = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting data for key ${key}:`, error);
  }
};

// Specific data getters with proper typing
export const getTransactions = (): Transaction[] => {
  const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return data ? JSON.parse(data) : mockTransactions;
};

export const getCategories = (): Category[] => {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : mockCategories;
};

export const getBudgets = (): Budget[] => {
  const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
  return data ? JSON.parse(data) : mockBudgets;
};

export const getSavingsGoals = (): SavingsGoal[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SAVINGS_GOALS);
  return data ? JSON.parse(data) : mockSavingsGoals;
};

export const getBills = (): Bill[] => {
  const data = localStorage.getItem(STORAGE_KEYS.BILLS);
  return data ? JSON.parse(data) : mockBills;
};

export const getFinancialSummary = (): FinancialSummary => {
  const data = localStorage.getItem(STORAGE_KEYS.FINANCIAL_SUMMARY);
  return data ? JSON.parse(data) : mockFinancialSummary;
};

export const getMonthlyIncomeExpenses = (): MonthlyIncomeExpense[] => 
  getData(STORAGE_KEYS.MONTHLY_INCOME_EXPENSES, mockMonthlyIncomeExpenses);

export const getSavingsGrowth = (): SavingsGrowth[] => 
  getData(STORAGE_KEYS.SAVINGS_GROWTH, mockSavingsGrowth);

// Specific data setters
export const setTransactions = (transactions: Transaction[]) => 
  setData(STORAGE_KEYS.TRANSACTIONS, transactions);

export const setCategories = (categories: Category[]) => 
  setData(STORAGE_KEYS.CATEGORIES, categories);

export const setBudgets = (budgets: Budget[]) => 
  setData(STORAGE_KEYS.BUDGETS, budgets);

export const setSavingsGoals = (goals: SavingsGoal[]) => 
  setData(STORAGE_KEYS.SAVINGS_GOALS, goals);

export const setBills = (bills: Bill[]) => 
  setData(STORAGE_KEYS.BILLS, bills);

export const setFinancialSummary = (summary: FinancialSummary) => 
  setData(STORAGE_KEYS.FINANCIAL_SUMMARY, summary);

export const setMonthlyIncomeExpenses = (data: MonthlyIncomeExpense[]) => 
  setData(STORAGE_KEYS.MONTHLY_INCOME_EXPENSES, data);

export const setSavingsGrowth = (data: SavingsGrowth[]) => 
  setData(STORAGE_KEYS.SAVINGS_GROWTH, data);

// Clear all data (useful for testing or reset functionality)
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Force re-initialization of app data
export const forceReinitializeAppData = () => {
  localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
  initializeAppData();
}; 