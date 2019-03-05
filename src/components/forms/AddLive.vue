<template>
	<Form :model="form" ref="addLive" :rules="rules" class="no-label">
		<FormItem prop="name" label="Nom">
			<i-input type="text" v-model="form.name" placeholder="Nom" />
		</FormItem>

		<FormItem prop="date" label="Date du concert">
			<DatePicker type="datetime" v-model="form.date" placeholder="Date et heure du concert" />
		</FormItem>

		<FormItem prop="place" label="Lieu du concert">
			<i-input type="text" v-model="form.place" placeholder="Lieu du concert" />
		</FormItem>

		<FormItem prop="songs" label="Liste de musiques">
			<Select multiple filterable v-model="form.songs" placeholder="Liste de musiques">
				<Option v-for="song in songs" :value="song.slug" :key="song.slug">{{ song.infos.artist }} — {{ song.infos.title }}</Option>
			</Select>
		</FormItem>

		<FormItem>
			<Row :gutter="12">
				<i-col span="12">
					<Button @click="handleReset('addLive')" icon="md-close" long>Annuler</Button>
				</i-col>
				<i-col span="12">
					<Button type="primary" @click="handleSubmit('addLive')" icon="md-checkmark" long>Confirmer</Button>
				</i-col>
			</Row>
		</FormItem>

		<Spin size="large" fix v-if="loading" />
	</Form>
</template>

<script>
import { api } from '@/config'

export default {
	name: 'AddLive',

	data () {
		return {
			loading: false,
			form: {
				name: '',
				date: '',
				place: '',
				songs: []
			},
			rules: {
				name: [
					{ required: true, message: 'Ajouter un nom', trigger: 'blur' },
				],
				date: [
					{ required: true, type: 'datetime', message: 'Choisir une date et une heure', trigger: 'change' },
				],
				place: [
					{ required: true, message: 'Préciser un lieu', trigger: 'blur' },
				],
			},
		}
	},

	computed: {
		songs () {
			return this.$store.getters['songs/list']
		}
	},

	methods: {
		submitForm (name) {
			const live = {
				registered: {
					user: this.$store.getters['login/currentUser']
				}
			}

			const headers = {
				Authorization: `Bearer ${this.$store.getters['login/getToken']}`
			}

			this.axios.post(api.routes.lives, live, headers)
				.then(response => {
					this.$store.dispatch('lives/add', response.data)
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

<style lang="stylus" scoped>
.ivu-date-picker
	width 100%
</style>
