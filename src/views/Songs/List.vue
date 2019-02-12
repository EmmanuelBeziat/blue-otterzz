<template>
	<div class="content">
		<Sidebar v-model="filters" />

		<main class="main">
			<div class="dashboard">
				<Table class="songs" :loading="loading" :columns="columns" :data="songs">
					<template slot-scope="{ row }" slot="artist"><strong>{{ row.artist }}</strong></template>
					<template slot-scope="{ row }" slot="rates"><Rate :value="rate(row.rates)" custom-icon="icon-pick" disabled /></template>
					<template slot-scope="{ row }" slot="registered">{{ row.registered | date }}</template>
					<template slot-scope="{ row }" slot="url"><Player :source="row.url" /></template>
					<template slot-scope="{ row }" slot="files">
						<Tooltip v-if="row.files.sheet" content="Tablature" placement="top">
							<a class="file-download" :href="row.files.sheet"><Icon size="24" custom="icon-pick" /></a>
						</Tooltip>
						<Tooltip v-if="row.files.lyrics" content="Paroles" placement="top">
							<a class="file-download" :href="row.files.lyrics"><Icon size="24" type="md-microphone" /></a>
						</Tooltip>
						<Tooltip v-if="row.files.backtrack" content="Backtrack" placement="top">
							<a class="file-download" :href="row.files.backtrack"><Icon size="24" type="md-laptop" /></a>
						</Tooltip>
					</template>
					<template slot-scope="{ row }" slot="action">
						<Button icon="md-eye" type="primary" style="margin-right: 5px" @click="$router.push({ name: 'song', params: { slug: row.slug }})" />
						<!-- <Button icon="md-trash" type="error" @click="remove(row._id)" /> -->
					</template>
				</Table>
			</div>
		</main>
	</div>
</template>

<script>
import { spotify } from '@/config'
import Sidebar from '@/components/ui/Sidebar'
import Player from '@/components/player/Player'

import Spotify from 'spotify-web-api-node'

export default {
	name: 'Songs',

	data () {
		return {
			filters: null,
			loading: true,
			columns: [
				// { type: 'selection', width: 60, align: 'center' },
				{ title: 'Artiste', slot: 'artist', sortable: true },
				{ title: 'Titre', key: 'name', sortable: true },
				{ title: 'Note', slot: 'rates', sortable: true },
				{ title: 'Proposé par', key: 'submited', sortable: true	},
				{ title: 'Proposé le', slot: 'registered', sortable: true },
				{ title: 'Audio', slot: 'url', width: 320 },
				{ title: 'Fichiers', slot: 'files', align: 'center', width: 160 },
				{ title: 'Voir', width: 80, align: 'center', slot: 'action' }
			]
		}
	},

	computed: {
		songs () {
			this.loading = false
			return this.$store.getters['songs/list']
		},
	},

	mounted () {
		this.connectSpotify()
	},

	components: {
		Sidebar,
		Player
	},

	methods: {
		submitedBy (user) {
			return this.$store.getters['users/getUser'](user)
		},

		rate (values) {
			return Math.round(values.reduce((accumulator, value) => accumulator + value, 0) / values.length)
		},

		view (slug) {
			console.log('view: ' + slug)
		},

		remove (id) {
			console.log('remove: ' + id)
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
.dashboard
	padding 1rem

.file-download
	padding 0 .35em
</style>

<style lang="stylus">
.ivu-rate-star-chart.ivu-rate-star-full .ivu-rate-star-first
.ivu-rate-star-chart.ivu-rate-star-full .ivu-rate-star-second
	color #2d8cf0 !important
</style>

