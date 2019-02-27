<template>
	<div class="user-view">
		<template v-if="user">
			<h1>{{ user.username }}</h1>
			<p><Icon type="md-mail" size="22" /> {{ user.email }}</p>

			<div class="icons">
				<Tooltip :content="instrument" placement="top" v-for="(instrument, key) in user.instruments" :key="key">
					<Icon v-if="instrument === 'sing'" type="md-microphone" size="22" />
					<Icon v-if="instrument === 'guitar'" custom="icon-pick" size="22" />
					<Icon v-if="instrument === 'bass'" custom="icon-pick" size="22" />
				</Tooltip>
			</div>

			<h2>Bio</h2>
			<p>{{ user.bio }}</p>
		</template>
	</div>
</template>

<script>
export default {
	name: 'UserView',

	computed: {
		user () {
			return this.$store.getters['users/getUser'](this.$route.params.slug)
		}
	},
}
</script>

<style lang="stylus" scoped>
h2
	margin-top 2em

.icons
	margin 1em 0
</style>
