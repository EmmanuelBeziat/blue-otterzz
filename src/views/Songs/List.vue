<template>
	<div class="dashboard">
		<Table class="songs" :columns="columns" :data="songs">
			<template slot-scope="{ row }" slot="scores"><Rate allow-half :value="getScore(row.scores)" custom-icon="icon-pick" disabled /></template>
			<template slot-scope="{ row }" slot="submited"><router-link :to="{ name: 'user', params: { slug: row.submited }}">{{ getUserName(row.submited) }}</router-link></template>
			<template slot-scope="{ row }" slot="registered">{{ row.registered | date }}</template>
			<template slot-scope="{ row }" slot="url"><ModalPlayer :source="row.url" /></template>
			<template slot-scope="{ row }" slot="files">
				<Tooltip content="Tablature" placement="top">
					<a v-if="row.files.sheet.length" class="file-download" :href="row.files.sheet[row.files.sheet.length - 1].file"><Icon size="24" custom="icon-pick" /></a>
					<span v-else class="file-download"><Icon size="24" custom="icon-pick" /></span>
				</Tooltip>
				<Tooltip content="Paroles" placement="top">
					<a v-if="row.files.lyrics.length" class="file-download" :href="row.files.lyrics[row.files.lyrics.length - 1].file"><Icon size="24" type="md-microphone" /></a>
					<span v-else class="file-download"><Icon size="24" type="md-microphone" /></span>
				</Tooltip>
				<Tooltip content="Backtrack" placement="top">
					<a v-if="row.files.backtrack.length" class="file-download" :href="row.files.backtrack[row.files.backtrack.length - 1].file"><Icon size="24" type="md-laptop" /></a>
					<span v-else class="file-download"><Icon size="24" type="md-laptop" /></span>
				</Tooltip>
			</template>
			<template slot-scope="{ row }" slot="action">
				<Button icon="md-eye" type="default" style="margin-right: 5px" @click="$router.push({ name: 'song', params: { slug: row.slug }})" />
				<!-- <Button icon="md-trash" type="error" @click="remove(row._id)" /> -->
			</template>
		</Table>
	</div>
</template>

<script>
import ModalPlayer from '@/components/player/Modal'
import getUserName from '@/plugins/mixins/getUserName'

export default {
	name: 'Songs',
	mixins: [getUserName],

	data () {
		return {
			filters: null,
			columns: [
				// { type: 'selection', width: 60, align: 'center' },
				{ title: 'Artiste', key: 'artist', sortable: true },
				{ title: 'Titre', key: 'title', sortable: true },
				{ title: 'Note', key: 'scores', slot: 'scores', sortable: true },
				{ title: 'Proposé par', key: 'submited', slot: 'submited', sortable: true	},
				{ title: 'Proposé le', key: 'registered', slot: 'registered', sortable: true },
				{ title: 'Audio', slot: 'url', width: 120, align: 'center' },
				{ title: 'Fichiers', slot: 'files', align: 'center', width: 160 },
				{ title: 'Voir', width: 80, align: 'center', slot: 'action' }
			]
		}
	},

	computed: {
		songs () {
			return this.$store.getters['songs/list']
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
			return values.reduce((accumulator, value) => accumulator + value.note, 0) / values.length
		},
	}
}
</script>

<style lang="stylus" scoped>
.file-download
	padding 0 .35em

	span&
		color var(--color-grey)
</style>
