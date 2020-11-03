/* eslint-disable no-shadow */
import { userInfoService, tokenService } from '../../services/storageService';
import { userService } from '../../services/userService'
import apiService from '../../services/apiService'
import router from '../../router'

const state = {
  currentUser: null,
  users: [],
  error: '',
};

const mutations = {
  setCurrentUser: (state, user) => {
    state.currentUser = user;
    userInfoService.saveUser(user);
  },
  setUsers: (state, user) => {
    state.users = user
  },
  setError: (state, { message }) => {
    state.error = message;
  },
};

const actions = {
  setCurrentUser({ commit }, user) {
    commit('setCurrentUser', user);
  },
  async login({ commit }, login) {
    try {
      const { user } = await userService.login(login)
      commit('setUser', user)
      return true
    } catch (e) {
      commit('setError', { code: e.errorCode, message: e.message })
      return false
    }
  },
  logout({ commit }) {
    commit('setUser', null)
    tokenService.removeToken();
    userInfoService.removeUser()
    apiService.removeHeader()
    router.push('/login')
    document.location.reload();
  },
};

const getters = {
  users: state => state.users,
  currentUser: state => state.currentUser,
  getUser: state => {
    if (!state.user) {
      return userInfoService.getUser()
    }
    return state.user
  },
  error: state => state.error,
};

const usersStore = {
  namespaced: false,
  state,
  getters,
  mutations,
  actions,
};

export default usersStore;
