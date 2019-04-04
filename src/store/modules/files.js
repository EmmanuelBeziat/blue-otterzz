import axios from 'axios'
import { api } from '@/config'
import oneDriveAPI from 'onedrive-api'

// Initial state
const state = {
	files: [],
}

// Getters
const getters = {
	list: state => state.files,
	count: state => state.files.length,
}


// Actions
const actions = {
	async init ({ commit }) {
		// let { data } = await axios.get(api.root + api.routes.songs)
		let { data } = await oneDriveAPI.items.listChildren({
			accessToken: api.onedrive.token,
			itemId: api.onedrive.id
		})
	},

	/* add ({ commit }, song) {
		commit('ADD_SONG', song)
	},

	edit ({ commit }, song) {
		commit('EDIT_SONG', song)
	},

	remove ({ commit }, song) {
		commit('REMOVE_SONG', song)
	} */
}

// Mutations
const mutations = {
	/* SET_SONGS (state, songs) {
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
	} */
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
