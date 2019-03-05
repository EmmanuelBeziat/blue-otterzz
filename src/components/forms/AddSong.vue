<template>
	<Form :model="form" ref="addSong" :rules="rules" class="no-label">
		<FormItem prop="title" label="Titre">
			<i-input type="text" v-model="form.title" placeholder="Titre" />
		</FormItem>

		<FormItem prop="artist" label="Artiste">
			<AutoComplete v-model="form.artist" placeholder="Artiste" :data="artists" :filter-method="filterMethod" />
		</FormItem>

		<FormItem prop="url" label="Url de la musique">
			<i-input type="text" v-model="form.url" placeholder="URL de la musique (YouTube, Spotify, Vimeo, Deezer…)" />
		</FormItem>

		<FormItem prop="style" label="Style musical">
			<Select v-model="form.style">
				<Option v-for="(style, key) in styles" :value="style" :key="key">{{ style }}</Option>
			</Select>
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

		<Spin size="large" fix v-if="loading" />
	</Form>
</template>

<script>
import { api } from '@/config'

export default {
	name: 'AddSong',

	data () {
		return {
			loading: false,
			form: {
				title: '',
				artist: '',
				url: '',
				style: ''
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
			const song = {
				infos: {
					title: this.form.title,
					artist: this.form.artist
				},
				meta: {
					url: this.form.url,
					style: this.form.style
				},
				submited: {
					user: this.$store.getters['login/currentUser']
				}
			}

			const headers = {
				Authorization: `Bearer ${this.$store.getters['login/getToken']}`
			}

			this.axios.post(api.routes.songs, song, headers)
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
