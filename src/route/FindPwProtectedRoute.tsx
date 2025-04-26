// src/components/ProtectedRoute.jsx
import {ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "../auth/state";

/**
 * requiredPermission: 접근을 위해 필요한 권한 키값 (예: "canResetPassword")
 */
const FindPwProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { permissions } = useSelector((state: { auth: AuthState }) => state.auth);

  // 먼저 로그인 여부를 확인 (비로그인 사용자는 접근 불가)

  const findPwOtpPagePath: string = '/findPassword/otp';
  if (!permissions.canAccessFindPassword) {
    return <Navigate to={findPwOtpPagePath} replace/>;
  }

  // 조건을 모두 통과하면 children 렌더링
  return <>children</>;
};

export default FindPwProtectedRoute;