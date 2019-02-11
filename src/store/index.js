import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import projects from '@/store/modules/projects.js'
import users from '@/store/modules/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		projects,
		users,
	},
})
