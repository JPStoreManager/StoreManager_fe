import React, { useState } from 'react';
import { Table, Typography, Space, Card, TableProps } from 'antd';
import dayjs from 'dayjs';
import { DailySalesTableColType, WeeklySalesSummaryTableColType, MonthlySalesTotalTableColType } from '../../../type/sales';
import { PeriodHeader } from '../SalesCommon';

const { Title } = Typography;

const dailySalesTableCols: TableProps<DailySalesTableColType>['columns'] = [
  { title: '날짜', dataIndex: 'date', key: 'date', width: 70 },
  { title: '요일', dataIndex: 'day', key: 'day', width: 60 },
  { title: '현금', dataIndex: 'cash', key: 'cash', align: 'right' as const },
  { title: '카드', dataIndex: 'card', key: 'card', align: 'right' as const },
  { title: '매출액계', dataIndex: 'salesTotal', key: 'salesTotal', align: 'right' as const },
  { title: '주간매출액계', dataIndex: 'weeklySalesTotal', key: 'weeklySalesTotal', align: 'right' as const },
  { title: '매출누계', dataIndex: 'cumulativeSales', key: 'cumulativeSales', align: 'right' as const },
  { title: '카드%', dataIndex: 'cardPercent', key: 'cardPercent', align: 'right' as const, render: (value: number) => `${value}%` },
  { title: '매입지출', dataIndex: 'purchase', key: 'purchase', align: 'right' as const },
  { title: '매입누계', dataIndex: 'cumulativePurchase', key: 'cumulativePurchase', align: 'right' as const },
  { title: '변동비', dataIndex: 'variableCost', key: 'variableCost', align: 'right' as const },
  { title: '변동비누계', dataIndex: 'variableCostCumulative', key: 'variableCostCumulative', align: 'right' as const },
  { title: '비고', dataIndex: 'note', key: 'note' }
];

const weeklySummaryTableCols: TableProps<WeeklySalesSummaryTableColType>['columns'] = [
  { title: '', dataIndex: 'week', key: 'week', width: 90},
  { title: '주간 일평균', dataIndex: 'weeklyAvg', key: 'weeklyAvg', align: 'right' as const },
  { title: '예상 주간/월매출', dataIndex: 'forecast', key: 'forecast', align: 'right' as const },
  { title: '매입지출', dataIndex: 'purchaseCost', key: 'purchaseCost', align: 'right' as const },
  { title: '인건비', dataIndex: 'laborCost', key: 'laborCost', align: 'right' as const },
  { title: '변동비', dataIndex: 'variableCost', key: 'variableCost', align: 'right' as const },
  { title: '고정비', dataIndex: 'fixedCost', key: 'fixedCost', align: 'right' as const }
];

const monthlyTotalTableCols: TableProps<MonthlySalesTotalTableColType>['columns'] = [
  { title: '', dataIndex: 'label', key: 'label', width: 90 },
  { title: '총수입', dataIndex: 'totalIncome', key: 'totalIncome', align: 'right' as const },
  { title: '총지출', dataIndex: 'totalExpense', key: 'totalExpense', align: 'right' as const },
  { title: '총이익', dataIndex: 'totalProfit', key: 'totalProfit', align: 'right' as const }
];

const MonthlySales: React.FC = () => {
  const [month, setMonth] = useState(dayjs());
  const [store, setStore] = useState('seoul');
  const [fileFormat, setFileFormat] = useState('excel');

  // TODO: Fetch data based on year and store
  const storeOptions = [
    { value: 'seoul', label: '서울' },
    { value: 'busan', label: '부산' }
  ];
  const formatOptions = [
    { value: 'excel', label: 'Excel' },
    { value: 'pdf', label: 'PDF' }
  ];

  const dailySalesData: DailySalesTableColType[] = [
    {
      key: '1',
      date: '10일',
      day: '금',
      cash: 1000,
      card: 1000,
      salesTotal: 2000,
      weeklySalesTotal: 2000,
      cumulativeSales: 2000,
      cardPercent: 50,
      purchase: 2000,
      cumulativePurchase: 2000,
      variableCost: 2000,
      variableCostCumulative: 2000,
      note: '비고 비고'
    }
  ];

  const weeklySalesSummaryData: WeeklySalesSummaryTableColType[] = [
    { key: '1', week: '첫째주' },
    { key: '2', week: '둘째주' },
    { key: '3', week: '셋째주' },
    { key: '4', week: '넷째주' },
    { key: '5', week: '다섯째주' },
    { key: '6', week: '여섯째주' },
    { key: '7', week: '월단위' }
  ];

  const monthlySalesTotalData: MonthlySalesTotalTableColType[] = [
    { key: '1', label: '합계' }
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <PeriodHeader
        title="년별 매출"
        period={month}
        onPrev={() => setMonth(y => y.subtract(1, 'month'))}
        onNext={() => setMonth(y => y.add(1, 'month'))}
        store={store}
        onChangeStore={setStore}
        fileFormat={fileFormat}
        onChangeFormat={setFileFormat}
        formatDisplay="YYYY.MM"
        storeOptions={storeOptions}
        formatOptions={formatOptions}
      />

      <Card styles={{body: {padding: 0}}}>
        <Table
          columns={dailySalesTableCols}
          dataSource={dailySalesData}
          bordered
          pagination={false}
          scroll={{ x: 1500 }}
          summary={() => (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2}>합계</Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right">1,000</Table.Summary.Cell>
                <Table.Summary.Cell index={3} align="right">1,000</Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="right">2,000</Table.Summary.Cell>
                {/* 생략 */}
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>

      {/* 월간 요약 */}
      <Title level={4} style={{ textAlign: 'center' }}>Monthly Summary</Title>

      {/* 주차별 Summary */}
      <Card styles={{body: {padding: 0}}}>
        <Table
          columns={weeklySummaryTableCols}
          className='summary-table'
          dataSource={weeklySalesSummaryData}
          bordered
          pagination={false}
        />
      </Card>

      {/* 총계 */}
      <Card styles={{body: {padding: 0}}}>
        <Table
          columns={monthlyTotalTableCols}
          className='summary-table'
          dataSource={monthlySalesTotalData}
          bordered
          pagination={false}
        />
      </Card>
    </Space>
  );
};

export default MonthlySales;