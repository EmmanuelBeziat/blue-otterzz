<template>
	<div class="login-box">
		<template v-if="isLogged">
			<template v-if="path === '/songs'">
				<button class="login-btn login-item" @click="drawerSong = true"><Icon type="md-add" size="24" /> Ajouter</button>
				<Drawer title="Ajouter une musique" v-model="drawerSong" width="320">
					<AddSong @close="drawerSong = false" />
				</Drawer>
			</template>
			<template v-if="path === '/lives'">
				<button class="login-btn login-item" @click="drawerLive = true"><Icon type="md-add" size="24" /> Ajouter</button>
				<Drawer title="Ajouter un live" v-model="drawerLive" width="320">
					<AddLive @close="drawerLive = false" />
				</Drawer>
			</template>
			<button class="login-btn login-item" @click="$store.dispatch('login/logOut')"><Icon type="md-log-out" size="24" /> Déconnexion</button>
		</template>
		<router-link v-else class="login-item" :to="{ name: 'login' }"><Icon type="md-log-in" size="24" /> Se connecter</router-link>
	</div>
</template>

<script>
import AddSong from '@/components/forms/AddSong'
import AddLive from '@/components/forms/AddLive'
import isLogged from '@/plugins/mixins/isLogged'
import getPath from '@/plugins/mixins/getPath'

export default {
	name: 'LoginBox',
	mixins: [isLogged, getPath],

	data () {
		return {
			drawerSong: false,
			drawerLive: false
		}
	},

	components: {
		AddSong,
		AddLive
	},
}
</script>


<style lang="stylus" scoped>
.login-box
	padding .625rem 1rem
	height 100%
	display flex
	justify-content flex-end
	align-items center

.login-item
	padding 0
	color var(--color-light-grey)
	line-height 60px
	transition .2s ease-in-out
	display flex
	align-items center
	margin-left 1em
	position relative
	outline 0

	i
		margin-right 6px
		font-size 1.25em

	&:hover
		color var(--color-white)
	&::after
		content ""
		position absolute
		left 50%
		bottom 10px
		transform translate(-50%, -50%)
		border-radius 50%
		background var(--color-white)
		width 5px
		height 5px
		opacity 0
		transition .2s ease-in-out

	&.active::after
		opacity 1
		transform translate(-50%, 0)


.login-btn
	background transparent
	border 0
	cursor pointer

	&:hover
		color var(--color-white)
</style>

