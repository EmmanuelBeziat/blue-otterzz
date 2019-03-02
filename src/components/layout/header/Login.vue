<template>
	<div class="login-box">
		<router-link class="login-item" :to="{ name: 'login' }"><Icon type="md-log-in" size="24" /> Se connecter</router-link>
	</div>
</template>

<style lang="stylus" scoped>
.login-box
	padding .625rem 1rem
	height 100%
	display flex
	justify-content flex-end
	align-items center

.login-item
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

