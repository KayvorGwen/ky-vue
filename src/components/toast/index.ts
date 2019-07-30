
// tslint:disable-next-line:no-var-requires
const toastVue = require('./toast.vue');
import Vue from 'vue';

const Toast = Vue.extend(toastVue);

// tslint:disable-next-line:ban-types
export default (msg: string, cb?: Function) => {
    const toast = new Toast({
        el: document.createElement('div'),
        propsData: {
            msg,
        },
    });
    document.body.appendChild(toast.$el);
    return toast;
};

