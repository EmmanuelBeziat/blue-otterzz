/* import axios from 'axios'
import { api } from '@/config' */

// Initial state
const state = {
	projects: null,
}

// Getters
const getters = {
	list: state => state.projects,
	count: state => state.projects.length,
	getProject: state => slug => state.projects.find(project => project.slug === slug),
}

// Actions
const actions = {
	async init ({ commit }) {
		// let { data } = await axios.get(api.projects)
		commit('SET_PROJECTS', require(`@/assets/data/projects.json`))
	},

	add ({ commit }, project) {
		commit('ADD_PROJECT', project)
	},

	edit ({ commit }, project) {
		commit('EDIT_PROJECT', project)
	},

	remove ({ commit }, project) {
		commit('REMOVE_PROJECT', project)
	}
}

// Mutations
const mutations = {
	SET_PROJECTS (state, projects) {
		state.projects = projects
	},

	ADD_PROJECT (state, project) {
		state.projects.push(project)
	},

	EDIT_PROJECT (state, project) {
		const index = state.projects.findIndex(single => single.id = project.id)
		state.projects[index] = project
	},

	REMOVE_PROJECT (state, project) {
		const index = state.projects.findIndex(single => single.id = project.id)
		state.projects.splice(index, 1)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
