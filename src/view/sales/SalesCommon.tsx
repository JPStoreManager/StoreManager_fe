import { Typography } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Col, Row, Select, Space } from 'antd';
import { PeriodHeaderProps } from '../../model/sales';

const { Title, Text } = Typography;

const PeriodHeader: React.FC<PeriodHeaderProps> = ({
  title,
  period,
  onPrev,
  onNext,
  store,
  onChangeStore,
  fileFormat,
  onChangeFormat,
  formatDisplay,
  storeOptions,
  formatOptions,
}) => (
  <>
    <Row justify="center">
      <Col>
        <Title level={3}>{title}</Title>
      </Col>
    </Row>

    <Row align="middle" style={{ position: 'relative' }}>
      {/* 가운데 년도 네비게이션 */}
      <Col style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <Space>
          <Button icon={<LeftOutlined />} onClick={onPrev} />
          <Text>{period.format(formatDisplay)}</Text>
          <Button icon={<RightOutlined />} onClick={onNext} />
        </Space>
      </Col>

      {/* 우측 Select 그룹 */}
      <Col style={{ marginLeft: 'auto' }}>
        <Space>
          <Text>지점</Text>
          <Select value={store} style={{ width: 120 }} options={storeOptions} onChange={onChangeStore} />
          <Text>형식</Text>
          <Select value={fileFormat} style={{ width: 120 }} options={formatOptions} onChange={onChangeFormat} />
        </Space>
      </Col>
    </Row>
  </>
);


export { PeriodHeader };