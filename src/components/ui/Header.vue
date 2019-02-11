<template>
	<header class="header ivu-menu ivu-menu-dark">
		<router-link class="header-logo" to="/">Blue OtterZZ</router-link>

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
	</header>
</template>

<script>
export default {
	name: 'Header'
}
</script>

<style lang="stylus" scoped>
.header
	display grid
	grid-template-columns 10rem 1fr

.header-logo
	padding 0 1rem
	color var(--color-white)
	line-height 60px

.menu
	display flex
	justify-content flex-end
	padding 0 1rem

.menu-item
	padding 0 1em
	color var(--color-light-grey)
	line-height 60px
	transition .2s ease-in-out
	display flex
	align-items center
	margin-left 1em
	position relative

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
</style>
