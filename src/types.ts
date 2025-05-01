export interface MonthlySpendingByCategory {
  name: string;
  value: number;
  color: string;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  paid: boolean;
  recurring: boolean;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  color: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: 'monthly' | 'yearly';
  spent: number;
}

export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
  netWorth: number;
  monthlyChange: number;
} 