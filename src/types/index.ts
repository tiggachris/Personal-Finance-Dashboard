import { LucideIcon } from 'lucide-react';

export interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
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
  spent: number;
  period: 'monthly' | 'yearly';
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
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

export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
  netWorth: number;
  monthlyChange: number;
}

export interface MonthlyIncomeExpense {
  month: string;
  income: number;
  expenses: number;
}

export interface SavingsGrowth {
  month: string;
  amount: number;
}