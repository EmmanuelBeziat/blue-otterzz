<template>
	<header class="header ivu-menu ivu-menu-dark">
		<router-link class="header-logo" to="/">
			<img src="@/assets/img/blue-otterzz-logo.svg" alt="Blue OtterZZ">
		</router-link>

		<nav class="menu">
			<router-link class="menu-item" :to="{ name: 'songs' }">
				<Icon type="md-musical-notes" /> Musiques
			</router-link>
			<router-link class="menu-item" to="/lives">
				<Icon type="md-microphone" /> Concerts
			</router-link>
			<router-link class="menu-item" to="/users">
				<Icon type="md-people" /> Groupe
			</router-link>
		</nav>

		<nav class="menu-right">
			<LoginMenu />
		</nav>
	</header>
</template>

<script>
import LoginMenu from '@/components/layout/header/Login'

export default {
	name: 'Header',

	components: {
		LoginMenu
	}
}
</script>

<style lang="stylus" scoped>
.header
	display grid
	grid-template-columns auto 1fr auto

.header-logo
	color var(--color-white)
	line-height 60px
	padding .625rem 1rem
	@media (max-width 767px)
		line-height 40px

	img
		vertical-align middle
		height 56px
		@media (max-width 767px)
			height 48px

.menu
	display flex
	justify-content center
	padding 0 1rem

	@media (max-width 767px)
		background var(--color-nav)
		position fixed
		bottom 0
		left 0
		right 0
		z-index 50

.menu-item
	padding 0 1em
	color var(--color-light-grey)
	line-height 60px
	transition .2s ease-in-out
	display flex
	align-items center
	margin-left 1em
	position relative

	@media (max-width 767px)
		margin 0 1rem
		font-size 0

	i
		margin-right 6px
		font-size 1.25em

		@media (max-width 767px)
			font-size 2rem
			margin-right 0
			margin-bottom 15px

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
</style>
