<template>
	<div class="password">
		<h2><Icon type="md-lock" /> Mot de passe perdu ?</h2>

		<div class="haha">
			<img src="@/assets/img/laugh.gif" alt="HAHAHA">
		</div>
	</div>
</template>

<script>
export default {
	name: 'Password'
}
</script>

<style lang="stylus" scoped>
@require '~@/assets/styles/login.styl'

h2 .ivu-icon
	vertical-align text-top

.haha
	margin-top 2rem
	text-align center
</style>

