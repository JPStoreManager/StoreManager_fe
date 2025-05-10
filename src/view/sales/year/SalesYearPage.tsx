import React, { useState } from 'react';
import { Table, Typography, Space, Card, TableProps} from 'antd';
import dayjs from 'dayjs';
import { YearlyTotalTableColType, YearlySummaryTableColType, MonthlySalesTableColType, MonthlyExpenseTableColType } from '../../../type/sales';
import { PeriodHeader } from '../SalesCommon';

const { Title } = Typography;

const yearlyTotalTableCols: TableProps<YearlyTotalTableColType>['columns'] = [
  { title: '월', dataIndex: 'month', key: 'month', width: 60 },
  { title: '현금', dataIndex: 'cash', key: 'cash', align: 'right' as const },
  { title: '카드', dataIndex: 'card', key: 'card', align: 'right' as const },
  { title: '카드%', dataIndex: 'cardPercent', key: 'cardPercent', align: 'right' as const, render: (v: number) => `${v}%` },
  { title: '총매출액', dataIndex: 'salesTotal', key: 'salesTotal', align: 'right' as const },
  { title: '고정비용', dataIndex: 'fixedCost', key: 'fixedCost', align: 'right' as const },
  { title: '매입비용', dataIndex: 'purchaseCost', key: 'purchaseCost', align: 'right' as const },
  { title: '인건비', dataIndex: 'laborCost', key: 'laborCost', align: 'right' as const },
  { title: '일반비용', dataIndex: 'miscCost', key: 'miscCost', align: 'right' as const },
  { title: '총지출액', dataIndex: 'totalCost', key: 'totalCost', align: 'right' as const },
  { title: '비고', dataIndex: 'note', key: 'note' }
];

const yearlySummaryTableCols: TableProps<YearlySummaryTableColType>['columns'] = [
  { title: '현금',       dataIndex: 'cash',       key: 'cash',       width: 100 },
  { title: '카드',       dataIndex: 'card',       key: 'card',       width: 100 },
  { title: '카드%',      dataIndex: 'cardPct',    key: 'cardPct',    width: 100 },
  { title: '총매출액',   dataIndex: 'total',      key: 'total',      width: 100 },
  { title: '고정비용',   dataIndex: 'fixed',      key: 'fixed',      width: 100 },
  { title: '매입비용',   dataIndex: 'purchase',   key: 'purchase',   width: 100 },
  { title: '인건비',     dataIndex: 'labor',      key: 'labor',      width: 100 },
  { title: '일반비용',   dataIndex: 'misc',       key: 'misc',       width: 100 },
  { title: '총지출액',   dataIndex: 'totalCost',  key: 'totalCost',  width: 100 },
  { title: '총순수익',   dataIndex: 'netProfit',  key: 'netProfit',  width: 100 }
];

const monthlySalesTableCols: TableProps<MonthlySalesTableColType>['columns'] = [
  { title: '평균 일매출', dataIndex: 'avgDay', key: 'avgDay', width: 120 },
  { title: '평균 휴일 매출', dataIndex: 'avgHoliday', key: 'avgHoliday', width: 120 },
  { title: '평균 평일 매출', dataIndex: 'avgWeekday', key: 'avgWeekday', width: 120 },
  { title: '평균 월매출', dataIndex: 'avgMonth', key: 'avgMonth', width: 120 }
];

const monthlyExpenseTableCols: TableProps<MonthlyExpenseTableColType>['columns'] = [
  { title: '고정비', dataIndex: 'fixed', key: 'fixed', width: 120 },
  { title: '평균 매입 비용', dataIndex: 'avgPurchase', key: 'avgPurchase', width: 120 },
  { title: '평균 인건비', dataIndex: 'avgLabor', key: 'avgLabor', width: 120 },
  { title: '평균 지출액', dataIndex: 'avgTotal', key: 'avgTotal', width: 120 }
];

const YearlySales: React.FC = () => {
  const [year, setYear] = useState(dayjs());
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

  const yearlyTotalData: YearlyTotalTableColType[] = [
    {
      key: '1',
      month: 1,
      cash: 10000,
      card: 10000,
      cardPercent: 50,
      salesTotal: 20000,
      fixedCost: 2000,
      purchaseCost: 3000,
      laborCost: 3000,
      miscCost: 3000,
      totalCost: 12000,
      note: '부가세 제출'
    },
    ...Array.from({ length: 11 }, (_, i) => ({
      key: `${i + 2}`,
      month: i + 2,
      cash: 0,
      card: 0,
      cardPercent: 0,
      salesTotal: 0,
      fixedCost: 0,
      purchaseCost: 0,
      laborCost: 0,
      miscCost: 0,
      totalCost: 0
    }))
  ];
  const yearlySummaryData: YearlySummaryTableColType[] = [];
  const monthlySalesData: MonthlySalesTableColType[] = [];
  const monthlyExpenseData: MonthlyExpenseTableColType[] = [];

  
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <PeriodHeader
        title="년별 매출"
        period={year}
        onPrev={() => setYear(y => y.subtract(1, 'year'))}
        onNext={() => setYear(y => y.add(1, 'year'))}
        store={store}
        onChangeStore={setStore}
        fileFormat={fileFormat}
        onChangeFormat={setFileFormat}
        formatDisplay="YYYY"
        storeOptions={storeOptions}
        formatOptions={formatOptions}
      />

      <Card styles={{body: {padding: 0}}}>
        <Table
          columns={yearlyTotalTableCols}
          dataSource={yearlyTotalData}
          bordered
          pagination={false}
          scroll={{ x: 1300 }}
          summary={() => (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>합계</Table.Summary.Cell>
                <Table.Summary.Cell index={1} align="right">10,000</Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right">10,000</Table.Summary.Cell>
                <Table.Summary.Cell index={3} align="right">50%</Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="right">20,000</Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Card>

      <Title level={4} style={{ textAlign: 'center', marginTop: 32 }}>년 매입/매출 통계</Title>
      <Card styles={{body: {padding: 0}}}>
        <Table
          columns={yearlySummaryTableCols}
          className='summary-table'
          dataSource={yearlySummaryData}
          bordered
          pagination={false}
        />
      </Card>

      <Title level={4} style={{ textAlign: 'center', marginTop: 32 }}>월별 매출 통계</Title>
      <Card styles={{body: {padding: 0}}}>
        <Table
          columns={monthlySalesTableCols}
          className='summary-table'
          dataSource={monthlySalesData}
          bordered
          pagination={false}
        />
      </Card>      

      <Title level={4} style={{ textAlign: 'center', marginTop: 32 }}>월별 지출 통계</Title>
      <Card styles={{body: {padding: 0}}}>
        <Table
          columns={monthlyExpenseTableCols}
          className='summary-table'
          dataSource={monthlyExpenseData}
          bordered
          pagination={false}
        />
      </Card>
    </Space>
  );
};

export default YearlySales;
