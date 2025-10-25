import { useState } from 'react';
import { Layout } from 'antd';
import { HeaderLogo, HeaderUser } from './Header';
import LeftMenu from './LeftMenu';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const MainLayout: React.FC = () => {
  const [leftCollapsed, setLeftCollapsed] = useState(false);

  return (
    <Layout className='main-layout' style={{ minHeight: '100vh' }}>
      <Header className='header'>
        <HeaderLogo/>
        <HeaderUser/> 
      </Header>
      <Layout>
        <Sider collapsible collapsed={leftCollapsed} onCollapse={(value) => setLeftCollapsed(value)}>
          <LeftMenu />
        </Sider>
        <Layout> 
          <Content>
            <div className='content-wrapper'>
              <Outlet />
            </div>
            <Footer style={{ textAlign: 'center' }}>
            Jumping park ©{new Date().getFullYear()} Created by happiestLife
          </Footer>
          </Content>
        </Layout>
      </Layout> 
    </Layout>
  );
};

export default MainLayout;   
