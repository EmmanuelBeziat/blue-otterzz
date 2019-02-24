import axios from 'axios'
import { api } from '@/config'
// Initial state
const state = {
	songs: [],
}

// Getters
const getters = {
	list: state => state.songs,
	count: state => state.songs.length,
	getSong: state => slug => state.songs.find(song => song.slug === slug)
}


// Actions
const actions = {
	async init ({ commit }) {
		let { data } = await axios.get(api.root + api.routes.songs)
		commit('SET_SONGS', data)
	},

	add ({ commit }, song) {
		commit('ADD_SONG', song)
	},

	edit ({ commit }, song) {
		commit('EDIT_SONG', song)
	},

	remove ({ commit }, song) {
		commit('REMOVE_SONG', song)
	}
}

// Mutations
const mutations = {
	SET_SONGS (state, songs) {
		state.songs = songs
	},

	ADD_SONG (state, song) {
		state.songs.push(song)
	},

	EDIT_SONG (state, song) {
		const index = state.songs.findIndex(single => single.slug = song.slug)
		state.songs[index] = song
	},

	REMOVE_SONG (state, song) {
		const index = state.songs.findIndex(single => single.slug = song.slug)
		state.songs.splice(index, 1)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
