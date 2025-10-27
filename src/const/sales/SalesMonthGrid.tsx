import { TableProps } from "antd/es/table";
import { DailySalesTableColType, WeeklySalesSummaryTableColType, MonthlySalesTotalTableColType } from "../../model/sales";
import { renderMoney } from "../../util/MoneyUtils";
import { GetMonthlySalesResponse, MonthDailySales, MonthWeeklySales } from "../../api/sales/MonthlySales";
import { convertToDayjs } from "../../util/DateUtils";

const dailySalesTableCols: TableProps<DailySalesTableColType>['columns'] = [
  { title: '날짜', dataIndex: 'date', key: 'date', width: 70 },
  { title: '요일', dataIndex: 'day', key: 'day', width: 60 },
  { title: '현금', dataIndex: 'cash', key: 'cash', align: 'right' as const, render: renderMoney },
  { title: '카드', dataIndex: 'card', key: 'card', align: 'right' as const, render: renderMoney },
  { title: '매출액계', dataIndex: 'salesTotal', key: 'salesTotal', align: 'right' as const, render: renderMoney },
  { title: '주간매출액계', dataIndex: 'weeklySalesTotal', key: 'weeklySalesTotal', align: 'right' as const, render: renderMoney },
  { title: '매출누계', dataIndex: 'cumulativeSales', key: 'cumulativeSales', align: 'right' as const, render: renderMoney },
  { title: '카드%', dataIndex: 'cardPercent', key: 'cardPercent', align: 'right' as const, render: (value: number) => `${value}%` },
  { title: '매입지출', dataIndex: 'purchase', key: 'purchase', align: 'right' as const, render: renderMoney },
  { title: '매입누계', dataIndex: 'cumulativePurchase', key: 'cumulativePurchase', align: 'right' as const, render: renderMoney },
  { title: '변동비', dataIndex: 'variableCost', key: 'variableCost', align: 'right' as const, render: renderMoney },
  { title: '변동비누계', dataIndex: 'variableCostCumulative', key: 'variableCostCumulative', align: 'right' as const, render: renderMoney },
  { title: '비고', dataIndex: 'note', key: 'note' }
];

const weeklySummaryTableCols: TableProps<WeeklySalesSummaryTableColType>['columns'] = [
  { title: '', dataIndex: 'week', key: 'week', width: 90},
  { title: '주간 일평균', dataIndex: 'weeklyAvg', key: 'weeklyAvg', align: 'right' as const, render: renderMoney },
  { title: '예상 주간/월매출', dataIndex: 'forecast', key: 'forecast', align: 'right' as const, render: renderMoney },
  { title: '매입지출', dataIndex: 'purchaseCost', key: 'purchaseCost', align: 'right' as const, render: renderMoney },
  { title: '인건비', dataIndex: 'laborCost', key: 'laborCost', align: 'right' as const, render: renderMoney },
  { title: '변동비', dataIndex: 'variableCost', key: 'variableCost', align: 'right' as const, render: renderMoney },
  { title: '고정비', dataIndex: 'fixedCost', key: 'fixedCost', align: 'right' as const, render: renderMoney }
];

const monthlyTotalTableCols: TableProps<MonthlySalesTotalTableColType>['columns'] = [
  { title: '', dataIndex: 'label', key: 'label', width: 90 },
  { title: '총수입', dataIndex: 'totalIncome', key: 'totalIncome', align: 'right' as const, render: renderMoney },
  { title: '총지출', dataIndex: 'totalExpense', key: 'totalExpense', align: 'right' as const, render: renderMoney },
  { title: '총이익', dataIndex: 'totalProfit', key: 'totalProfit', align: 'right' as const, render: renderMoney }
];

const formatDailySales = (data: MonthDailySales[]): DailySalesTableColType[] => {
  return data.map(item => ({
    key: item.registDate,
    date: convertToDayjs(item.registDate).format('D일'),
    day: convertToDayjs(item.registDate).format('ddd'),
    cash: item.cashSales,
    card: item.cardSales,
    salesTotal: item.totalSales,
    weeklySalesTotal: item.weeklyTotalSales,
    cumulativeSales: item.monthTotalSales,
    cardPercent: item.cardPercentage,
    purchase: item.expense,
    cumulativePurchase: item.monthTotalExpense,
    variableCost: item.variableExpense,
    variableCostCumulative: item.variableExpense,
    note: item.comment
  }));
};

const formatWeeklySalesSummary = (data: MonthWeeklySales[]): WeeklySalesSummaryTableColType[] => {
  return data.map(item => ({
    key: item.weekNumber.toString(),
    week: item.weekNumber.toString(),
    weeklyAvg: item.salesAvg,
    forecast: item.expectedTotalSales,
    purchaseCost: item.totalExpense,
    laborCost: item.humanResourceExpense,
    variableCost: item.variableExpense,
    fixedCost: item.fixedExpense
  }));
};

const formatMonthlyTotal = (data: GetMonthlySalesResponse): MonthlySalesTotalTableColType[] => {
  return [{
    key: '1',
    label: '합계',
    totalIncome: data.monthTotalSales,
    totalExpense: data.monthTotalExpense,
    totalProfit: data.monthTotalProfit
  }];
};

export { dailySalesTableCols, weeklySummaryTableCols, monthlyTotalTableCols, formatDailySales, formatWeeklySalesSummary, formatMonthlyTotal };