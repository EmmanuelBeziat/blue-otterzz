<template>
	<Card class="login-card">
		<h2 slot="title"><Icon type="md-log-in" /> Se connecter</h2>

		<Form :model="form" ref="userLogin" :rules="rules">
			<FormItem prop="username">
				<i-input type="text" v-model="form.username" placeholder="Nom d’utilisateur">
					<Icon type="md-person" slot="prepend" />
				</i-input>
			</FormItem>

			<FormItem prop="password">
				<i-input type="text" v-model="form.password" placeholder="Mot de passe">
					<Icon type="md-lock" slot="prepend" />
				</i-input>
			</FormItem>

			<FormItem class="flex" prop="remember">
				<Checkbox v-model="form.remember">Se souvenir de moi</Checkbox>
				<router-link :to="{ name: 'password' }">Mot de passe oublié ?</router-link>
			</FormItem>

			<FormItem>
				<Button type="primary" icon="md-checkmark" long @click="handleSubmit('userLogin')">Se connecter</Button>
				<Button type="text" long :to="{ name: 'register' }">Pas encore inscrit ?</Button>
			</FormItem>
		</Form>

		<Spin size="large" fix v-if="loading" />
	</Card>
</template>

<script>
import { api } from '@/config'

export default {
	name: 'Login',

	data () {
		return {
			loading: false,
			form: {
				username: '',
				password: '',
				remember: true
			},
			rules: {
				username: [
					{ required: true, message: 'Remplir votre nom d’utilisateur', trigger: 'blur' }
				],
				password: [
					{ required: true, message: 'Remplir votre mot de passe', trigger: 'blur' },
				]
			}
		}
	},

	methods: {
		login () {
			const credentials = {
				username: this.form.username,
				password: this.form.password
			}
			this.axios.post(api.routes.login, credentials)
				.then(response => {
					this.$Message.success('Connexion réussie')
				})
				.catch(error => this.$Message.error(`Connexion échouée : ${error.message}`))
				.then(() => this.loading = false)
		},

		handleSubmit (name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					this.loading = true
					this.login()
				}
				else {
					this.$Message.error('Connexion échouée')
				}
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/login.styl'

h2 .ivu-icon
	vertical-align text-top
</style>

