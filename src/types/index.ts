export interface Metric {
  title: string;
  value: number | string;
  trend: number; // Positive for increase, negative for decrease
}

export interface Transaction {
  id: string;
  customer: {
    name: string;
    avatar: string;
  };
  date: string; // ISO date string
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

export interface FilterOptions {
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  status: 'all' | 'completed' | 'pending' | 'failed';
}