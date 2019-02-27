<template>
	<div class="live-view">
		<template v-if="live">
			<h1>{{ live.name }}</h1>
			<h2>{{ live.date | date('full') }}, {{ live.place }}</h2>

			<div class="status">
				<Badge status="success" text="Terminé" v-if="live.status === 'done'" />
				<Badge status="processing" text="À venir" v-if="live.status === 'upcoming'" />
				<Badge status="error" text="Annulé" v-if="live.status === 'canceled'" />
			</div>

			<Divider>Set list</Divider>
			<ol class="songs">
				<li class="song" v-for="song in live.songs" :key="song.slug">
					<router-link :to="{ name: 'song', params: { slug: song }}">{{ getSongName(song) }}</router-link>
				</li>
			</ol>

			<Divider>Liens</Divider>
			<p>Ajouter ici les liens de l’événement, le cas échéant (Event Facebook, etc.)</p>
			<ul v-if="live.links.length">
				<li v-for="link in live.links" :key="link">{{ link }}</li>
			</ul>
			<p v-else>Aucun lien pour l’instant</p>

			<Divider>Commentaires</Divider>
			{{ live.comments }}
		</template>
	</div>
</template>

<script>
export default {
	name: 'Live',

	computed: {
		live () {
			return this.$store.getters['lives/getLive'](this.$route.params.slug)
		}
	},

	methods: {
		getSongName (slug) {
			const song = this.$store.getters['songs/getSong'](slug)
			return `${song.infos.artist} — ${song.infos.title}`
		}
	}
}
</script>

<style lang="stylus" scoped>
ul
ol
	padding-left 1rem
	margin 1rem 0

.status
	margin 1em 0
</style>
