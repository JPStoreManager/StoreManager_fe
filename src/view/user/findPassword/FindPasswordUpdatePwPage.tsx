import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { Button, Form, Grid, Input, theme, Typography } from "antd";
import { ContentLayoutComp } from "../../../model/layout";
import LoginContentLayout from "../../../component/login/LoginContentLayout";
import { useAlertPopup } from "../../common/AlertPopup";
import { updatePw, saveFindPwSessionId, UpdatePwRequest, UpdatePwResponse } from "../../../api/user/findPw/FindPassword";
import { ResultResponse } from "../../../api/ApiResponse";
import { useDispatch } from "react-redux";
import { findPwUpdatePw } from "../../../auth/state";
import { useSelector } from "react-redux";
import PagePath from "../../../route/PagePath";

const FindPasswordUpdatePwPage:React.FC = () => {
  const { useToken } = theme;
  const { useBreakpoint } = Grid;
  const { Text, Title } = Typography;

  const dispatch = useDispatch();
  const { token } = useToken();
  const screens = useBreakpoint();
  const alertPopup = useAlertPopup();
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);

  const styles = {
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
    } as React.CSSProperties,
  };

  const isNewPasswordValid = (newPassword: string): boolean => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(newPassword);
  };

  const findPasswordUpdatePwHandler = async ({userId, email, newPassword, confirmPassword}: UpdatePwRequest & {confirmPassword: string}) => {    
    if(newPassword !== confirmPassword) {
      alertPopup.error({
        message: 'Find Password Fail Notification', 
        description: 'The new password and confirm password are not same. Please check your new password and confirm password.', 
        placement: 'top'
    });
      return;
    }

    if(!isNewPasswordValid(newPassword)) {
      alertPopup.error({
        message: 'Find Password Fail Notification', 
        description: 'The new password is not valid. The password must be at least 8 length and include letters and numbers.', 
        placement: 'top'
      });
      return;
    }

    newPassword = newPassword.trim();
    setShowLoading(true);
    const updatePwResult: UpdatePwResponse = await updatePw({userId, email, newPassword}).catch((error) => { console.log(error); return error });;
    setShowLoading(false);

    if(updatePwResult?.result === ResultResponse.YES) _handleUpdatePwSuccess(updatePwResult);
    else _handleUpdatePwFail();
  };

  const _handleUpdatePwSuccess = (updatePwResult: UpdatePwResponse) => {
    saveFindPwSessionId(updatePwResult.sessionId);

    const handleCloseAlertPopup = () => {
      dispatch(findPwUpdatePw());
      navigate(PagePath.USER.LOGIN);
    };

    alertPopup.success({
      message: 'Find Password Success Notification', 
      description: 'The password has been updated successfully. Please login with your new password.', 
      placement: 'top',
      btn: (<Button type="primary" size="small" onClick={handleCloseAlertPopup}>Confirm</Button>),
      onClose: handleCloseAlertPopup
    });
  };

  const _handleUpdatePwFail = () => {
    alertPopup.error({
      message: 'Find Password Fail Notification', 
      description: 'The new password is not valid. Please check your new password.', 
      placement: 'top'
    });
  };
  
  const title = (<>
    <Title style={styles.title}>Update Password</Title>
    <div className="description">
      <Text>
        Please update your password at below.
      </Text> 
    </div>
  </>);
  
  const content = (<>
    {alertPopup.contextHolder}
    <Form className="content" 
            name="normal_login"
            initialValues={{
              userId: useSelector((state: any) => state.auth.payload.findPw.userId),
              email: useSelector((state: any) => state.auth.payload.findPw.email),
            }}
            onFinish={findPasswordUpdatePwHandler}
            layout="vertical"
            requiredMark="optional"
        >
          <Form.Item
            name="userId"
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
              placeholder="email"
            />
          </Form.Item>
          <Form.Item name="newPassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button block={true} type="primary" htmlType="submit">
              Please Update your password
            </Button>
          </Form.Item>
        </Form>
  </>);

  const contentComp:ContentLayoutComp = {title, content, showLoading};

  return <LoginContentLayout {...contentComp} />
}

export default FindPasswordUpdatePwPage;