import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { ContentLayoutComp } from "../../../type/layout";
import LoginContentLayout from "../../../layout/login/LoginContentLayout";
import { useAlertPopup } from "../../common/AlertPopup";
import { sendOtp, SendOtpResponse } from "./FindPassword";
import { ResultResponse } from "../../../component/util/ApiResponse";
import { findPwStart } from "../../../auth/state";

const FindPasswordSendOtpPage:React.FC = () => {
  const { useToken } = theme;
  const { useBreakpoint } = Grid;
  const { Text, Title } = Typography;
  const { token } = useToken();
  const screens = useBreakpoint();
  const alertPopup = useAlertPopup();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showLoading, setShowLoading] = useState(false);

  const styles = {
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    } as React.CSSProperties,
  };

  const findPasswordHandler = async ({userId, email}: {userId: string, email: string}) => {    
    setShowLoading(true);
    const sendOtpResult: SendOtpResponse = await sendOtp({userId, email});
    setShowLoading(false);

    if(sendOtpResult?.result === ResultResponse.YES) _handleSendOtpSuccess(sendOtpResult);
    else _handleSendOtpFail();
  };

  const _handleSendOtpSuccess = (sendOtpResult: SendOtpResponse) => {
    sessionStorage.setItem('sessionId', sendOtpResult.sessionId);
    // 권한 부여하기
    dispatch(findPwStart({
        userId: form.getFieldValue('userId'),
        email: form.getFieldValue('email'),
    }));
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
            }}
            layout="vertical"
            requiredMark="optional"
            form={form}
        >
          <Form.Item name="userId"
            rules={[
              {
                required: true,
                message: "Please input your id!",
              },
            ]}
          >
            <Input
              placeholder="id"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="email"
            />
          </Form.Item>
          <Form.Item>
            <Button block={true} type="primary" htmlType="submit">
              Send OTP Number
            </Button>
          </Form.Item>
        </Form>
  </>);

  const contentComp:ContentLayoutComp = {title, content, showLoading};

  return <LoginContentLayout {...contentComp} />
}

export default FindPasswordSendOtpPage;