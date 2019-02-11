<template>
	<audio controls :src="audioSource" />
</template>

<script>
export default {
	name: "Player",
	props: ['source'],

	computed: {
		audioSource () {
			return ''
		}
	}
}
</script>

<style lang="stylus" scoped>
audio
	height 32px
	display block
</style>

