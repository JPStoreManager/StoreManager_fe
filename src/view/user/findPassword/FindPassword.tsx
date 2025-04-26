import apiUtil from '../../../component/util/ApiUtil'
import { ResultResponse } from '../../../component/util/ApiResponse';

interface FindPwBaseResponse {
    result: ResultResponse;
    msg: string;
    sessionId: string;
}


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
            else return false;
        });
};



export {sendOtp};
export type {SendOtpRequest, SendOtpResponse};