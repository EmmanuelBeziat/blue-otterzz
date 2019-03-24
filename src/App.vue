<template>
	<div id="app" class="site">
		<Header />

		<div class="content">
			<main class="main">
				<router-view />
			</main>
		</div>

		<BackTop />
	</div>
</template>

<script>
import Header from '@/components/layout/header/Header'

export default {
	components: {
		Header
	}
}
</script>


<style lang="stylus">
@require '~@/assets/fonts/music/music.styl'
@require '~@/assets/styles/vendors/normalize.styl'

:root
	--color-white #fff
	--color-light-grey rgba(255, 255, 255, .7)
	--color-grey rgba(0, 0, 0, .15)
	--color-nav #515a6e

.site
	min-height 100vh
	display grid
	grid-template-rows auto 1fr

.content
	display flex

.main
	padding 1rem
	max-width 100vw
	flex 1

@require '~@/assets/styles/helpers.styl'
@require '~@/assets/styles/iview-override.styl'
</style>
