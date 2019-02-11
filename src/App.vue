<template>
	<div id="app" class="site">
		<Header />
		<router-view />
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


<style lang="stylus" scoped>
</style>
