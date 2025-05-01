import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  Plus,
  CreditCard,
  Target,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

import DashboardCard from '../components/DashboardCard';
import TransactionItem from '../components/TransactionItem';
import BudgetProgressBar from '../components/BudgetProgressBar';
import BillItem from '../components/BillItem';
import SavingsGoalCard from '../components/SavingsGoalCard';
import LineBarChart from '../components/LineBarChart';
import AreaChart from '../components/AreaChart';
import StatCard from '../components/StatCard';

import { useData } from '../context/DataContext';
import { formatCurrency } from '../utils/formatCurrency';

interface DashboardProps {
  onChangePage?: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangePage }) => {
  const { 
    transactions, 
    budgets, 
    bills, 
    savingsGoals, 
    monthlyIncomeExpenses,
    savingsGrowth,
    financialSummary
  } = useData();

  const handleNavigate = (page: string) => {
    if (onChangePage) {
      onChangePage(page);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Welcome back!</h1>
        <p className="text-neutral-600">
          Here's what's happening with your finances today.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatCard 
          title="Total Balance"
          value={formatCurrency(financialSummary.totalBalance)}
          icon={<Wallet className="h-5 w-5" />}
          change={financialSummary.monthlyChange}
          iconBgColor="rgba(10, 132, 255, 0.1)"
          iconColor="#0A84FF"
        />
        
        <StatCard 
          title="Total Income"
          value={formatCurrency(financialSummary.totalIncome)}
          icon={<ArrowUpRight className="h-5 w-5" />}
          change={10}
          iconBgColor="rgba(48, 209, 88, 0.1)"
          iconColor="#30D158"
        />
        
        <StatCard 
          title="Total Expenses"
          value={formatCurrency(financialSummary.totalExpenses)}
          icon={<ArrowDownRight className="h-5 w-5" />}
          change={-5}
          iconBgColor="rgba(255, 69, 58, 0.1)"
          iconColor="#FF453A"
        />
        
        <StatCard 
          title="Savings Rate"
          value={`${(financialSummary.savingsRate * 100).toFixed(1)}%`}
          icon={<PiggyBank size={24} />}
          iconBgColor="rgba(94, 92, 230, 0.1)"
          iconColor="#5E5CE6"
        />
      </div>
      
      {/* Chart */}
      <div className="mb-6">
        <LineBarChart 
          data={monthlyIncomeExpenses}
          title="Income vs Expenses"
          barKey="expenses"
          barColor="#FF453A"
          lineKey="income"
          lineColor="#30D158"
        />
      </div>
      
      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <DashboardCard 
          title="Recent Transactions"
        >
          <div className="overflow-y-auto max-h-[320px]">
            {transactions.length > 0 ? (
              transactions.slice(0, 5).map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <div className="text-center py-4 text-neutral-500">
                No transactions yet. Add your first transaction!
              </div>
            )}
          </div>
          <div className="mt-2 text-center">
            <button 
              onClick={() => handleNavigate('transactions')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All Transactions
            </button>
          </div>
        </DashboardCard>
        
        {/* Budget Progress */}
        <DashboardCard 
          title="Budget Progress"
        >
          <div className="overflow-y-auto max-h-[320px]">
            {budgets.length > 0 ? (
              budgets.slice(0, 4).map((budget) => (
                <BudgetProgressBar key={budget.id} budget={budget} />
              ))
            ) : (
              <div className="text-center py-4 text-neutral-500">
                No budgets yet. Create your first budget!
              </div>
            )}
          </div>
          <div className="mt-2 text-center">
            <button 
              onClick={() => handleNavigate('budgets')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View All Budgets
            </button>
          </div>
        </DashboardCard>
        
        {/* Upcoming Bills */}
        <div className="lg:col-span-1">
          <DashboardCard 
            title="Upcoming Bills"
          >
            <div className="overflow-y-auto max-h-[320px]">
              {bills.length > 0 ? (
                bills.slice(0, 4).map((bill) => (
                  <BillItem key={bill.id} bill={bill} />
                ))
              ) : (
                <div className="text-center py-4 text-neutral-500">
                  No bills yet. Add your first bill!
                </div>
              )}
            </div>
            <div className="mt-2 text-center">
              <button 
                onClick={() => handleNavigate('bills')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                View All Bills
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;