/* import axios from 'axios'
import { api } from '@/config' */

// Initial state
const state = {
	songs: null,
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
		// let { data } = await axios.get(api.songs)
		commit('SET_SONGS', require(`@/assets/data/songs.json`))
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
		const index = state.songs.findIndex(single => single.id = song.id)
		state.songs[index] = song
	},

	REMOVE_SONG (state, song) {
		const index = state.songs.findIndex(single => single.id = song.id)
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
