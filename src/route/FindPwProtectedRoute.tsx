// src/components/ProtectedRoute.jsx
import {ReactNode} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "../auth/state";
import PagePath from "./PagePath";

/**
 * requiredPermission: 접근을 위해 필요한 권한 키값 (예: "canResetPassword")
 */
const FindPwProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { permissions } = useSelector((state: { auth: AuthState }) => state.auth);
  
  if (location.pathname === PagePath.USER.FIND_PW_VERIFY_OTP && !permissions.canAccessFindPasswordVerifyOtp) {
    return <Navigate to={PagePath.USER.FIND_PW_SEND_OTP} replace/>;
  }

  if (location.pathname === PagePath.USER.FIND_PW_UPDATE_PW && !permissions.canAccessFindPasswordUpdatePw) {
    return <Navigate to={PagePath.USER.FIND_PW_SEND_OTP} replace/>;
  }

  // 조건을 모두 통과하면 children 렌더링
  return <>{children}</>;
};

export default FindPwProtectedRoute;