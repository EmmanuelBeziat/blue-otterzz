// Initial state
const state = {
	logged: null,
	token: null
}

// Getters
const getters = {
	currentUser: state => state.logged,
	getToken: state => state.token,
	isLogged: state => state.logged ? true : false,
}


// Actions
const actions = {
	init ({ commit }) {
		const stored = window.localStorage.getItem('blue-otterzz-login')
		if (stored) {
			commit('LOG_IN', JSON.parse(stored))
		}
	},

	logIn ({ commit }, payload) {
		commit('LOG_IN', payload)
	},

	logOut ({ commit }) {
		commit('LOG_OUT')
	}
}

// Mutations
const mutations = {
	LOG_IN (state, payload) {
		state.logged = payload.user
		state.token = payload.token

		window.localStorage.setItem('blue-otterzz-login', JSON.stringify({ user: payload.user, token: payload.token }))
	},

	LOG_OUT (state) {
		state.logged = null
		state.token = null

		window.localStorage.removeItem('blue-otterzz-login')
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
