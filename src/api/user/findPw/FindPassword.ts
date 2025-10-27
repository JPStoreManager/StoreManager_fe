import apiUtil from '../../ApiUtil'
import { ResultResponse } from '../../ApiResponse';

const FIND_PW_HEADER: string = 'jp_fpw_id'
const FIND_PW_SESSION_ID: string = 'sessionId';
interface FindPwBaseResponse {
    result: ResultResponse;
    msg: string;
    sessionId: string;
}

const saveFindPwSessionId = (sessionId: string): void => {
    sessionStorage.setItem(FIND_PW_SESSION_ID, sessionId);
};
const getFindPwSessionId = (): string => {
    return sessionStorage.getItem(FIND_PW_SESSION_ID) || '';
};


type SendOtpRequest = {
    userId: string;
    email: string;
};

interface SendOtpResponse extends FindPwBaseResponse {};

const sendOtp = async (request: SendOtpRequest): Promise<SendOtpResponse> => {
    const { userId, email } = request;

    if(!userId?.trim() || !email?.trim()) throw new Error('id and email are required');

    return await apiUtil.post(apiUtil.API.USER.FIND_PW_SEND_OTP.path, {userId, email})
        .then(res => {
            if(res.status === 200) return res.json().then(data => data);
            else throw new Error('Failed to send OTP');
        });
};


type VerifyOtpRequest = {
    userId: string;
    email: string;
    otp: string;
};

type VerifyOtpResponse = FindPwBaseResponse;

const verifyOtp = async (request: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const { userId, email, otp } = request;

    if(!userId?.trim() || !email?.trim() || !otp?.trim()) throw new Error('OTP is required');
    const headers = new Map<string, string>();
    headers.set(FIND_PW_HEADER, getFindPwSessionId());

    return await apiUtil.post(apiUtil.API.USER.FIND_PW_VERIFY_OTP.path, {userId, email, otp}, headers)
        .then(res => {
            if(res.status === 200) return res.json().then(data => data);
            else throw new Error('Failed to verify OTP');
        });
};


type UpdatePwRequest = {
    userId: string;
    email: string;
    newPassword: string;
};

type UpdatePwResponse = FindPwBaseResponse;

const updatePw = async (request: UpdatePwRequest): Promise<UpdatePwResponse> => {
    const { userId, email, newPassword } = request;

    if(!userId?.trim() || !email?.trim() || !newPassword?.trim()) throw new Error('The valid password is required');
    const headers = new Map<string, string>();
    headers.set(FIND_PW_HEADER, getFindPwSessionId());

    return await apiUtil.put(apiUtil.API.USER.FIND_PW_UPDATE_PW.path, {userId, email, newPassword}, headers)
        .then(res => {
            if(res.status === 200) return res.json().then(data => data);
            else throw new Error('Failed to update password');
        });
};


export {sendOtp, verifyOtp, updatePw};
export {saveFindPwSessionId, getFindPwSessionId};
export type {SendOtpRequest, SendOtpResponse, VerifyOtpRequest, VerifyOtpResponse, UpdatePwRequest, UpdatePwResponse};