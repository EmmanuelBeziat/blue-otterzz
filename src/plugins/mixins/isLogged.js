export default {
	computed: {
		isLogged () {
			return this.$store.getters['login/isLogged']
		}
	}
}
