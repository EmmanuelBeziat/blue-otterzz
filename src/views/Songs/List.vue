<template>
	<div class="dashboard">
		<template v-if="songs.length">
			<Table class="songs" :columns="columns" :data="songs">
				<template slot-scope="{ row }" slot="score"><Rate allow-half :value="row.score" custom-icon="icon-pick" disabled /></template>
				<template slot-scope="{ row }" slot="submited"><router-link :to="{ name: 'user', params: { slug: row.user }}">{{ getUserName(row.user) }}</router-link></template>
				<template slot-scope="{ row }" slot="registered">{{ row.date | date }}</template>
				<template slot-scope="{ row }" slot="url"><ModalPlayer :source="row.url" /></template>
				<template slot-scope="{ row }" slot="files">
					<Tooltip content="Tablature" placement="top">
						<a v-if="row.files.sheets.length" class="file-download" :href="downloadFile(row.slug, row.files.sheets[row.files.sheets.length - 1].file)"><Icon size="24" custom="icon-pick" /></a>
						<span v-else class="file-download"><Icon size="24" custom="icon-pick" /></span>
					</Tooltip>
					<Tooltip content="Paroles" placement="top">
						<a v-if="row.files.lyrics.length" class="file-download" :href="downloadFile(row.slug, row.files.lyrics[row.files.lyrics.length - 1].file)"><Icon size="24" type="md-microphone" /></a>
						<span v-else class="file-download"><Icon size="24" type="md-microphone" /></span>
					</Tooltip>
					<Tooltip content="Backtrack" placement="top">
						<a v-if="row.files.backtracks.length" class="file-download" :href="downloadFile(row.slug, row.files.backtracks[row.files.backtracks.length - 1].file)"><Icon size="24" type="md-laptop" /></a>
						<span v-else class="file-download"><Icon size="24" type="md-laptop" /></span>
					</Tooltip>
				</template>
				<template slot-scope="{ row }" slot="action">
					<Button icon="md-eye" type="default" style="margin-right: 5px" @click="$router.push({ name: 'song', params: { slug: row.slug }})" />
					<!-- <Button icon="md-trash" type="error" @click="remove(row._id)" /> -->
				</template>
			</Table>
		</template>
	</div>
</template>

<script>
import { api } from '@/config'
import ModalPlayer from '@/components/player/Modal'
import getUserName from '@/plugins/mixins/getUserName'

export default {
	name: 'Songs',
	mixins: [getUserName],

	data () {
		return {
			columns: [
				// { type: 'selection', width: 60, align: 'center' },
				{ title: 'Artiste', key: 'artist', sortable: true },
				{ title: 'Titre', key: 'title', sortable: true },
				{ title: 'Note', key: 'score', slot: 'score', sortable: true },
				{ title: 'Proposé par', key: 'user', slot: 'submited', sortable: true	},
				{ title: 'Proposé le', key: 'date', slot: 'registered', sortable: true },
				{ title: 'Audio', slot: 'url', width: 120, align: 'center' },
				{ title: 'Fichiers', slot: 'files', align: 'center', width: 160 },
				{ title: 'Voir', width: 80, align: 'center', slot: 'action' }
			]
		}
	},

	computed: {
		songs () {
			return this.$store.getters['songs/list'].map(key => {
				return {
					slug: key.slug,
					artist: key.infos.artist,
					title: key.infos.title,
					score: this.getScore(key.score),
					date: key.submited.date,
					user: key.submited.user,
					url: key.meta.url,
					files: key.files
				}
			})
		},
	},

	components: {
		ModalPlayer
	},

	methods: {
		/**
		 * Get all the scores and make an average
		 * @param value { Array } Values
		 */
		getScore (values) {
			return values.reduce((accumulator, value) => accumulator + value.value, 0) / values.length
		},

		/**
		 * Get the url to download a file
		 * @param slug { String } Song slug
		 * @param file { String } File name
		 */
		downloadFile (slug, file) {
			return `${api.files}/${slug}/${file}`
		},
	}
}
</script>

<style lang="stylus" scoped>
.dashboard
	overflow-x auto
	.songs
		min-width 1200px

.loader
	display flex
	padding 2rem
	justify-content center

.file-download
	padding 0 .35em

	span&
		color var(--color-grey)
</style>
