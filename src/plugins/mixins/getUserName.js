export default {
	methods: {
		getUserName (slug) {
			const user = this.$store.getters['users/getUser'](slug)
			return user.username
		}
	}
}
