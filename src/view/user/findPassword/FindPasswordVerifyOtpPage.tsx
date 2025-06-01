import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { ContentLayoutComp } from "../../../type/layout";
import LoginContentLayout from "../../../layout/login/LoginContentLayout";
import { useAlertPopup } from "../../common/AlertPopup";
import { ResultResponse } from "../../../component/util/ApiResponse";
import { useSelector } from "react-redux";
import { VerifyOtpRequest, verifyOtp, VerifyOtpResponse, saveFindPwSessionId } from "./FindPassword";
import { findPwVerifyOtp } from "../../../auth/state";
import PagePath from "../../../route/PagePath";


const FindPasswordVerifyOtpPage:React.FC = () => {
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

  const findPasswordVerifyOtpHandler = async ({userId, email, otp}: VerifyOtpRequest) => {    
    setShowLoading(true);
    const verifyOtpResult: VerifyOtpResponse = await verifyOtp({userId, email, otp}).catch((error) => { console.log(error); return error });;
    setShowLoading(false);

    if(verifyOtpResult?.result === ResultResponse.YES) _handleVerifyOtpSuccess(verifyOtpResult);
    else _handleVerifyOtpFail();
  };

  const _handleVerifyOtpSuccess = (verifyOtpResult: VerifyOtpResponse) => {
    saveFindPwSessionId(verifyOtpResult.sessionId);
    
    dispatch(findPwVerifyOtp({
        userId: form.getFieldValue('userId'),
        email: form.getFieldValue('email'),
    }));
    navigate(PagePath.USER.FIND_PW_UPDATE_PW);
  };

  const _handleVerifyOtpFail = () => {
    alertPopup.error({
      message: 'Find Password Fail Notification', 
      description: 'The OTP number is incorrect. Please check your otp number.', 
      placement: 'top'
    });
  };
  
  const title = (<>
    <Title style={styles.title}>Find password</Title>
    <div className="description">
      <Text>
        Please enter OTP number below to verify it.  
      </Text> 
    </div>
  </>);
  
  const content = (<>
    {alertPopup.contextHolder}
    <Form className="content" 
            name="normal_login"
            onFinish={findPasswordVerifyOtpHandler}
            initialValues={{
              userId: useSelector((state: any) => state.auth.payload.findPw.userId),
              email: useSelector((state: any) => state.auth.payload.findPw.email),
            }}
            layout="vertical"
            requiredMark="optional"
            form={form}
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

  const contentComp:ContentLayoutComp = {title, content, showLoading};

  return <LoginContentLayout {...contentComp} />
}

export default FindPasswordVerifyOtpPage;