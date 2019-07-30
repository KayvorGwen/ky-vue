const alertVue = require('./alert.vue');
const confirmVue =  require('./confirm.vue');
import Vue from 'vue';
import lang from './lang';
import { remove } from '../../lib/dom';

const Alert = Vue.extend(alertVue);
const Confirm = Vue.extend(confirmVue);


let AlertSingleInstance: any = null;
let ConfirmSingleInstance: any = null;


interface AlertOptions {
    msg?: string;
    confirmText?: string;
    isShow?: boolean;
    isClose?: boolean;
    showAlert?: boolean;
}

interface PromiseWidthClose extends Promise<any> {
    close: (result?: any) => void;
}

export const alert = ({
    msg,
    confirmText = lang.confirm,
    isShow = false,
    isClose = false,
    showAlert = false,
}: AlertOptions) => {
    if (showAlert) {
        const model = (document.querySelector('.component-alert') as Element);
        document.body.removeChild(model);
        return;
    }
    // if (!msg) {
    //     throw new Error('info can not be empty');
    // }

    if (AlertSingleInstance) {
        AlertSingleInstance.setMsg(msg);
        return;
    }

    const instance = new Alert({

        propsData: {
            msg,
            confirmText,
            isShow,
            isClose,
        },

        mixins: [{
            created() {
                AlertSingleInstance = this;
            },
            destroyed() {
                remove(AlertSingleInstance.$el);
                AlertSingleInstance = null;
            }
        }],
        el: document.createElement('div'),
    });

    document.body.appendChild(instance.$el);

    const promise = new Promise<void>((resolve, reject) => {
        instance.$once('close', () => {
            resolve();
        });
    });

    (promise as PromiseWidthClose).close = () => {
        AlertSingleInstance.popupClose();
    };

    return promise;
};


interface ConfirmOptions {
    msg: string;
    cancelText?: string;
    confirmText?: string;
    isShow?: boolean;
}

export const confirm = ({
    msg,
    cancelText = lang.cancel,
    confirmText = lang.confirm,
    isShow = true,
}: ConfirmOptions) => {
    if (!msg) {
        throw new Error('info can not be empty');
    }

    const instance = new Confirm({

        propsData: {
            msg,
            cancelText,
            confirmText,
            isShow,
        },

        mixins: [{
            created() {
                ConfirmSingleInstance = this;
            },
            destroyed() {
                remove(ConfirmSingleInstance.$el);
                ConfirmSingleInstance = null;
            },
        }],
        el: document.createElement('div')
    });

    document.body.appendChild(instance.$el);

    const promise = new Promise<boolean>((resolve, reject) => {
        instance.$once('close', (result: boolean) => {
            resolve(result);
        });
    });

    // 暂时只提供测试用的方法
    (promise as PromiseWidthClose).close = (result) => {
        ConfirmSingleInstance.close(result);
        ConfirmSingleInstance.popupClose();
    };

    return promise;
};
