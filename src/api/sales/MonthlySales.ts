
import { ApiResponse } from "../ApiResponse";
import apiUtil from "../ApiUtil";

interface MonthDailySales {
  branchCd: string;
  registDate: string;
  cardSales: number;
  cashSales: number;
  totalSales: number;
  cardPercentage: number;
  weeklyTotalSales: number;
  monthTotalSales: number;
  expense: number;
  monthTotalExpense: number;
  variableExpense: number;
  comment: string;
};

interface MonthWeeklySales {
  branchCd: string;
  yearMonth: string;
  weekNumber: number;
  salesAvg: number;
  expectedTotalSales: number;
  totalExpense: number;
  humanResourceExpense: number;
  variableExpense: number;
  fixedExpense: number;
};

interface GetMonthlySalesResponse {
  branchCd: string;
  yearMonth: string;
  dailySales: MonthDailySales[];
  weeklySales: MonthWeeklySales[];
  monthTotalCard: number;
  monthTotalCash: number;
  monthTotalSales: number;
  monthTotalExpense: number;
  monthTotalProfit: number;
};

const getMonthlySales = async (branchCd: string, year: number, month: number): Promise<ApiResponse<GetMonthlySalesResponse>> => {
  if(!branchCd?.trim() || !year || !month) throw new Error('branchCd, year and month are required');

  const param = new URLSearchParams();
  param.set('branchCd', branchCd);
  param.set('year', year.toString());
  param.set('month', month.toString());

  const path = apiUtil.API.SALES.MONTH.path + `?${param.toString()}`;

  return await apiUtil.get(path)
    .then(res => {
      if(res.status === 200) return res.json().then(data => data);
      else throw new Error('Failed to get monthly sales');
    });
};

export {getMonthlySales};
export type {MonthDailySales, MonthWeeklySales, GetMonthlySalesResponse};

