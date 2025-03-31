import { resultReponse } from "../../component/util/ApiResponse";
import apiUtil from "../../component/util/ApiUtil";

const login: ( id: string, password: string ) => Promise<boolean> = async (id, password) => {
    return await apiUtil.post(apiUtil.PATH.USER.LOGIN, {id, password})
        .then(res => {
            if(res.status === 200) return res.json().then(data => data.result === resultReponse.YES);
            else return false;
        });
}

export {login};