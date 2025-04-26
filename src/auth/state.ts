import { createSlice } from "@reduxjs/toolkit";

interface AuthPermissions {
  canAccessFindPassword: boolean;
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
    canAccessFindPassword: false,
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
    findPwStart(state, action) {
      state.permissions.canAccessFindPassword = true;
      state.payload.findPw = action.payload;
    },
    findPwEnd(state) {
      state.permissions.canAccessFindPassword = false;
      state.payload.findPw = { userId: '', email: '' };
    }
  }
});

export default authStatus.reducer;
export const { login, logout, findPwStart, findPwEnd } = authStatus.actions;
export { authStatus };
export type { AuthState };