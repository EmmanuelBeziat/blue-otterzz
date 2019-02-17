<template>
	<Card class="login-card">
		<h2 slot="title"><Icon type="md-key" /> S’enregistrer</h2>

		<Form :model="registerForm" ref="registerForm" :rules="ruleRegister">
			<FormItem prop="username">
				<i-input type="text" v-model="registerForm.username" placeholder="Nom d’utilisateur">
					<Icon type="md-person" slot="prepend" />
				</i-input>
			</FormItem>

			<FormItem prop="email">
				<i-input type="email" v-model="registerForm.email" placeholder="E-mail">
					<Icon type="md-mail" slot="prepend" />
				</i-input>
			</FormItem>

			<FormItem prop="password">
				<i-input type="password" v-model="registerForm.password" placeholder="Mot de passe">
					<Icon type="md-lock" slot="prepend" />
				</i-input>
			</FormItem>

			<FormItem prop="passwordCheck">
				<i-input type="password" v-model="registerForm.passwordCheck" placeholder="Confirmer le mot de passe">
					<Icon type="md-lock" slot="prepend" />
				</i-input>
			</FormItem>

			<Divider>Vos instruments</Divider>

			<FormItem prop="instruments">
				<CheckboxGroup v-model="registerForm.instruments">
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': registerForm.instruments.includes('sing') }" label="sing">Chant</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': registerForm.instruments.includes('guitar') }" label="guitar">Guitare</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': registerForm.instruments.includes('bass') }" label="bass">Basse</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': registerForm.instruments.includes('drums') }" label="drums">Batterie</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': registerForm.instruments.includes('keyboard') }" label="keyboard">Piano / Claviers</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': registerForm.instruments.includes('dj') }" label="dj">DJ / Platines</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': registerForm.instruments.includes('other') }" label="other">Autre</Checkbox>
				</CheckboxGroup>
			</FormItem>

			<FormItem>
				<Button type="primary" icon="md-checkmark" long @click="handleSubmit('registerForm')">S’enregistrer</Button>
				<Button type="text" long :to="{ name: 'login' }">Déjà inscrit ?</Button>
			</FormItem>
		</Form>
	</Card>
</template>

<script>
export default {
	name: 'Register',

	data () {
		const validatePassCheck = (rule, value, callback) => {
			if (value !== this.registerForm.password) {
				callback(new Error('Les deux mot de passe ne correspondent pas'))
			}
			else {
				callback()
			}
		}

		return {
			registerForm: {
				username: '',
				email: '',
				password: '',
				passwordCheck: '',
				instruments: [],
			},
			ruleRegister: {
				username: [
					{ required: true, message: 'Choisir votre nom d’utilisateur', trigger: 'blur' },
				],
				email: [
					{ required: true, message: 'Choisir une adresse e-mail valide', trigger: 'blur' },
					{ type: 'email', message: 'Format d’e-mail incorrect', trigger: 'blur' }
				],
				password: [
					{ required: true, message: 'Choisir un mot de passe', trigger: 'blur' },
					{ type: 'string', min: 6, message: 'Le mot de passe doit être composé de six caractères minimum', trigger: 'blur' }
				],
				passwordCheck: [
					{ required: true, message: 'Confirmer le mot de passe', triger: 'blur' },
					{ validator: validatePassCheck, trigger: 'blur' }
				]
			}
		}
	},

	methods: {
		submitForm () {
			this.$emit('on-submit', registerForm)
		},

		handleSubmit (name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					this.$Message.success('Enregistré')
				}
				else {
					this.$Message.error('Le formulaire est incomplet')
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

