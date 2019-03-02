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

				<Divider>Vos instruments</Divider>

				<FormItem prop="instruments">
					<CheckboxGroup v-model="form.instruments">
						<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': form.instruments.includes('sing') }" label="sing">Chant</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': form.instruments.includes('guitar') }" label="guitar">Guitare</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': form.instruments.includes('bass') }" label="bass">Basse</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': form.instruments.includes('drums') }" label="drums">Batterie</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': form.instruments.includes('keyboard') }" label="keyboard">Piano / Claviers</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': form.instruments.includes('dj') }" label="dj">DJ / Platines</Checkbox>
						<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': form.instruments.includes('other') }" label="other">Autre</Checkbox>
					</CheckboxGroup>
				</FormItem>

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
	</div>
</template>

<script>
export default {
	name: 'UserEdit',

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
			rules: {
				username: [
					{ required: true, message: 'Choisir votre nom d’utilisateur', trigger: 'blur' },
				],
				email: [
					{ required: true, message: 'Choisir une adresse e-mail valide', trigger: 'blur' },
					{ type: 'email', message: 'Format d’e-mail incorrect', trigger: 'blur' }
				],
				newPassword: [
					{ required: true, message: 'Entrer un mot de passe', trigger: 'blur' },
				],
				newPassword: [
					{ required: true, message: 'Choisir un mot de passe', trigger: 'blur' },
					{ type: 'string', min: 6, message: 'Le mot de passe doit être composé de six caractères minimum', trigger: 'blur' }
				],
				newPasswordCheck: [
					{ required: true, message: 'Confirmer le mot de passe', triger: 'blur' },
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
		handleSubmit (name) {
		}
	},
}
</script>

<style lang="stylus" scoped>
h2
	margin 1em 0
</style>
