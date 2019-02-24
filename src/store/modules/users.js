import axios from 'axios'
import { api } from '@/config'

// Initial state
const state = {
	users: [],
}

// Getters
const getters = {
	list: state => state.users,
	getUser: state => slug => state.users.find(user => user.slug === slug)
}

// Actions
const actions = {
	async init ({ commit }) {
		let { data } = await axios.get(api.root + api.routes.users)
		commit('SET_USERS', data)
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
		const index = state.users.findIndex(single => single.slug = user.slug)
		state.users[index] = user
	},

	REMOVE_user (state, user) {
		const index = state.users.findIndex(single => single.slug = user.slug)
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
