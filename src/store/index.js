import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import songs from '@/store/modules/songs.js'
import users from '@/store/modules/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		songs,
		users,
	},
})
