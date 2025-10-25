import { theme, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import { ContentLayoutComp } from "../../model/layout";

const LoginContentLayout: React.FC<ContentLayoutComp> = ({title, content, footer, showLoading}) => {

  const { useToken } = theme;
  const { token } = useToken();

  const styles = {
    header: {
      marginBottom: token.marginXL
    } as React.CSSProperties,
    footer: {
      marginTop: token.marginLG,
    } as React.CSSProperties,
  };


  return (
    <>
      <div className="header" style={styles.header}>
        {title}
      </div>
      <div className="content">
        {content}
        <div className="footer" style={styles.footer}>
          {footer}
        </div>
      </div>
      <div className="loading">
        {showLoading && <Spin fullscreen indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />}
      </div>
    </>
  );
};

export default LoginContentLayout;