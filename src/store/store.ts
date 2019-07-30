import Vue from 'vue';
import Vuex from 'vuex';
import {
  SET_LOGIN_INFO,
} from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    userId: '',
  },
  mutations: {
    [SET_LOGIN_INFO](state, playload) {
      state.userId = playload.userId;
      state.token = playload.token;
    }
  },
  actions: {
    [SET_LOGIN_INFO]({commit}, playload) {
      commit(SET_LOGIN_INFO, playload);
    }
  },
});
