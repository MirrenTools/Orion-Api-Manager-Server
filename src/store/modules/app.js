// import Cookies from 'js-cookie'

const state = {
	sidebar: {
		opened: true,
		sidebarStatus: 0,
		withoutAnimation: false
	},
	device: 'desktop',
	uid: null,
	sessionId: null,
	role: null
}

const mutations = {
	TOGGLE_SIDEBAR: state => {
		state.sidebar.opened = !state.sidebar.opened
		state.sidebar.withoutAnimation = false
		if (state.sidebar.opened) {
			state.sidebar.sidebarStatus = 1;
		} else {
			state.sidebar.sidebarStatus = 0;
		}
	},
	CLOSE_SIDEBAR: (state, withoutAnimation) => {
		state.sidebar.sidebarStatus = 0;
		state.sidebar.opened = false
		state.sidebar.withoutAnimation = withoutAnimation
	},
	TOGGLE_DEVICE: (state, device) => {
		state.device = device
	},
	LOGIN: (state, data) => {
		state.uid = data.uid;
		state.sessionId = data.sessionId;
		state.role = data.role;
	},
	LOGOUT: state => {
		state.uid = null;
		state.sessionId = null;
		state.role = null;
	}
}

const actions = {
	toggleSideBar({
		commit
	}) {
		commit('TOGGLE_SIDEBAR')
	},
	closeSideBar({
		commit
	}, {
		withoutAnimation
	}) {
		commit('CLOSE_SIDEBAR', withoutAnimation)
	},
	toggleDevice({
		commit
	}, device) {
		commit('TOGGLE_DEVICE', device)
	},
	login({
		commit
	}, data) {
		commit('LOGIN', data)
	},
	logout({
		commit
	}) {
		commit('LOGOUT')
	}


}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
