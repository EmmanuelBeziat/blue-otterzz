<template>
	<Form :model="form" ref="addSong" :rules="rules">
		<FormItem prop="title">
			<i-input type="text" v-model="form.infos.title" placeholder="Titre" />
		</FormItem>

		<FormItem prop="artist">
			<AutoComplete v-model="form.infos.artist" placeholder="Artiste" :data="artists" :filter-method="filterMethod" />
		</FormItem>

		<FormItem prop="url">
			<i-input type="text" v-model="form.meta.url" placeholder="URL de la musique (YouTube, Spotify, Vimeo, Deezer…)" />
		</FormItem>
	</Form>
</template>

<script>
export default {
	name: 'AddLive',

	data () {
		return {
			form: {
				infos: {
					title: '',
					artist: '',
				},
				meta: {
					url: '',
					style: '',
					tuning: ''
				},
			},
			rules: {
				title: [
					{ required: true, message: 'Ajouter un titre', trigger: 'blur' },
				],
				artist: [
					{ required: true, message: 'Ajouter un(e) artiste', trigger: 'blur' },
				],
				url: [
					{ required: true, message: 'Ajouter une URL pour écouter la musique', trigger: 'blur' },
				]
			},
			styles: ['Rock', 'Funk', 'Electro', 'Metal', 'Blues', 'Jazz', 'Balade', 'Pop', 'Folk']
		}
	},

	computed: {
		artists () {
			return [...new Set(this.$store.getters['songs/list'].map(song => song.infos.artist))]
		}
	},

	methods: {
		filterMethod (value, option) {
			return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
		}
	}
}
</script>
