import React, { useState } from 'react';
import { Table, Typography, Space, Card, DatePicker, Select, Button } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

interface DailyExpenseTableType {
  key: string;
  date: string;
  cash: number;
  card: number;
  cashPlusCard: number;
  purchase: number;
  payment: number;
  tax: number;
  discount: number;
  adjustment: number;
  sum: number;
  monthlySum: number;
  cumulativeMonthlyExpense: number;
}

interface MonthlySummaryTableType {
  key: string;
  week: string;
  avgPurchaseCost: number;
  avgLaborCost: number;
  avgGeneralCost: number;
  totalExpense: number;
  forecastTotalExpense: number;
}

const dailyExpenseColumns = [
  {
    title: '날짜',
    dataIndex: 'date',
    key: 'date',
    width: 80,
  },
  {
    title: '현금',
    dataIndex: 'cash',
    key: 'cash',
    align: 'right' as const,
  },
  {
    title: '카드',
    dataIndex: 'card',
    key: 'card',
    align: 'right' as const,
  },
  {
    title: '현금+카드',
    dataIndex: 'cashPlusCard',
    key: 'cashPlusCard',
    align: 'right' as const,
  },
  {
    title: '구매',
    dataIndex: 'purchase',
    key: 'purchase',
    align: 'right' as const,
  },
  {
    title: '결제',
    dataIndex: 'payment',
    key: 'payment',
    align: 'right' as const,
  },
  {
    title: '세액',
    dataIndex: 'tax',
    key: 'tax',
    align: 'right' as const,
  },
  {
    title: '할인액',
    dataIndex: 'discount',
    key: 'discount',
    align: 'right' as const,
  },
  {
    title: '조정액',
    dataIndex: 'adjustment',
    key: 'adjustment',
    align: 'right' as const,
  },
  {
    title: '합계',
    dataIndex: 'sum',
    key: 'sum',
    align: 'right' as const,
  },
  {
    title: '합계(월별)',
    dataIndex: 'monthlySum',
    key: 'monthlySum',
    align: 'right' as const,
  },
  {
    title: '월별 누계 지출',
    dataIndex: 'cumulativeMonthlyExpense',
    key: 'cumulativeMonthlyExpense',
    align: 'right' as const,
  },
];

const monthlySummaryColumns = [
  {
    title: '',
    dataIndex: 'week',
    key: 'week',
    width: 100,
  },
  {
    title: '평균 매입 비용',
    dataIndex: 'avgPurchaseCost',
    key: 'avgPurchaseCost',
    align: 'right' as const,
  },
  {
    title: '평균 인건비',
    dataIndex: 'avgLaborCost',
    key: 'avgLaborCost',
    align: 'right' as const,
  },
  {
    title: '평균 일반 비용',
    dataIndex: 'avgGeneralCost',
    key: 'avgGeneralCost',
    align: 'right' as const,
  },
  {
    title: '총지출',
    dataIndex: 'totalExpense',
    key: 'totalExpense',
    align: 'right' as const,
  },
  {
    title: '예상 총지출',
    dataIndex: 'forecastTotalExpense',
    key: 'forecastTotalExpense',
    align: 'right' as const,
  },
];

const MonthlyExpense: React.FC = () => {
  const [period, setPeriod] = useState(dayjs('2024-04'));
  const [branch, setBranch] = useState('지점');
  const [format, setFormat] = useState('Excel');

  // TODO: 실제 데이터 fetching 로직 추가
  const dailyData: DailyExpenseTableType[] = [
    {
      key: '1',
      date: '1일',
      cash: 1000,
      card: 2000,
      cashPlusCard: 3000,
      purchase: 4000,
      payment: 1000,
      tax: 11000,
      discount: 10000,
      adjustment: 25000,
      sum: 15000,
      monthlySum: 50000,
      cumulativeMonthlyExpense: 100000,
    },
    {
      key: '2',
      date: '2일',
      cash: 1000,
      card: 2000,
      cashPlusCard: 3000,
      purchase: 4000,
      payment: 1000,
      tax: 11000,
      discount: 10000,
      adjustment: 25000,
      sum: 15000,
      monthlySum: 50000,
      cumulativeMonthlyExpense: 100000,
    },
    {
      key: '3',
      date: '3일',
      cash: 1000,
      card: 2000,
      cashPlusCard: 3000,
      purchase: 4000,
      payment: 1000,
      tax: 11000,
      discount: 10000,
      adjustment: 25000,
      sum: 15000,
      monthlySum: 50000,
      cumulativeMonthlyExpense: 100000,
    },
    {
      key: '4',
      date: '4일',
      cash: 1000,
      card: 2000,
      cashPlusCard: 3000,
      purchase: 4000,
      payment: 1000,
      tax: 11000,
      discount: 10000,
      adjustment: 25000,
      sum: 15000,
      monthlySum: 50000,
      cumulativeMonthlyExpense: 100000,
    },
    {
      key: '5',
      date: '5일',
      cash: 1000,
      card: 2000,
      cashPlusCard: 3000,
      purchase: 4000,
      payment: 1000,
      tax: 11000,
      discount: 10000,
      adjustment: 25000,
      sum: 15000,
      monthlySum: 50000,
      cumulativeMonthlyExpense: 100000,
    },
    // 추가 일자 데이터 필요 시 확장
  ];

  const summaryData: MonthlySummaryTableType[] = [
    { key: '1', week: '첫째주', avgPurchaseCost: 0, avgLaborCost: 0, avgGeneralCost: 0, totalExpense: 0, forecastTotalExpense: 0 },
    { key: '2', week: '둘째주', avgPurchaseCost: 0, avgLaborCost: 0, avgGeneralCost: 0, totalExpense: 0, forecastTotalExpense: 0 },
    { key: '3', week: '셋째주', avgPurchaseCost: 0, avgLaborCost: 0, avgGeneralCost: 0, totalExpense: 0, forecastTotalExpense: 0 },
    { key: '4', week: '넷째주', avgPurchaseCost: 0, avgLaborCost: 0, avgGeneralCost: 0, totalExpense: 0, forecastTotalExpense: 0 },
    { key: '5', week: '다섯째주', avgPurchaseCost: 0, avgLaborCost: 0, avgGeneralCost: 0, totalExpense: 0, forecastTotalExpense: 0 },
    { key: '6', week: '여섯째주', avgPurchaseCost: 0, avgLaborCost: 0, avgGeneralCost: 0, totalExpense: 0, forecastTotalExpense: 0 },
    { key: '7', week: '합계', avgPurchaseCost: 0, avgLaborCost: 0, avgGeneralCost: 0, totalExpense: 0, forecastTotalExpense: 0 },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2} style={{ textAlign: 'center' }}>월별 지출</Title>

      <Space>
        <DatePicker
          picker="month"
          value={period}
          onChange={(date) => setPeriod(date)}
          format="YYYY.MM"
        />
        <Select value={branch} onChange={setBranch} style={{ width: 120 }}>
          <Select.Option value="지점">지점</Select.Option>
          {/* 지점 옵션 추가 */}
        </Select>
        <Select value={format} onChange={setFormat} style={{ width: 120 }}>
          <Select.Option value="Excel">Excel</Select.Option>
          {/* 형식 옵션 추가 */}
        </Select>
        <Button>다운로드</Button>
      </Space>

      <Card>
        <Table
          columns={dailyExpenseColumns}
          dataSource={dailyData}
          bordered
          pagination={false}
          scroll={{ x: 1500 }}
          summary={() => (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>합계</Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">100,000</Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right">200,000</Table.Summary.Cell>
                <Table.Summary.Cell index={3} align="right">300,000</Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="right">400,000</Table.Summary.Cell>
                <Table.Summary.Cell index={5} align="right">100,000</Table.Summary.Cell>
                <Table.Summary.Cell index={6} align="right">110,000</Table.Summary.Cell>
                <Table.Summary.Cell index={7} align="right">100,000</Table.Summary.Cell>
                <Table.Summary.Cell index={8} align="right">250,000</Table.Summary.Cell>
                <Table.Summary.Cell index={9} align="right">150,000</Table.Summary.Cell>
                <Table.Summary.Cell index={10} align="right">500,000</Table.Summary.Cell>
                <Table.Summary.Cell index={11} align="right">1,000,000</Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>

      <Title level={4} style={{ textAlign: 'center' }}>Monthly Summary</Title>

      <Card>
        <Table
          columns={monthlySummaryColumns}
          dataSource={summaryData}
          bordered
          pagination={false}
        />
      </Card>
    </Space>
  );
};

export default MonthlyExpense;