<template>
	<Card class="login-card">
		<h2 slot="title"><Icon type="md-log-in" /> Se connecter</h2>
		<Form :model="loginForm" ref="loginForm" :rules="ruleLogin">
			<FormItem prop="username">
				<i-input type="text" v-model="loginForm.username" placeholder="Nom d’utilisateur">
					<Icon type="md-person" slot="prepend" />
				</i-input>
			</FormItem>

			<FormItem prop="password">
				<i-input type="text" v-model="loginForm.password" placeholder="Mot de passe">
					<Icon type="md-lock" slot="prepend" />
				</i-input>
			</FormItem>

			<FormItem class="flex" prop="remember">
				<Checkbox v-model="loginForm.remember">Se souvenir de moi</Checkbox>
				<router-link :to="{ name: 'password' }">Mot de passe oublié ?</router-link>
			</FormItem>

			<FormItem>
				<Button type="primary" icon="md-checkmark" long @click="handleSubmit('loginForm')">Se connecter</Button>
				<Button type="text" long :to="{ name: 'register' }">Pas encore inscrit ?</Button>
			</FormItem>
		</Form>
	</Card>
</template>

<script>
export default {
	name: 'Login',

	data () {
		return {
			loginForm: {
				username: '',
				password: '',
				remember: false
			},
			ruleLogin: {
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
		handleSubmit (name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					this.$Message.success('Connexion réussie')
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

