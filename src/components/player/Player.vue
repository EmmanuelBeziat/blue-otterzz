<template>
	<audio controls :src="audioSource" preload="metadata" />
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
	height 28px
	display block
</style>

