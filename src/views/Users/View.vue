<template>
	<div class="song-view">
		<h1>{{ song.artist }} — {{ song.title }}</h1>
		Posté le {{ song.registered | date }} par <router-link :to="{ name: 'user', params: song.submited }">{{ getUserName(song.submited) }}</router-link>
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
