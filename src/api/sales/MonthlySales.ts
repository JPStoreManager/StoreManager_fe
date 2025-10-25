
import apiUtil from "../ApiUtil";

interface MonthlySales {
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

interface GetMonthlySalesResponse {
  dailySales: MonthlySales[];
};

const getMonthlySales = async (branchCd: string, year: number, month: number): Promise<GetMonthlySalesResponse> => {
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
export type {MonthlySales, GetMonthlySalesResponse};

