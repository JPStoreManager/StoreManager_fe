import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import apiUtil from '../component/util/ApiUtil'

interface AuthPermissions {
  isUserLoggedIn: boolean
  canAccessFindPasswordVerifyOtp: boolean
  canAccessFindPasswordUpdatePw: boolean
}

interface AuthState {
  permissions: AuthPermissions
  payload: {
    login: { userId: string }
    findPw: { userId: string; email: string }
  }
  loading: boolean
}

const initialState: AuthState = {
  permissions: {
    isUserLoggedIn: false,
    canAccessFindPasswordVerifyOtp: false,
    canAccessFindPasswordUpdatePw: false,
  },
  payload: {
    login: { userId: '' },
    findPw: { userId: '', email: '' },
  },
  loading: false,
}

const checkAuth = async (): Promise<{userId: string}> => {
    const response = await apiUtil.get(apiUtil.API.AUTH.AUTHORIZATION.path);

    if (response.ok) {
      const data = await response.json();
      return { userId: data.userId };
    } else {
      return { userId: '' };
    }
};

const authStatus = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ userId: string }>) {
      state.permissions.isUserLoggedIn = true
      state.payload.login.userId = action.payload.userId
    },
    logout(state) {
      state.permissions.isUserLoggedIn = false
      state.payload.login.userId = ''
    },
    // --- findPw 관련 리듀서는 동일 ---
    findPwSendOtp(state, action) {
      state.permissions.canAccessFindPasswordVerifyOtp = true
      state.permissions.canAccessFindPasswordUpdatePw = false
      state.payload.findPw = action.payload
    },
    findPwVerifyOtp(state, action) {
      state.permissions.canAccessFindPasswordVerifyOtp = true
      state.permissions.canAccessFindPasswordUpdatePw = true
      state.payload.findPw = action.payload
    },
    findPwUpdatePw(state) {
      state.permissions.canAccessFindPasswordVerifyOtp = false
      state.permissions.canAccessFindPasswordUpdatePw = false
      state.payload.findPw = { userId: '', email: '' }
    },
  },
})

export const {
  login,
  logout,
  findPwSendOtp,
  findPwVerifyOtp,
  findPwUpdatePw,
} = authStatus.actions;
export {checkAuth};
export default authStatus.reducer;
export type { AuthState };