import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { ContentLayoutComp } from "../../../model/layout";
import LoginContentLayout from "../../../component/login/LoginContentLayout";
import { useAlertPopup } from "../../common/AlertPopup";
import { saveFindPwSessionId, sendOtp, SendOtpResponse } from "../../../api/user/findPw/FindPassword";
import { ResultResponse } from "../../../api/ApiResponse";
import { findPwSendOtp } from "../../../auth/state";
import PagePath from "../../../route/PagePath";

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

  const findPasswordSendOtpHandler = async ({userId, email}: {userId: string, email: string}) => {    
    setShowLoading(true);
    const sendOtpResult: SendOtpResponse = await sendOtp({userId, email}).catch((error) => { console.log(error); return error });
    setShowLoading(false);

    if(sendOtpResult?.result === ResultResponse.YES) _handleSendOtpSuccess(sendOtpResult);
    else _handleSendOtpFail();
  };

  const _handleSendOtpSuccess = (sendOtpResult: SendOtpResponse) => {
    saveFindPwSessionId(sendOtpResult.sessionId);
    
    // 권한 부여하기
    dispatch(findPwSendOtp({
        userId: form.getFieldValue('userId'),
        email: form.getFieldValue('email'),
    }));
    navigate(PagePath.USER.FIND_PW_VERIFY_OTP);
  };

  const _handleSendOtpFail = () => {
    alertPopup.error({
      message: 'Find Password Fail Notification', 
      description: 'The id or email is incorrect. Please check your id and email.', 
      placement: 'top'
    });
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
    {alertPopup.contextHolder}
    <Form className="content" 
            name="normal_login"
            onFinish={findPasswordSendOtpHandler}
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