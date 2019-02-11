<template>
	<div id="app" class="site">
		<Header />

		<router-view />

		<BackTop />
	</div>
</template>

<script>
import Header from '@/components/ui/Header'

export default {
	components: {
		Header
	}
}
</script>


<style lang="stylus">
:root
	--color-white #fff
	--color-light-grey rgba(255, 255, 255, .7)

.site
	min-height 100vh
	display grid
	grid-template-rows auto 1fr

.content
	display grid
	grid-template-columns 16rem auto
</style>
