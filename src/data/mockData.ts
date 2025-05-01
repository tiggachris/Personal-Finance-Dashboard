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
  CreditCard, 
  ShoppingBag, 
  Home, 
  Car, 
  Utensils, 
  PiggyBank, 
  Coffee, 
  Briefcase, 
  Gift, 
  Dumbbell, 
  Plane, 
  Heart, 
  Wifi, 
  Film, 
  School, 
  Smartphone, 
  Zap, 
  Droplets, 
  User, 
  BookOpen
} from 'lucide-react';

// Financial Summary data
export const financialSummary: FinancialSummary = {
  totalBalance: 15750.23,
  totalIncome: 5250.00,
  totalExpenses: 3142.75,
  savingsRate: 0.24,
  netWorth: 62400.00,
  monthlyChange: 5.0
};

// Categories
export const categories: Category[] = [
  { id: 'cat1', name: 'Salary', type: 'income', color: '#0A84FF', icon: 'Briefcase' },
  { id: 'cat2', name: 'Investments', type: 'income', color: '#30D158', icon: 'PiggyBank' },
  { id: 'cat3', name: 'Gifts', type: 'income', color: '#FF9F0A', icon: 'Gift' },
  { id: 'cat4', name: 'Side Hustle', type: 'income', color: '#BF5AF2', icon: 'Laptop' },
  { id: 'cat5', name: 'Housing', type: 'expense', color: '#FF453A', icon: 'Home' },
  { id: 'cat6', name: 'Food', type: 'expense', color: '#FF9F0A', icon: 'Utensils' },
  { id: 'cat7', name: 'Transportation', type: 'expense', color: '#0A84FF', icon: 'Car' },
  { id: 'cat8', name: 'Shopping', type: 'expense', color: '#BF5AF2', icon: 'ShoppingBag' },
  { id: 'cat10', name: 'Healthcare', type: 'expense', color: '#30D158', icon: 'Heart' },
  { id: 'cat11', name: 'Utilities', type: 'expense', color: '#FF9F0A', icon: 'Zap' },
  { id: 'cat12', name: 'Subscriptions', type: 'expense', color: '#0A84FF', icon: 'Wifi' },
  { id: 'cat13', name: 'Education', type: 'expense', color: '#BF5AF2', icon: 'BookOpen' },
  { id: 'cat14', name: 'Fitness', type: 'expense', color: '#30D158', icon: 'Dumbbell' },
  { id: 'cat15', name: 'Coffee', type: 'expense', color: '#FF9F0A', icon: 'Coffee' },
  { id: 'cat16', name: 'Travel', type: 'expense', color: '#5E5CE6', icon: 'Plane' },
];

// Transactions
export const transactions: Transaction[] = [
  {
    id: 'tx1',
    date: '2025-04-01',
    category: 'Salary',
    description: 'Monthly Salary',
    amount: 80000.00,
    type: 'income'
  },
  {
    id: 'tx2',
    date: '2025-04-02',
    category: 'Housing',
    description: 'Rent Payment',
    amount: 30000.00,
    type: 'expense'
  },
  {
    id: 'tx3',
    date: '2025-04-03',
    category: 'Food',
    description: 'Grocery Shopping',
    amount: 2500.00,
    type: 'expense'
  },
  {
    id: 'tx4',
    date: '2025-04-04',
    category: 'Transportation',
    description: 'Fuel',
    amount: 3000.00,
    type: 'expense'
  },
  {
    id: 'tx5',
    date: '2025-04-05',
    category: 'Entertainment',
    description: 'Movie Night',
    amount: 800.00,
    type: 'expense'
  },
  {
    id: 'tx6',
    date: '2025-04-06',
    category: 'Utilities',
    description: 'Electricity Bill',
    amount: 2000.00,
    type: 'expense'
  },
  {
    id: 'tx7',
    date: '2025-04-07',
    category: 'Subscriptions',
    description: 'Netflix',
    amount: 500.00,
    type: 'expense'
  },
  {
    id: 'tx8',
    date: '2025-04-08',
    category: 'Coffee',
    description: 'Cafe Coffee Day',
    amount: 400.00,
    type: 'expense'
  },
  {
    id: 'tx9',
    date: '2025-04-09',
    category: 'Shopping',
    description: 'Clothes Shopping',
    amount: 5000.00,
    type: 'expense'
  },
  {
    id: 'tx10',
    date: '2025-04-10',
    category: 'Healthcare',
    description: 'Doctor Visit',
    amount: 1200.00,
    type: 'expense'
  }
];

// Budgets
export const budgets: Budget[] = [
  { id: 'bdg1', category: 'Housing', amount: 32000.00, spent: 30000.00, period: 'monthly' },
  { id: 'bdg2', category: 'Food', amount: 4000.00, spent: 2500.00, period: 'monthly' },
  { id: 'bdg3', category: 'Transportation', amount: 4000.00, spent: 3000.00, period: 'monthly' },
  { id: 'bdg4', category: 'Entertainment', amount: 2500.00, spent: 800.00, period: 'monthly' },
  { id: 'bdg5', category: 'Shopping', amount: 7000.00, spent: 5000.00, period: 'monthly' },
  { id: 'bdg6', category: 'Healthcare', amount: 2000.00, spent: 1200.00, period: 'monthly' },
  { id: 'bdg7', category: 'Utilities', amount: 2500.00, spent: 2000.00, period: 'monthly' },
  { id: 'bdg8', category: 'Subscriptions', amount: 800.00, spent: 500.00, period: 'monthly' },
  { id: 'bdg9', category: 'Coffee', amount: 600.00, spent: 400.00, period: 'monthly' }
];

// Savings Goals
export const savingsGoals: SavingsGoal[] = [
  {
    id: 'sg1',
    name: 'Emergency Fund',
    targetAmount: 10000.00,
    currentAmount: 7500.00,
    targetDate: '2025-12-31',
    color: '#0A84FF',
  },
  {
    id: 'sg2',
    name: 'Vacation',
    targetAmount: 3000.00,
    currentAmount: 1200.00,
    targetDate: '2025-08-15',
    color: '#5E5CE6',
  },
  {
    id: 'sg3',
    name: 'New Laptop',
    targetAmount: 2000.00,
    currentAmount: 800.00,
    targetDate: '2025-10-01',
    color: '#FF9F0A',
  },
  {
    id: 'sg4',
    name: 'Home Down Payment',
    targetAmount: 50000.00,
    currentAmount: 15000.00,
    targetDate: '2027-01-01',
    color: '#30D158',
  },
];

// Bills
export const bills: Bill[] = [
  {
    id: 'bill1',
    name: 'Rent',
    amount: 30000.00,
    dueDate: '2024-03-01',
    paid: false,
    recurring: true
  },
  {
    id: 'bill2',
    name: 'Electricity',
    amount: 2000.00,
    dueDate: '2024-03-15',
    paid: false,
    recurring: true
  },
  {
    id: 'bill3',
    name: 'Internet',
    amount: 800.00,
    dueDate: '2024-03-10',
    paid: false,
    recurring: true
  }
];

// Monthly income vs expenses data
export const monthlyIncomeExpenses: MonthlyIncomeExpense[] = [
  { month: 'Jan', income: 4800, expenses: 3200 },
  { month: 'Feb', income: 4900, expenses: 3400 },
  { month: 'Mar', income: 4700, expenses: 3100 },
  { month: 'Apr', income: 4850, expenses: 3250 },
  { month: 'May', income: 5250, expenses: 3142 },
  { month: 'Jun', income: 0, expenses: 0 },
  { month: 'Jul', income: 0, expenses: 0 },
  { month: 'Aug', income: 0, expenses: 0 },
  { month: 'Sep', income: 0, expenses: 0 },
  { month: 'Oct', income: 0, expenses: 0 },
  { month: 'Nov', income: 0, expenses: 0 },
  { month: 'Dec', income: 0, expenses: 0 }
];

// Savings growth data
export const savingsGrowth: SavingsGrowth[] = [
  { month: 'Jan', amount: 1600 },
  { month: 'Feb', amount: 2100 },
  { month: 'Mar', amount: 3700 },
  { month: 'Apr', amount: 5300 },
  { month: 'May', amount: 7408 },
  { month: 'Jun', amount: 7408 },
  { month: 'Jul', amount: 7408 },
  { month: 'Aug', amount: 7408 },
  { month: 'Sep', amount: 7408 },
  { month: 'Oct', amount: 7408 },
  { month: 'Nov', amount: 7408 },
  { month: 'Dec', amount: 7408 }
];

// Get the icon component by name
export const getIconByName = (name: string) => {
  const iconMap: Record<string, React.ComponentType> = {
    CreditCard,
    ShoppingBag,
    Home,
    Car,
    Utensils,
    PiggyBank,
    Coffee,
    Briefcase,
    Gift,
    Dumbbell,
    Plane,
    Heart,
    Wifi,
    Film,
    School,
    Smartphone,
    Zap,
    Droplets,
    User,
    BookOpen
  };
  
  return iconMap[name] || User;
};