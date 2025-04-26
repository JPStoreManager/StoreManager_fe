import { useNavigate } from "react-router-dom";

import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { ContentLayoutComp } from "../../../type/layout";
import LoginContentLayout from "../../../layout/login/LoginContentLayout";
import { useAlertPopup } from "../../common/AlertPopup";
import { sendOtp, SendOtpResponse } from "./FindPassword";
import { ResultResponse } from "../../../component/util/ApiResponse";
import { useLocation } from "react-router-dom";

const FindPasswordVerifyOtpPage:React.FC = () => {
  const { useToken } = theme;
  const { useBreakpoint } = Grid;
  const { Text, Title } = Typography;
  const { token } = useToken();
  const screens = useBreakpoint();
  const alertPopup = useAlertPopup();
  const navigate = useNavigate();
  const location = useLocation();

  const styles = {
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    } as React.CSSProperties,
  };

  const findPasswordHandler = async ({userId, email}: {userId: string, email: string}) => {    
    const sendOtpResult: SendOtpResponse = await sendOtp({userId, email});
    if(sendOtpResult?.result === ResultResponse.YES) _handleSendOtpSuccess(sendOtpResult);
    else _handleSendOtpFail();
  };

  const _handleSendOtpSuccess = (sendOtpResult: SendOtpResponse) => {
    sessionStorage.setItem('sessionId', sendOtpResult.sessionId);
    navigate('/findPassword/otp/verify');
  };

  const _handleSendOtpFail = () => {
    alertPopup.error('Find Password Fail Notification', 'The id or email is incorrect. Please check your id and email.', 'top');
  };
  
  const title = (<>
    <Title style={styles.title}>Find password</Title>
    <div className="description">
      <Text>
        Please enter your email and name below to find you password.  
      </Text> 
    </div>
  </>);
  
  const content = (<>
    <Form className="content" 
            name="normal_login"
            onFinish={findPasswordHandler}
            initialValues={{
              remember: true,
              userId: location.state?.userId,
              email: location.state?.email,
            }}
            layout="vertical"
            requiredMark="optional"
        >
          <Form.Item name="userId"
            hidden={true}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="id"
            />
          </Form.Item>
          <Form.Item
            name="email"
            hidden={true}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type="email"
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                message: "Please input your otp!",
              },
            ]}
          >
            <Input
              type="otp"
              placeholder="otp"
            />
          </Form.Item>
          <Form.Item>
            <Button block={true} type="primary" htmlType="submit">
              Verify OTP Number
            </Button>
          </Form.Item>
        </Form>
  </>);

  const contentComp:ContentLayoutComp = {title, content};

  return <LoginContentLayout {...contentComp} />
}

export default FindPasswordVerifyOtpPage;