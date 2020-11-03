import Vue from 'vue';
import Vuex from 'vuex';
import passwordStore from './modules/password';
import usersStore from './modules/users';
import mainStore from './modules/main';
// import store from './modules/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    passwordStore,
    usersStore,
    mainStore,
  },
});
