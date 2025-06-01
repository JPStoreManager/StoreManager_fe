import { ReactNode, useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "../auth/state";
import PagePath from "./PagePath";
import { checkAuth } from "../auth/state";
import { login } from "../auth/state";
import SpinnerLoading from "../view/common/Loading";

const nonLoginPages = [
  PagePath.USER.FIND_PW_SEND_OTP,
  PagePath.USER.FIND_PW_VERIFY_OTP,
  PagePath.USER.FIND_PW_UPDATE_PW,
  PagePath.USER.LOGIN
];

let isFirstLoad = true;

const LoginProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { permissions } = useSelector((state: { auth: AuthState }) => state.auth);


  // 최초 진입 시 검증 로직
  useEffect(() => {
    setLoading(true);
    // 앱 최초 진입 시 세션 확인
    checkAuth().then(res => {
      setLoading(false);
      if(!res.userId) navigate(PagePath.AUTH.UNAUTHORIZED, { replace: true });
      else {
        dispatch(login({ userId: res.userId }));
      }
    });
  }, [dispatch]);

  if (isFirstLoad || loading) {
    if(isFirstLoad) isFirstLoad = false;
    return <SpinnerLoading />;
  }

  // 최초 이후 진입에 대한 검증 로직
  if(!nonLoginPages.includes(location.pathname) && !permissions.isUserLoggedIn) {
    // 로그인 페이지가 아닌데 로그인 토큰이 없으면 로그인 페이지로 리다이렉트
    return <Navigate to={PagePath.USER.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default LoginProtectedRoute;
