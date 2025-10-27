import { Outlet } from 'react-router-dom';

import { Layout, Button, Checkbox, Form, Grid, Input, theme, Typography } from 'antd';

const LoginLayout: React.FC = () => {

  const { Content, Footer } = Layout;

  const { useToken } = theme;
  const { token } = useToken();

  const { useBreakpoint } = Grid;
  
  const screens = useBreakpoint();

  const styles = {
    container: {
      padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
    } as React.CSSProperties,
    section: {
      backgroundColor: token.colorBgContainer,
      height: screens.sm ? "100vh" : "auto",
    } as React.CSSProperties,
  };

  return (
    <Layout className='login-layout'>
      <Layout>
        <Content>
          <section className="login-section" style={styles.section}>
            <div className="container" style={styles.container}>
              <Outlet />
              <Footer style={{ textAlign: 'center', backgroundColor: 'transparent' }}>
              Jumping park ©{new Date().getFullYear()} Created by happiestLife
              </Footer>
            </div>
          </section>
        </Content>
      </Layout> 
    </Layout>
  );
};

export default LoginLayout;   
