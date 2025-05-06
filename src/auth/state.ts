import { createSlice } from "@reduxjs/toolkit";

interface AuthPermissions {
  canAccessFindPasswordVerifyOtp: boolean;
  canAccessFindPasswordUpdatePw: boolean;
};

interface AuthState {
  loginToken: string;
  permissions: AuthPermissions,
  payload: {
    findPw: {
      userId: string;
      email: string;
    }
  }
};

interface Action {
  payload: {[prop: string]: any}
};

// TODO localstorage에서 loginToken을 가져온 후 매핑시키기 (로그인 유지 기능)

const initialState: AuthState = {
  loginToken: '',
  permissions: {
    canAccessFindPasswordVerifyOtp: false,
    canAccessFindPasswordUpdatePw: false,
  },
  payload: {
    findPw: {
      userId: '',
      email: '',
    }
  }
};

const authStatus = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.loginToken = action.payload.loginToken;
    },
    logout(state) {
      state.loginToken = '';
      // localStorage에서도 토큰 삭제
    },
    findPwSendOtp(state, action) {
      state.permissions.canAccessFindPasswordVerifyOtp = true;
      state.permissions.canAccessFindPasswordUpdatePw = false;
      state.payload.findPw = action.payload;
    },
    findPwVeirfyOtp(state, action) {
      state.permissions.canAccessFindPasswordVerifyOtp = true;
      state.permissions.canAccessFindPasswordUpdatePw = true;
      state.payload.findPw = action.payload;
    },
    findPwUpdatePw(state) {
      state.permissions.canAccessFindPasswordVerifyOtp = false;
      state.permissions.canAccessFindPasswordUpdatePw = false;
      state.payload.findPw = { userId: '', email: '' };
    }
  }
});

export default authStatus.reducer;
export const { login, logout, findPwSendOtp, findPwVeirfyOtp, findPwUpdatePw } = authStatus.actions;
export { authStatus };
export type { AuthState };