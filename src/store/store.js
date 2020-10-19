import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		errorMsg: '',
		projects: []
	},
	getters: {
		getProjects(state) {
			return state.projects
		}
	},
  mutations: {
		retrieveToken(state, token) {
			state.token = token
		},
		SET_PROJECTS(state, projects) {
			state.projects = projects 
		},
		SET_STATUS(state, status ) {
			state.status = status
		},
		SET_CATEGORIES(state, categories) {
			state.categories = categories
		}
  },
  actions: {
    async retrieveToken(context, credentials) {
			localStorage.removeItem('access_token');
			// console.log('removed');
			// console.log(localStorage.getItem('access_token'));
		await	api.post('/auth/login', {
				email: credentials.email,
				password: credentials.password
			})
				.then((response) => {
					const token = response.data.access_token
					if(token) {
						localStorage.setItem('access_token', token);
					}
					// console.log(localStorage.getItem('access_token'))
					context.commit('retrieveToken', token)
				})
				.catch((error) => {
					if(error.response) {
						if(error.response.status === 401){
							context.state.errorMsg = 'Incorrect Email/Password'
						} else {
							context.state.errorMsg = ''
						}
					}
				});
		},
		getProjects({ commit }) {
				api.get('/projects')
				.then(response => {
					commit('SET_PROJECTS', response.data)
				})
			},
		getStatus({ commit }) {
			api.get('/status')
			.then(response => {
				commit('SET_STATUS', response.data)
			})
		},
		getCategory({ commit }) {
			api.get('/project_categories')
			.then(response => {
				commit('SET_CATEGORIES', response.data)
			})
		},
		addProjects({ commit }) {
			api.post('/projects')
		}
  },
  modules: {
  }
})
