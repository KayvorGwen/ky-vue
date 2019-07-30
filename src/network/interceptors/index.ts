// import _ = require('lodash');
import _ from 'lodash';

import apiMap from '../apiMap';
import errorCode from '../errorCode';
import errorHandlers from '../errorHandlers';
import lang from '../../i18n/common';
import qs from 'qs';
import { ResponseData, FetchConfig } from '../../interfaces/common';
import { AxiosError } from 'axios';

function isAbsoulteUrl(src: string) {
    return src.match(/^(http|https|\/\/)/g);
}

/**
 * 将 apiName, url 等按照优先级处理，转化成实际的 api 地址。
 * @param config 发送请求时候传入的配置
 */
export function resolveConfigUrl(config: FetchConfig): any {
    config.apiName = config.apiName ? config.apiName : '';
    if (!config.apiName) {
        return Promise.reject(new Error('apiName cannot be empty'));
    }
    const name = apiMap[config.apiName] || config.url;
    if (!name) {
        return Promise.reject(new Error('request url cannot be empty'));
    }
    // 局域网内其他用户访问要编写ip+端口，否则会报错
    config.url = `http://192.168.6.10:3000/${name}`;

    return _.omit(config, 'apiName');
}

/**
 * 给 errors 一个默认值。 errors 用户需要处理的错误代码。如果定义了，fetch 会将写错误的情况都交给使用者处理
 * @param config 发送请求时候传入的配置
 */
export function resolveConfigErrors(config: FetchConfig) {
    const {errors} = config;

    if (!errors) {
        config.errors = [];
    }
    return config;
}

/**
 * 将 config.data 序列化成 application/x-www-form-urlencoded
 * @param config 发送请求时候传入的配置
 */
export function resolveConfigPostData(config: FetchConfig) {
    const {method} = config;
    const url = config.url ? config.url : '';
    // 不序列化上传图片接口format对象
    if (url.indexOf('/upload') === -1) {
        if (method && method.toLowerCase() === 'post') {
            config.data = qs.stringify(config.data || {});
        }
    }
    return config;
}

/**
 * 添加一些系统级别的参数和默认参数
 * @param config 发送请求时候传入的配置
 */
export function  resolveConfigParams(config: FetchConfig) {
    return new Promise((resolve, reject) => {
            config.params = config.params || {};
            // const params = {
            //     token: window.localStorage.getItem('token'),
            // };
            // _.extend(config.params, params);

            // 将token写入请求头
            if (window.localStorage.getItem('token')) {
                config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
            }
            config.paramsSerializer  = qs.stringify;
            const method = config.method;
            if (method && method.toUpperCase() === 'GET' && config.data) {
                delete config.data;
            }
            resolve(config);
    }) as any;
}



/**
 * 根据错误码和 config.errors 来做不同的处理
 * @param res ResponseData
 */
export function handleErrorCode(res: ResponseData<any>) {
    const data = res.data;
    const errCode = Number(data.errcode);
    const errMsg = data.errmsg || errorCode[errCode] || '未定义错误';
    if (errCode === 0) {
        return res;
    } else if (_.indexOf(res.config.errors, errCode) > -1) {
        return Promise.reject(res) as any;
    } else if (_.has(errorHandlers, errCode)) {
        const handler = (errorHandlers as any)[errCode];
        handler(errCode, errMsg);
    } else {
        errorHandlers.default(errCode, errMsg);
    }
    return Promise.reject(res) as any;
}

/**
 * 处理网络错误，比如 404, 请求被 cancel 等情况
 * @param err AxiosError
 */
export function handleNetworkError(err: AxiosError) {
    const {response, code, message} = err;
    let errMsg;
    if (!response) {
        if (code === 'ECONNABORTED') {
            errorHandlers.abort(lang.netError);
            // 下面这个是 debug 专用。
            // errorHandlers.abort(`网络错误(${code}:${message})`);
        } else if (message.indexOf('cancel') >= 0) {
            // console.log(message);
        } else {
            errorHandlers.default('unknown', `${code}:${message}`);
        }
    } else {
        errMsg = response.status ? `[${response.status}]` : err.message;
        errorHandlers.default(response.status || 'abort', errMsg);
    }
    return Promise.reject(err);
}

/**
 * 将返回的结果，加入到任务队列中，由任务队列来决定什么时候，将数据返回给业务那边
 * @param response ResponseData
 */
export function queueTaskSuccessResponse(response: ResponseData<any>) {
    return new Promise((resolve) => {
        resolve(response);
    }) as any;
}

/**
 * 将返回的错误，加入到任务队列中，由任务队列来决定什么时候，将数据返回给业务那边
 * @param err 略
 */
export function queueTaskFailResponse(err: any) {
    return new Promise((resolve, reject) => {
        reject(err);
    });
}
