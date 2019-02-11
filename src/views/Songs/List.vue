<template>
	<div class="content">
		<Sidebar v-model="filters" />

		<main class="main">
			<div class="dashboard">
				<Table class="songs" :loading="loading" :columns="columns" :data="songs">
					<template slot-scope="{ row }" slot="registered">{{ row.registered }}</template>
					<template slot-scope="{ row }" slot="url"><Player :source="row.url" /></template>
					<template slot-scope="{ row }" slot="action">
						<Button icon="md-eye" type="primary" style="margin-right: 5px" @click="$router.push({ name: 'song', params: { slug: row.slug }})" />
						<Button icon="md-trash" type="error" @click="remove(row._id)" />
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
import { format, distanceInWords } from 'date-fns'

export default {
	name: 'Songs',

	data () {
		return {
			filters: null,
			loading: true,
			columns: [
				// { type: 'selection', width: 60, align: 'center' },
				{ title: 'Artists', key: 'artist', sortable: true },
				{ title: 'Titre', key: 'name', sortable: true },
				{ title: 'Proposé par', key: 'submited', sortable: true	},
				{ title: 'Proposé le', slot: 'registered', sortable: true },
				{ title: 'Audio', slot: 'url', width: 350 },
				{ title: 'Action', width: 150, align: 'center', slot: 'action' }
			]
		}
	},

	computed: {
		songs () {
			this.loading = false
			return this.$store.getters['songs/list']
		}
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

			app.getTrack('3Qm86XLflmIXVm1wcwkgDK')
				.then(ret => {
					console.log(ret)
				})
				.catch(err => console.log(err))
		}
	}
}
</script>

<style lang="stylus" scoped>
.dashboard
	padding 1rem
</style>
