<template>
	<div class="user-edit">
		<template v-if="user">
			<h2>Modifier les informations de {{ user.username }}</h2>

			<Form :model="form" ref="userEdit" :rules="rules">
				<FormItem prop="username">
					<i-input type="text" v-model="form.username" placeholder="Nom d’utilisateur">
						<Icon type="md-person" slot="prepend" />
					</i-input>
				</FormItem>

				<FormItem prop="email">
					<i-input type="email" v-model="form.email" placeholder="E-mail">
						<Icon type="md-mail" slot="prepend" />
					</i-input>
				</FormItem>

				<FormItem prop="bio">
					<i-input type="textarea" v-model="form.bio" placeholder="Bio" />
				</FormItem>

				<Divider>Préférences</Divider>

				<FormItem prop="notifications" label="Notifications">
					<i-switch v-model="form.notifications">
						<Icon type="md-checkmark" slot="open"></Icon>
						<Icon type="md-close" slot="close"></Icon>
					</i-switch>
				</FormItem>

				<!-- <Divider>Vos instruments</Divider>

				<FormItem prop="instruments">
					<CheckboxGroup v-model="form.instruments">
						<Checkbox class="ivu-btn ivu-btn-default no-checkbox" :value="form.instruments['sing']" :class="{ 'ivu-btn-primary': form.instruments.includes('sing') }" label="sing">
							<Icon type="md-microphone" size="24" />
							<span class="sr-only">Chant</span>
						</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default no-checkbox" :value="form.instruments['guitar']" :class="{ 'ivu-btn-primary': form.instruments.includes('guitar') }" label="guitar">
							<Icon custom="icon-guitar-jackson" size="24" />
							<span class="sr-only">Guitare</span>
						</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default no-checkbox" :value="form.instruments['bass']" :class="{ 'ivu-btn-primary': form.instruments.includes('bass') }" label="bass">
							<Icon custom="icon-bass" size="24" />
							<span class="sr-only">Basse</span>
						</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default no-checkbox" :value="form.instruments['drums']" :class="{ 'ivu-btn-primary': form.instruments.includes('drums') }" label="drums">
							<Icon custom="icon-drums" size="24" />
							<span class="sr-only">Batterie</span>
						</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default no-checkbox" :value="form.instruments['keyboard']" :class="{ 'ivu-btn-primary': form.instruments.includes('keyboard') }" label="keyboard">
							<Icon custom="icon-piano" size="24" />
							<span class="sr-only">Piano / Claviers</span>
						</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default no-checkbox" :value="form.instruments['dj']" :class="{ 'ivu-btn-primary': form.instruments.includes('dj') }" label="dj">
							<Icon custom="icon-dj" size="24" />
							<span class="sr-only">DJ / Machines</span>
						</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default no-checkbox" :value="form.instruments['other']" :class="{ 'ivu-btn-primary': form.instruments.includes('other') }" label="other">
							<Icon type="ios-more" size="24" />
							<span class="sr-only">Autres</span>
						</Checkbox>
					</CheckboxGroup>
				</FormItem> -->

				<Divider>Changer de mot de passe</Divider>

				<FormItem prop="password">
					<i-input type="password" v-model="form.password" placeholder="Mot de passe actuel">
						<Icon type="md-lock" slot="prepend" />
					</i-input>
				</FormItem>

				<FormItem prop="newPassword">
					<i-input type="password" v-model="form.newPassword" placeholder="Nouveau mot de passe">
						<Icon type="md-lock" slot="prepend" />
					</i-input>
				</FormItem>

				<FormItem prop="newPasswordCheck">
					<i-input type="password" v-model="form.newPasswordCheck" placeholder="Confirmer le mot de passe">
						<Icon type="md-lock" slot="prepend" />
					</i-input>
				</FormItem>

				<FormItem>
					<Button type="primary" icon="md-checkmark" long @click="handleSubmit('userEdit')">Enregistrer les modifications</Button>
				</FormItem>
			</Form>
		</template>

		<Spin size="large" fix v-if="loading" />
	</div>
</template>

<script>
// import compare from '@/plugins/mixins/compare.js'

export default {
	name: 'UserEdit',
	// mixins: [compare],

	data () {
		const validatePassCheck = (rule, value, callback) => {
			if (value !== this.form.newPassword) {
				callback(new Error('Les deux mot de passe ne correspondent pas'))
			}
			else {
				callback()
			}
		}

		return {
			loading: false,
			rules: {
				username: [
					{ required: true, message: 'Choisir votre nom d’utilisateur', trigger: 'blur' },
				],
				email: [
					{ required: true, message: 'Choisir une adresse e-mail valide', trigger: 'blur' },
					{ type: 'email', message: 'Format d’e-mail incorrect', trigger: 'blur' }
				],
				password: [
					// { required: true, message: 'Entrer un mot de passe', trigger: 'blur' },
				],
				newPassword: [
					// { required: true, message: 'Choisir un mot de passe', trigger: 'blur' },
					{ type: 'string', min: 6, message: 'Le mot de passe doit être composé de six caractères minimum', trigger: 'blur' }
				],
				newPasswordCheck: [
					// { required: true, message: 'Confirmer le mot de passe', triger: 'blur' },
					{ validator: validatePassCheck, trigger: 'blur' }
				]
			}
		}
	},

	computed: {
		user () {
			return this.$store.getters['users/getUser'](this.$route.params.slug)
		},

		form () {
			return {
				username: this.user.username,
				email: this.user.email,
				bio: this.user.bio,
				password: '',
				newPassword: '',
				newPasswordCheck: '',
				instruments: this.user.instruments,
				notifications: this.user.preferences.notifications
			}
		}
	},

	methods: {
		toggleInstruments (value) {
			const index = this.form.instruments.indexOf(value)
			if (index === -1) {
				this.form.instruments.push(value)
			}
			else {
				this.form.instruments.splice(index, 1)
			}
		},

		compare (oldUser, newUser) {
			let newValues = {}
			if (this.user.username !== this.form.username) newValues.username = this.form.username
			if (this.user.email !== this.form.email) newValues.email = this.form.email
			if (this.user.bio !== this.form.bio) newValues.bio = this.form.bio
			if (JSON.stringify(this.user.instruments) !== JSON.stringify(this.form.instruments)) newValues.instruments = this.form.instruments
			return newValues
		},

		submitForm () {
			const user = this.compare(this.referenceUser, this.form)

			this.axios.put(api.routes.users, user)
				.then(response => {
					this.$store.dispatch('users/add', response.data)
					this.$Message.success('Enregistrement terminé')
					setTimeout(() => {
						this.$router.push('/login')
					}, 1000)
				})
				.catch(error => this.$Message.error('Erreur : ' + error.message))
				.then(() => this.loading = false)
		},

		handleSubmit (name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					this.loading = true
					this.submitForm()
				}
				else {
					this.$Message.error('Le formulaire est incomplet')
				}
			})
		}
	},
}
</script>

<style lang="stylus" scoped>
h2
	margin 1em 0
</style>
