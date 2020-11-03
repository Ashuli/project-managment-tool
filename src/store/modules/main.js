/* eslint-disable no-shadow */
import apiRequest from '../../services/apiRequest';

const state = {
  error: null,
  currentStatus: null,
  statuses: [],
  currentTaskCategory: null,
  taskCategories: [],
  currentProjectCategory: null,
  projectCategories: [],
  currentRole: null,
  roles: [],
  currentProject: null,
  projects: [],
  currentDocumentTypes: null,
  documentTypes: [],
  currentUser: null,
  users: [],
  currentTask: null,
  tasks: [],
};

const mutations = {
  setError: (state, { message }) => {
    state.error = message;
  },
  setCurrentStatus: (state, value) => {
    state.currentStatus = value
  },
  setStatuses: (state, value) => {
    state.statuses = value
  },
  setCurrentTaskCategory: (state, value) => {
    state.currentTaskCategory = value
  },
  setTaskCategory: (state, value) => {
    state.taskCategories = value
  },
  setCurrentProjectCategory: (state, value) => {
    state.currentProjectCategory = value
  },
  setProjectCategory: (state, value) => {
    state.projectCategories = value
  },
  setCurrentRole: (state, value) => {
    state.currentRole = value
  },
  setRoles: (state, value) => {
    state.roles = value
  },
  setCurrentProject: (state, value) => {
    state.currentProject = value
  },
  setProjects: (state, value) => {
    state.projects = value
  },
  setCurrentDocumentTypes: (state, value) => {
    state.currentDocumentTypes = value
  },
  setDocumentTypes: (state, value) => {
    state.documentTypes = value
  },
  setCurrentUser: (state, value) => {
    state.currentUser = value
  },
  setUsers: (state, value) => {
    state.users = value
  },
  setCurrentTask: (state, value) => {
    state.currentTask = value
  },
  setTasks: (state, value) => {
    state.tasks = value
  }
};

const actions = {
  setEmptyError({ commit }) {
    commit('setError', '')
  },
  setCurrentStatus({ commit }, value) {
    commit('setCurrentStatus', value)
  },
  setCurrentTaskCategory({ commit }, value) {
    commit('setCurrentTaskCategory', value)
  },
  setCurrentProjectCategory({ commit }, value) {
    commit('setCurrentProjectCategory', value)
  },
  setCurrentRole({ commit }, value) {
    commit('setCurrentRole', value)
  },
  setCurrentProject({ commit }, value) {
    commit('setCurrentProject', value)
  },
  setCurrentDocumentTypes({ commit }, value) {
    commit('setCurrentDocumentTypes', value)
  },
  setCurrentUser({ commit }, value) {
    commit('setCurrentUser', value)
  },
  setCurrentTask({ commit }, value) {
    commit('setCurrentTask', value)
  },
  async get({ commit }, params) {
    try {
      const { data } = await apiRequest.request(params);
      commit(params.mutation, data)
      return true;
    } catch (e) {
      commit('setError', { error: e.errorCode, message: e.message });
      return false;
    }
  },
  async getEntry({ commit }, params) {
    try {
      const { data } = await apiRequest.request(params);
      return data;
    } catch (e) {
      commit('setError', { error: e.errorCode, message: e.message });
      return false;
    }
  },
  async save({ commit }, params) {
    try {
      const { data } = await apiRequest.request(params);
      return data;
    } catch (e) {
      commit('setError', { error: e.errorCode, message: e.message });
      return false;
    }
  },
  async saveAndUpdate({ commit }, params) {
    try {
      const { data } = await apiRequest.request(params);
      commit(params.mutation, data)
      return true;
    } catch (e) {
      commit('setError', { error: e.errorCode, message: e.message });
      return false;
    }
  },
  async update({ commit }, params) {
    try {
      const { data } = await apiRequest.request(params);
      return data;
    } catch (e) {
      commit('setError', { error: e.errorCode, message: e.message });
      return false;
    }
  },
  async delete({ commit }, params) {
    try {
      const { data } = await apiRequest.request(params);
      return data;
    } catch (e) {
      commit('setError', { error: e.errorCode, message: e.message });
      return false;
    }
  },
  async upload({ commit }, data) {
    try {
      const response = await apiRequest.upload(data);
      return response
    } catch (e) {
      return false;
    }
  },
  async getApplication({ commit }, params) {
    try {
      const { data } = await apiRequest.getApplication(params);
      return data
    } catch (e) {
      return false;
    }
  },
};

const getters = {
  error: (state) => state.error,
  currentStatus: (state) => state.currentStatus,
  statuses: (state) => state.statuses,
  currentTaskCategory: (state) => state.currentTaskCategory,
  taskCategories: (state) => state.taskCategories,
  currentProjectCategory: (state) => state.currentProjectCategory,
  projectCategories: (state) => state.projectCategories,
  currentRole: (state) => state.currentRole,
  roles: (state) => state.roles,
  currentProject: (state) => state.currentProject,
  projects: (state) => state.projects,
  currentDocumentTypes: (state) => state.currentDocumentTypes,
  documentTypes: (state) => state.documentTypes,
  currentUser: (state) => state.currentUser,
  users: (state) => state.users,
  currentTask: (state) => state.currentTask,
  tasks: (state) => state.tasks
  
};

const mainStore = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default mainStore;
