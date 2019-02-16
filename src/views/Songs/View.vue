<template>
	<div class="song-view">
		<h1>{{ song.artist }} — {{ song.title }}</h1>
		Posté {{ song.registered | date }} par <router-link :to="{ name: 'user', params: { slug: song.submited }}">{{ getUserName(song.submited) }}</router-link>

		<IframePlayer class="iframe-content" :source="song.url" />

		<section class="files">
			<Divider><h2>Fichiers</h2></Divider>

		</section>
	</div>
</template>

<script>
import IframePlayer from '@/components/player/Iframe'

export default {
	name: 'Song',

	computed: {
		song () {
			return this.$store.getters['songs/getSong'](this.$route.params.slug)
		}
	},

	components: {
		IframePlayer
	},

	methods: {
		getUserName (slug) {
			const user = this.$store.getters['users/getUser'](slug)
			return user.name
		},
	}
}
</script>

<style lang="stylus" scoped>
.iframe-content
	display block
	margin 2rem auto 1rem
	text-align center
</style>
