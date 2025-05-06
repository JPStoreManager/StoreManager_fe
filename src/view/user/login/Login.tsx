import apiUtil from "../../../component/util/ApiUtil";
import { ResultResponse } from "../../../component/util/ApiResponse";

type LoginRequest = {
    id: string;
    password: string;
};

interface LoginResponse {
    isSuccess: ResultResponse;
    msg: string;
}

const login = async (request: LoginRequest): Promise<boolean> => {
    const { id, password } = request;
    if(!id?.trim() || !password?.trim()) throw new Error('id and password are required');

    return await apiUtil.post(apiUtil.API.USER.LOGIN.path, {id, password})
        .then(res => {
            if(res.status === 200) return res.json().then(data => data.result === ResultResponse.YES);
            else return false;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
}

export {login};
export type {LoginRequest, LoginResponse};