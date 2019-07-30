import fetch from '../network/fetch';
import { ResponseData } from '../interfaces/common';
import {
    LoginConfig,
    LoginResult,
} from '../interfaces/login';

type LoginResponse = ResponseData<LoginResult>;

const login = (data: LoginConfig) => {
    return fetch({
        apiName: 'login',
        method: 'post',
        data,
    }) as Promise<LoginResponse>;
}

export {
    login,
};
