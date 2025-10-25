import { ContentLayoutComp } from "../../model/layout";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ContentLayout: React.FC<ContentLayoutComp> = ({title, content, footer, showLoading}: ContentLayoutComp) => {
  return (<>
    <div className="content-title">{title}</div>
    <div className="content">
      {content}
    </div>
    <div className="content-footer">
      {footer}
    </div>
    <div className="loading">
      {showLoading && <Spin fullscreen indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />}
    </div>
  </>);
};

export default ContentLayout;