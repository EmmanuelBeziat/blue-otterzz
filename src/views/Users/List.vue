<template>
	<div class="dashboard">
		<Table class="songs" :columns="columns" :data="songs">
			<template slot-scope="{ row }" slot="artist"><strong>{{ row.artist }}</strong></template>
			<template slot-scope="{ row }" slot="rates"><Rate allow-half :value="getSongRate(row.rates)" custom-icon="icon-pick" disabled /></template>
			<template slot-scope="{ row }" slot="submited">{{ getUserName(row.submited) }}</template>
			<template slot-scope="{ row }" slot="registered">{{ row.registered | date }}</template>
			<template slot-scope="{ row }" slot="url"><Player :source="row.url" /></template>
			<template slot-scope="{ row }" slot="files">
				<Tooltip content="Tablature" placement="top">
					<a v-if="row.files.sheet" class="file-download" :href="row.files.sheet"><Icon size="24" custom="icon-pick" /></a>
					<span v-else class="file-download"><Icon size="24" custom="icon-pick" /></span>
				</Tooltip>
				<Tooltip content="Paroles" placement="top">
					<a v-if="row.files.lyrics" class="file-download" :href="row.files.lyrics"><Icon size="24" type="md-microphone" /></a>
					<span v-else class="file-download"><Icon size="24" type="md-microphone" /></span>
				</Tooltip>
				<Tooltip content="Backtrack" placement="top">
					<a v-if="row.files.backtrack" class="file-download" :href="row.files.backtrack"><Icon size="24" type="md-laptop" /></a>
					<span v-else class="file-download"><Icon size="24" type="md-laptop" /></span>
				</Tooltip>
			</template>
			<template slot-scope="{ row }" slot="action">
				<Button icon="md-eye" type="primary" style="margin-right: 5px" @click="$router.push({ name: 'song', params: { slug: row.slug }})" />
				<!-- <Button icon="md-trash" type="error" @click="remove(row._id)" /> -->
			</template>
		</Table>
	</div>
</template>

<script>
import { spotify } from '@/config'
import Player from '@/components/player/Player'

import Spotify from 'spotify-web-api-node'

export default {
	name: 'Users',

	data () {
		return {
			filters: null,
			columns: [
				// { type: 'selection', width: 60, align: 'center' },
				{ title: 'Artiste', slot: 'artist', sortable: true },
				{ title: 'Titre', key: 'title', sortable: true },
				{ title: 'Note', slot: 'rates', sortable: true },
				{ title: 'Proposé par', slot: 'submited', sortable: true	},
				{ title: 'Proposé le', slot: 'registered', sortable: true },
				{ title: 'Audio', slot: 'url', width: 320 },
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

	mounted () {
		this.connectSpotify()
	},

	components: {
		Player
	},

	methods: {
		getSongRate (values) {
			return values.reduce((accumulator, value) => accumulator + value.note, 0) / values.length
		},

		getUserName (slug) {
			const user = this.$store.getters['users/getUser'](slug)
			return user.name
		},

		connectSpotify () {
			const app = new Spotify({
				clientId: spotify.clientID,
				clientSecret: spotify.clientSecret,
				redirectUri:'http://localhost:3040/'
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.file-download
	padding 0 .35em

	span&
		color var(--color-grey)
</style>

<style lang="stylus">
.ivu-rate-star-chart.ivu-rate-star-full .ivu-rate-star-first
.ivu-rate-star-chart.ivu-rate-star-full .ivu-rate-star-second
.ivu-rate-star-chart.ivu-rate-star-half .ivu-rate-star-first
	color #2d8cf0 !important

.ivu-rate-star-first
	z-index 1

.ivu-rate-star-chart.ivu-rate-star-zero .ivu-rate-star-second
.ivu-rate-star-chart.ivu-rate-star-half .ivu-rate-star-second
	color var(--color-grey) !important
</style>

