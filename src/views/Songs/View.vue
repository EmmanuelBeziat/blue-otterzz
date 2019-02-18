<template>
	<div class="song-view">
		<h1>{{ song.artist }} — {{ song.title }}</h1>
		Posté {{ song.registered | date }} par <router-link :to="{ name: 'user', params: { slug: song.submited }}">{{ getUserName(song.submited) }}</router-link>

		<IframePlayer class="iframe-content" :source="song.url" />

		<section class="files">
			<Divider><h1>Fichiers</h1></Divider>

			<h2><Icon custom="icon-pick" /> Tablatures &amp; partitions</h2>
			<FilesList :files="song.files.sheet" :formats="fileFormats.tabs" />

			<h2><Icon type="md-laptop" /> Backtracks</h2>
			<FilesList :files="song.files.backtrack" :formats="fileFormats.backtracks" />

			<h2><Icon type="md-microphone" /> Paroles</h2>
			<FilesList :files="song.files.lyrics" :formats="fileFormats.lyrics" />
		</section>
	</div>
</template>

<script>
import IframePlayer from '@/components/player/Iframe'
import FilesList from '@/components/files/FilesList'
import getUserName from '@/plugins/mixins/getUserName'

export default {
	name: 'Song',
	mixins: [getUserName],

	data () {
		return {
			fileFormats: {
				tabs: ['gp5', 'gpx', 'pdf'],
				lyrics: ['txt', 'pdf', 'doc', 'docx'],
				backtracks: ['mp3', 'ogg', 'flac', 'wav', 'mid']
			}
		}
	},

	computed: {
		song () {
			return this.$store.getters['songs/getSong'](this.$route.params.slug)
		}
	},

	components: {
		IframePlayer,
		FilesList
	},
}
</script>

<style lang="stylus" scoped>
h2
	margin-bottom 1rem

.iframe-content
	display block
	margin 2rem auto 1rem
	text-align center
</style>
