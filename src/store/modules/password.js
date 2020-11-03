import apiRequest from '../../services/apiRequest';

const state = {
  error: null,
  message: null
}

const mutations = {
  setError: (state, msg) => {
    state.error = msg
  },
  setMessage: (state, msg) => {
    state.message = msg
  },
}
const actions = {
  async setEmptyError({ commit }) {
    commit('setError', '')
  },
  async sendEmail({ commit }, params) {
    try {
      const data = await apiRequest.request(params)
      commit('setMessage', data.message)
      return true
    } catch (e) {
      commit('setError', e.message)
      return false
    }
  },
  async verifyEmail({ commit }, params) {
    try {
      await apiRequest.request(params)
      return true
    } catch (e) {
      commit('setError', e.message)
      return false
    }
  },
}
const getters = {
  error: state => state.error,
  message: state => state.message,
}

const passwordStore = {
  namespaced: true,
  mutations,
  getters,
  actions,
  state,
}
export default passwordStore
