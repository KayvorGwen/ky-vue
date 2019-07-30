import axios from 'axios';
import * as interceptors from './interceptors';

import { FetchConfig, ResponseData } from '../interfaces/common';
import { AxiosStatic } from 'axios';

// 自定义 axios 默认配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.timeout = 60000;

// 配置 axios 发送请求之前的拦截器
axios.interceptors.request.use(interceptors.resolveConfigErrors);
axios.interceptors.request.use(interceptors.resolveConfigPostData);
axios.interceptors.request.use(interceptors.resolveConfigUrl);
axios.interceptors.request.use(interceptors.resolveConfigParams);
// 配置 axios 收到响应之后的拦截器
axios.interceptors.response.use(interceptors.handleErrorCode, interceptors.handleNetworkError);
axios.interceptors.response.use(interceptors.queueTaskSuccessResponse, interceptors.queueTaskFailResponse);

function axiosWrap<T>(config: any): Promise<ResponseData<T>> {
    return axios(config) as Promise<ResponseData<T>>;
}
export default axiosWrap;
