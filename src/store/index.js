import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import songs from '@/store/modules/songs.js'
import lives from '@/store/modules/lives.js'
import users from '@/store/modules/users.js'
import login from '@/store/modules/login.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		songs,
		lives,
		users,
		login
	},
})
