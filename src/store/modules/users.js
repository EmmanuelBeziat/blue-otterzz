/* import axios from 'axios'
import { api } from '@/config' */

// Initial state
const state = {
	users: null,
}

// Getters
const getters = {
	getUser: state => slug => {
		return state.users.find(user => user.slug === slug)
	},
}

// Actions
const actions = {
	async init ({ commit }) {
		// let { data } = await axios.get(api.users)
		commit('SET_USERS', require(`@/assets/data/users.json`))
	},

	add ({ commit }, user) {
		commit('ADD_USER', user)
	},

	edit ({ commit }, user) {
		commit('EDIT_USER', user)
	},

	remove ({ commit }, user) {
		commit('REMOVE_USER', user)
	}
}

// Mutations
const mutations = {
	SET_USERS (state, users) {
		state.users = users
	},

	ADD_USER (state, user) {
		state.users.push(user)
	},

	EDIT_USER (state, user) {
		const index = state.users.findIndex(single => single.id = user.id)
		state.users[index] = user
	},

	REMOVE_user (state, user) {
		const index = state.users.findIndex(single => single.id = user.id)
		state.users.splice(index, 1)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
