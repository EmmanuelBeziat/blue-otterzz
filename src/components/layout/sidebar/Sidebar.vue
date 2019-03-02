<template>
	<div class="sidebar">
		<template v-if="path === '/songs'">
			<Tooltip content="Ajouter une nouvelle musique" placement="right">
				<Button icon="md-add" shape="circle" @click="songDrawer = true" />
			</Tooltip>
			<Drawer v-model="songDrawer" title="Create" width="720"></Drawer>
		</template>
	</div>
</template>

<script>
export default {
	data () {
		return {
			path: '',
			songDrawer: false,
			liveDrawer: false,
		}
	},

	created () {
		this.getPath()
	},

	watch: {
		'$route': 'getPath'
	},

	methods: {
		getPath () {
			this.path = this.$router.currentRoute.path
		}
	}
}
</script>

<style lang="stylus" scoped>
.sidebar
	padding 1rem
	padding-right 0
</style>
