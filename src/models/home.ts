import fetch from '../network/fetch';
import { ResponseData } from '../interfaces/common';
import {
    HomeResult
} from '../interfaces/home';

type HomeResponse = ResponseData<HomeResult>;

const getHomeData = () => {
    return fetch({
        apiName: 'home',
    }) as Promise<HomeResponse>;
}

export {
    getHomeData,
};
