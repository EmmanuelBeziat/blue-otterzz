/* import axios from 'axios'
import { api } from '@/config' */

// Initial state
const state = {
	lives: null,
}

// Getters
const getters = {
	list: state => state.lives,
	count: state => state.lives.length,
	getSongs: state => slug => state.lives.find(live => live.slug === slug),
}

// Actions
const actions = {
	async init ({ commit }) {
		// let { data } = await axios.get(api.lives)
		commit('SET_LIVES', require(`@/assets/data/lives.json`))
	},

	add ({ commit }, live) {
		commit('ADD_LIVE', live)
	},

	edit ({ commit }, live) {
		commit('EDIT_LIVE', live)
	},

	remove ({ commit }, live) {
		commit('REMOVE_LIVE', live)
	}
}

// Mutations
const mutations = {
	SET_LIVES (state, lives) {
		state.lives = lives
	},

	ADD_LIVE (state, live) {
		state.lives.push(live)
	},

	EDIT_LIVE (state, live) {
		const index = state.lives.findIndex(single => single.id = live.id)
		state.lives[index] = live
	},

	REMOVE_LIVE (state, live) {
		const index = state.lives.findIndex(single => single.id = live.id)
		state.lives.splice(index, 1)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
