<template>
	<div class="song-view">
		<template v-if="song">
			<h1>{{ song.infos.artist }} — {{ song.infos.title }}</h1>
			Posté {{ song.submited.date | date }} par <router-link :to="{ name: 'user', params: { slug: song.submited.user }}">{{ getUserName(song.submited.user) }}</router-link>

			<IframePlayer class="iframe-content" :source="song.meta.url" />

			<section class="files">
				<Divider><h1>Fichiers</h1></Divider>

				<h2><Icon custom="icon-pick" /> Tablatures &amp; partitions</h2>
				<FilesList :files="song.files.sheets" :options="{ formats: fileFormats.tabs, maxSize: 500 }" />

				<h2><Icon type="md-laptop" /> Backtracks</h2>
				<FilesList :files="song.files.backtracks" :options="{ formats: fileFormats.backtracks, maxSize: 131072 }" />

				<h2><Icon type="md-microphone" /> Paroles</h2>
				<FilesList :files="song.files.lyrics" :options="{ formats: fileFormats.lyrics, maxSize: 4096 }" />
			</section>
		</template>
	</div>
</template>

<script>
import { api } from '@/config'
import IframePlayer from '@/components/player/Iframe'
import FilesList from '@/components/files/FilesList'
import getUserName from '@/plugins/mixins/getUserName'
import oneDriveAPI from 'onedrive-api'

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

	created () {
		this.getFiles()
	},

	methods: {
		getFiles () {
			oneDriveAPI.items.listChildren({
				accessToken: api.onedrive.appId,
				itemID: 'root/Blue-Otterzz',
				user: 'emm_beziat@hotmail.com'
			})
				.then(files => {
					console.log(files)
				})
				.catch(error => console.log(error))
		}
	}
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
