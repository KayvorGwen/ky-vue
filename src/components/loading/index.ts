// tslint:disable-next-line:no-var-requires
const loadingVue = require('./loading.vue');
import Vue from 'vue';

interface LoadingVue extends Vue {
    show: boolean;
}

const Loading = Vue.extend(loadingVue);

let loadingSingleInstance: LoadingVue|null = null;

const show = () => {
    if (loadingSingleInstance) {
        return;
    }
    loadingSingleInstance = (new Loading({
        el: document.createElement('div'),
        mixins: [{
            destroyed() {
                debugger;
                (loadingSingleInstance as any).$el.remove();
                loadingSingleInstance = null;
            }
        }]
    })  as LoadingVue );

    document.body.appendChild(loadingSingleInstance.$el);
};

const hide = () => {
    if (loadingSingleInstance === null) {
        return;
    }
    loadingSingleInstance.show = false;
};

const isShow = () => {
    return loadingSingleInstance && loadingSingleInstance.show;
};


export default {
    show,
    hide,
    isShow,
};
