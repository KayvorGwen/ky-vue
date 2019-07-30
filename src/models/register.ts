import fetch from '../network/fetch';
import { ResponseData } from '../interfaces/common';
import {
    RegisterConfig,
    RegisterResult,
} from '../interfaces/register';

type RegisterResponse = ResponseData<RegisterResult>;

const register = (data: RegisterConfig) => {
    return fetch({
        apiName: 'register',
        method: 'post',
        data,
    }) as Promise<RegisterResponse>;
}

export {
    register,
};
