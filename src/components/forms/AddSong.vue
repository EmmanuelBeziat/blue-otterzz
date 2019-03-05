<template>
	<Form :model="form" ref="addSong" :rules="rules" class="no-label">
		<FormItem prop="title" label="Titre">
			<i-input type="text" v-model="form.infos.title" placeholder="Titre" />
		</FormItem>

		<FormItem prop="artist" label="Artiste">
			<AutoComplete v-model="form.infos.artist" placeholder="Artiste" :data="artists" :filter-method="filterMethod" />
		</FormItem>

		<FormItem prop="url" label="Url de la musique">
			<i-input type="text" v-model="form.meta.url" placeholder="URL de la musique (YouTube, Spotify, Vimeo, Deezer…)" />
		</FormItem>

		<FormItem>
			<Row :gutter="12">
				<i-col span="12">
					<Button @click="handleReset('addSong')" icon="md-close" long>Annuler</Button>
				</i-col>
				<i-col span="12">
					<Button type="primary" @click="handleSubmit('addSong')" icon="md-checkmark" long>Confirmer</Button>
				</i-col>
			</Row>
		</FormItem>
	</Form>
</template>

<script>
export default {
	name: 'AddSong',

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
		},

		submitForm (name) {
			this.form.submited.user = this.$store.getters['login/currentUser']
			this.form.token = this.$store.getters['login/getToken']
			this.axios.post(api.routes.users, this.form)
				.then(response => {
					this.$store.dispatch('songs/add', response.data)
					this.$Message.success('Enregistrement terminé')
					this.handleReset(name)
				})
				.catch(error => this.$Message.error('Erreur : ' + error.message))
				.then(() => this.loading = false)
		},

		handleSubmit (name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					this.loading = true
					this.submitForm(name)
				}
				else {
					this.$Message.error('Le formulaire est incomplet')
				}
			})
		},

		handleReset (name) {
			this.$refs[name].resetFields()
			this.$emit('close')
		}
	}
}
</script>
