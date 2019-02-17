<template>
	<div class="user-view">
		{{ user }}
	</div>
</template>

<script>
export default {
	name: 'User',

	computed: {
		user () {
			return this.$store.getters['users/getUser'](this.$route.params.slug)
		}
	},
}
</script>
