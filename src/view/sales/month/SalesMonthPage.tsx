import React, { useEffect, useState } from 'react';
import { Table, Typography, Space, Card } from 'antd';
import { WeeklySalesSummaryTableColType, MonthlySalesTotalTableColType } from '../../../model/sales';
import { PeriodHeader } from '../SalesCommon';
import { getMonthlySales, GetMonthlySalesResponse, MonthDailySales } from '../../../api/sales/MonthlySales';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getNow } from '../../../util/DateUtils';
import { dailySalesTableCols, weeklySummaryTableCols, monthlyTotalTableCols, formatDailySales, formatWeeklySalesSummary, formatMonthlyTotal } from '../../../const/sales/SalesMonthGrid';
import { addComma } from '../../../util/MoneyUtils';

const { Title } = Typography;

const SalesMonthPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(getNow());
  const [selectedStoreCode, setSelectedStoreCode] = useState('SEOCHO');
  const [fileFormat, setFileFormat] = useState('excel');
  const [showLoading, setShowLoading] = useState(false);
  const [monthlySales, setMonthlySales] = useState<GetMonthlySalesResponse>();
  
  useEffect(() => {
    const year = selectedDate.get('year');
    const month = selectedDate.get('month') + 1;
    setShowLoading(true);
    getMonthlySales(selectedStoreCode, year, month).then(response => {
      setMonthlySales(response.data);
    }).finally(() => {
      setShowLoading(false);
    });
  }, [selectedDate, selectedStoreCode]);

  // TODO: Fetch data based on year and store
  const storeOptions = [
    { value: 'SEOCHO', label: '서초' },
    { value: 'SIHEUNG', label: '시흥' }
  ];
  const formatOptions = [
    { value: 'excel', label: 'Excel' },
    { value: 'pdf', label: 'PDF' }
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

  const formattedDailySales = formatDailySales(monthlySales?.dailySales ?? []);
  const formattedWeeklySales = formatWeeklySalesSummary(monthlySales?.weeklySales ?? []);
  const formattedMonthlyTotal = formatMonthlyTotal(monthlySales ?? ({} as GetMonthlySalesResponse));

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <PeriodHeader
        title="년별 매출"
        period={selectedDate}
        onPrev={() => setSelectedDate(y => y.subtract(1, 'month'))}
        onNext={() => setSelectedDate(y => y.add(1, 'month'))}
        store={selectedStoreCode}
        onChangeStore={setSelectedStoreCode}
        fileFormat={fileFormat}
        onChangeFormat={setFileFormat}
        formatDisplay="YYYY.MM"
        storeOptions={storeOptions}
        formatOptions={formatOptions}
      />

      <Card styles={{body: {padding: 0}}}>
        <Table
          columns={dailySalesTableCols}
          dataSource={formattedDailySales}
          bordered
          pagination={false}
          scroll={{ x: 1500 }}
          summary={() => (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2}>합계</Table.Summary.Cell>
                <Table.Summary.Cell index={2} align="right">{addComma(monthlySales?.monthTotalCash ?? 0)}</Table.Summary.Cell>
                <Table.Summary.Cell index={3} align="right">{addComma(monthlySales?.monthTotalCard ?? 0)}</Table.Summary.Cell>
                <Table.Summary.Cell index={4} align="right">{addComma(monthlySales?.monthTotalSales ?? 0)}</Table.Summary.Cell>
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
          dataSource={formattedWeeklySales}
          className='summary-table'
          bordered
          pagination={false}
        />
      </Card>

      {/* 총계 */}
      <Card styles={{body: {padding: 0}}}>
        <Table
          columns={monthlyTotalTableCols}
          dataSource={formattedMonthlyTotal}
          className='summary-table'
          bordered
          pagination={false}
        />
      </Card>
      <Space className="loading">
        {showLoading && <Spin fullscreen indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />}
      </Space>
    </Space>
  );
};

export default SalesMonthPage;