<template>
	<div class="user-view">
		{{ user }}
	</div>
</template>

<script>
export default {
	name: 'User',

	computed: {
		song () {
			return this.$store.getters['songs/getSong'](this.$route.params.slug)
		}
	},

	methods: {
		getUserName (slug) {
			const user = this.$store.getters['users/getUser'](slug)
			return user.name
		},
	}
}
</script>
