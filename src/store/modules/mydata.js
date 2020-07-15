import Cookies from 'js-cookie'

const state = {
	id: 1,
	token: 'this is test token'
}

const mutations = {
	SET_ID: (state, id) => {
		state.id = id;
	},
	SET_TOKEN: (state, token) => {
		state.token = token;
	}
}

const actions = {
	setId({commit}, id) {
		commit('SET_ID', id);
	},
	setToken({commit}, token) {
		commit('SET_TOKEN', token);
	}
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}