<template>
	<div class="user-edit">
		<h2>Modifier les informations de {{ user.name }}</h2>

		<Form :model="editForm" ref="editForm" :rules="ruleEdit">
			<FormItem prop="username">
				<i-input type="text" v-model="editForm.username" placeholder="Nom d’utilisateur">
					<Icon type="md-person" slot="prepend" />
				</i-input>
			</FormItem>

			<FormItem prop="email">
				<i-input type="email" v-model="editForm.email" placeholder="E-mail">
					<Icon type="md-mail" slot="prepend" />
				</i-input>
			</FormItem>

			<Divider>Vos instruments</Divider>

			<FormItem prop="instruments">
				<CheckboxGroup v-model="editForm.instruments">
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': editForm.instruments.includes('sing') }" label="sing">Chant</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': editForm.instruments.includes('guitar') }" label="guitar">Guitare</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': editForm.instruments.includes('bass') }" label="bass">Basse</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': editForm.instruments.includes('drums') }" label="drums">Batterie</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': editForm.instruments.includes('keyboard') }" label="keyboard">Piano / Claviers</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': editForm.instruments.includes('dj') }" label="dj">DJ / Platines</Checkbox>
					<Checkbox class="ivu-btn ivu-btn-default" :class="{ 'ivu-btn-primary': editForm.instruments.includes('other') }" label="other">Autre</Checkbox>
				</CheckboxGroup>
			</FormItem>

			<Divider>Changer de mot de passe</Divider>

			<FormItem prop="password">
				<i-input type="password" v-model="editForm.password" placeholder="Mot de passe actuel">
					<Icon type="md-lock" slot="prepend" />
				</i-input>
			</FormItem>

			<FormItem prop="newPassword">
				<i-input type="password" v-model="editForm.newPassword" placeholder="Nouveau mot de passe">
					<Icon type="md-lock" slot="prepend" />
				</i-input>
			</FormItem>

			<FormItem prop="newPasswordCheck">
				<i-input type="password" v-model="editForm.newPasswordCheck" placeholder="Confirmer le mot de passe">
					<Icon type="md-lock" slot="prepend" />
				</i-input>
			</FormItem>

			<FormItem>
				<Button type="primary" icon="md-checkmark" long @click="handleSubmit('editForm')">Enregistrer les modifications</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
export default {
	name: 'UserEdit',

	data () {
		const validatePassCheck = (rule, value, callback) => {
			if (value !== this.editForm.newPassword) {
				callback(new Error('Les deux mot de passe ne correspondent pas'))
			}
			else {
				callback()
			}
		}

		return {
			ruleEdit: {
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

		editForm () {
			return {
				username: this.user.name,
				email: this.user.email,
				password: '',
				newPassword: '',
				newPasswordCheck: '',
				instruments: this.user.instruments
			}
		}
	},

	methods: {
		handleSubmit (name) {
		}
	},
}
</script>
