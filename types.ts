export interface Product {
  id: string;
  title: string;
  price: number;
  image_url: string;
  video_url?: string;
  shopee_link: string;
  affiliate_link?: string;
  commission_rate?: number;
  category: string;
  rating: number;
  reviews_count: number;
  reviews?: string[];
  stock: number;
  isBestSeller?: boolean;
}

export interface ChartData {
  date: string;
  clicks: number;
  sales: number;
}

export interface SourceData {
  name: string;
  value: number;
}

export interface StatsOverview {
  totalSales: number;
  totalCommission: number;
  pendingCommission: number;
  totalClicks: number;
  conversionRate: number;
  averageTicket: number;
  epc: number;
  cancellationRate: number;
  activeProducts: number;
  growthRate: number;
  availableBalance: number;
  totalWithdrawn: number;
  nextPaymentDate: string;
}

export interface Sale {
  id: string;
  productTitle: string;
  amount: number;
  commission: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  source: string;
}
