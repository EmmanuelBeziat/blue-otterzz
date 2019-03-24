<template>
	<div class="user-view">
		<template v-if="user">
			<h1>{{ user.username }}</h1>
			<p><Icon type="md-mail" size="22" /> {{ user.email }}</p>

			<div class="icons">
				<Tooltip :content="instrument" placement="top" v-for="(instrument, key) in user.instruments" :key="key">
					<Icon v-if="instrument === 'sing'" type="md-microphone" size="24" />
					<Icon v-if="instrument === 'guitar'" custom="icon-guitar-jackson" size="24" />
					<Icon v-if="instrument === 'bass'" custom="icon-bass" size="24" />
					<Icon v-if="instrument === 'drums'" custom="icon-drums" size="24" />
					<Icon v-if="instrument === 'piano'" custom="icon-piano" size="24" />
					<Icon v-if="instrument === 'dj'" custom="icon-dj" size="24" />
					<Icon v-if="instrument === 'other'" type="ios-more" size="24" />
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
