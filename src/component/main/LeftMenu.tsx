import React from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { GetProp } from 'antd';

type MenuItem = GetProp<MenuProps, 'items'>[number];

const leftMenuItmes: MenuItem[] = [
  {
    key: 'sales',
    label: '매출',
    icon: <PieChartOutlined />,
    children: [
      { 
        key: 'sales/month', 
        label: <Link to={'/sales/month'}>월별 매출</Link>
      },
      { 
        key: 'sales/year', 
        label: <Link to={'/sales/year'}>년별 매출</Link>
      },
    ]
  },
  {
    key: 'expense',
    label: '지출',
    icon: <DesktopOutlined />,
    children: [
      { 
        key: 'expense/month', 
        label: <Link to={'/expense/month'}>월별 지출</Link>
      },
      { 
        key: 'expense/year', 
        label: <Link to={'/expense/year'}>년별 지출</Link>
      },
    ]
  },
  {
    key: 'manage',
    label: '관리',
    icon: <DesktopOutlined />,
    children: [
      { 
        key: '/manage/schedule', 
        label: <Link to={'/manage/schedule'}>일정표</Link>
      },
      { 
        key: '/manage/worker', 
        label: <Link to={'/manage/worker'}>알바 관리</Link>
      },
      { 
        key: '/manage/user', 
        label: <Link to={'/manage/user'}>사용자 관리</Link>
      },
    ]
  },
];
  
const LeftMenu: React.FC = () => {
  return (
    <>
      <div className="demo-logo-vertical" />
      <Menu theme="dark" 
            defaultSelectedKeys={['1']} 
            mode="inline" 
            items={leftMenuItmes}>
      </Menu>
    </>
  )
};

export default LeftMenu;