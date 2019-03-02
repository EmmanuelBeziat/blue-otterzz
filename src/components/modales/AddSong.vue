<template>
	<Modal @on-ok="$emit('add-song')" :value="modal">
		<h2 slot="header"><Icon type="md-musical-notes" /> Ajouter une musique</h2>

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
	</Modal>
</template>

<script>
export default {
	name: 'AddSong',
	props: ['modal'],

	data () {
		return {
			loading: false,
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
