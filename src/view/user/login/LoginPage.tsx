import React, { useState } from "react";

import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from "./Login";
import ContentLayout from "../../../layout/login/LoginContentLayout";
import { useAlertPopup } from "../../common/AlertPopup";
import PagePath from "../../../route/PagePath";
import { useDispatch} from "react-redux";
import { login as loginAction } from "../../../auth/state";

export default function Login() {
  const navigate = useNavigate();

  const { useToken } = theme;
  const { useBreakpoint } = Grid;
  const { Text, Title, Link } = Typography;
  const { token } = useToken();
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const alertPopup = useAlertPopup();
  const [showLoading, setShowLoading] = useState(false);
  const dispatch = useDispatch();

  const loginHandler = async ({id, password, remember}: {id: string, password: string, remember: boolean}) => {    
    setShowLoading(true);
    const loginResult = await login({id, password});
    setShowLoading(false);

    if(loginResult) _handleLoginSuccess(id);
    else _handleLoginFail();
  };

  const _handleLoginSuccess = (id: string) => {
    dispatch(loginAction({ userId: id }));
    navigate(PagePath.SALES.MONTH);
  };

  const _handleLoginFail = () => {
    form.resetFields();
    alertPopup.error({
      message: 'Login Fail Notification',
      description: 'The id or password is incorrect. Please check your id and password.', 
      placement: 'top'
    });
  };


  const styles = {
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    } as React.CSSProperties,
  };

  const title = (<>
    <Title style={styles.title}>Sign in</Title>
    <div className="description">
      <Text>
        Welcome to <b>Jumping park</b>!<br/>Please enter your details below to sign in.  
      </Text> 
    </div>
  </>);

  const content = (<>
    {alertPopup.contextHolder}
    <Form className="content" 
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={loginHandler}
            layout="vertical"
            requiredMark="optional"
            form={form}
        >
          <Form.Item name="id"
            rules={[
              {
                required: true,
                message: "Please input your id!",
              },
            ]}
          >
          <Input
            prefix={<MailOutlined />}
            placeholder="id"
          />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link className="forgot-pw" href="/findPassword/otp">Forgot password?</Link>
          </Form.Item>
          <Form.Item>
            <Button block={true} type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
  </>);

  const footer = (<>
    <Text>
      Don't have an account?<br/>
      Please connect to chickenman10@naver.com
    </Text>
  </>);

  const contentComp = { title, content, footer, showLoading };

  return <ContentLayout {...contentComp}/>
}