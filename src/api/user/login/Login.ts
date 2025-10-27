import apiUtil from "../../ApiUtil";
import { ApiResponse, ResultResponse } from "../../ApiResponse";

type LoginRequest = {
    id: string;
    password: string;
};

const login = async (request: LoginRequest): Promise<ApiResponse<void>> => {
    const { id, password } = request;
    if(!id?.trim() || !password?.trim()) throw new Error('id and password are required');

    return await apiUtil.post(apiUtil.API.USER.LOGIN.path, {id, password})
        .then(res => {
            if(res.status === 200) return res.json().then(data => data);
            else return { result: ResultResponse.NO, msg: 'Login failed', timestamp: new Date().toISOString(), data: undefined };
        })
        .catch((err) => {
            console.log(err);
            return { result: ResultResponse.NO, msg: 'Login failed', timestamp: new Date().toISOString(), data: undefined };
        });
}

export {login};
export type {LoginRequest};