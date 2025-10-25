/** common */
import dayjs from 'dayjs';

interface PeriodHeaderProps {
  title: string;
  period: dayjs.Dayjs;
  onPrev: () => void;
  onNext: () => void;
  store: string;
  onChangeStore: (v: string) => void;
  fileFormat: string;
  onChangeFormat: (v: string) => void;
  formatDisplay: string; // 'YYYY' | 'YYYY.MM' 등
  storeOptions: {value: string; label: string}[];
  formatOptions: {value: string; label: string}[];
};

/** Month */
interface DailySalesTableColType {
  key: string;
  date: string;
  day: string;
  cash: number;
  card: number;
  salesTotal: number;
  weeklySalesTotal: number;
  cumulativeSales: number;
  cardPercent: number;
  purchase: number;
  cumulativePurchase: number;
  variableCost: number;
  variableCostCumulative: number;
  note: string;
};

interface WeeklySalesSummaryTableColType {
  key: string;
  week: string;
  weeklyAvg?: number;
  forecast?: number;
  purchaseCost?: number;
  laborCost?: number;
  variableCost?: number;
  fixedCost?: number;
};

interface MonthlySalesTotalTableColType {
  key: string;
  label: string;
  totalIncome?: number;
  totalExpense?: number;
  totalProfit?: number;
}

/** Year */
interface YearlyTotalTableColType {
  key: string;
  month: number;
  cash: number;
  card: number;
  cardPercent: number;
  salesTotal: number;
  fixedCost: number;
  purchaseCost: number;
  laborCost: number;
  miscCost: number;
  totalCost: number;
  note?: string;
};

interface YearlySummaryTableColType {
  key: string;
  cash: number;
  card: number;
  cardPct: number;
  total: number;
  fixed: number;
  purchase: number;
  labor: number;
  misc: number;
  totalCost: number;
  netProfit: number;
};

interface MonthlySalesTableColType {
  key: string;
  avgDay: number;
  avgHoliday: number;
  avgWeekday: number;
  avgMonth: number;
};

interface MonthlyExpenseTableColType {
  key: string;
  fixed: number;
  avgPurchase: number;
  avgLabor: number;
  avgTotal: number;
};

export type {PeriodHeaderProps};
export type {DailySalesTableColType, WeeklySalesSummaryTableColType, MonthlySalesTotalTableColType};
export type {YearlyTotalTableColType, YearlySummaryTableColType, MonthlySalesTableColType, MonthlyExpenseTableColType};