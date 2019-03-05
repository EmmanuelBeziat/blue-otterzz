export default {
	data () {
		return {
			path: ''
		}
	},

	created () {
		this.getPath()
	},

	watch: {
		'$route': 'getPath'
	},

	methods: {
		getPath () {
			this.path = this.$router.currentRoute.path
		}
	}
}
