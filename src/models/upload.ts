import fetch from '../network/fetch';
import { ResponseData } from '../interfaces/common';
import {
    UpResult,
    RelevanceConfig,
} from '../interfaces/upload';

type UploadResponse = ResponseData<UpResult>;

const upload = (data: any) => {
    return fetch({
        apiName: 'upload',
        method: 'post',
        data,
    }) as Promise<UploadResponse>;
};

const relevance = (params: RelevanceConfig) => {
    return fetch({
        apiName: 'relevance',
        params,
    });
};

export {
    upload,
    relevance,
};

