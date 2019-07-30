
import { AxiosResponse, AxiosRequestConfig } from 'axios';

interface Data<T> {
    /**
     * 错误码
     */
    errcode: number|string;
    /**
     * 错误信息
     */
    errmsg: string;
    /**
     * 数据
     */
    data: T;
}

export interface FetchConfig extends AxiosRequestConfig {
    /**
     * 接口名称
     */
    apiName?: string;
    /**
     * 需要处理的错误码。当 fetch 遇到这个错误码的时候，会将该错误抛给用户处理，而不是使用默认的处理程序
     */
    errors?: number[];
}

export interface ResponseData<T> extends AxiosResponse {
    data: Data<T>;
    config: FetchConfig;
}
