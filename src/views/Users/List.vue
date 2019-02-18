<template>
	<div class="users">
		<Card v-for="user in users" :key="user.slug">
			<p slot="title">{{ user.name }}</p>
			<Avatar slot="extra" icon="ios-person" size="small" />
			<div>
				<Tooltip :content="instrument" placement="top" v-for="(instrument, key) in user.instruments" :key="key">
					<Icon v-if="instrument === 'sing'" type="md-microphone" size="22" />
					<Icon v-if="instrument === 'guitar'" custom="icon-pick" size="22" />
					<Icon v-if="instrument === 'bass'" custom="icon-pick" size="22" />
				</Tooltip>
			</div>
		</Card>
	</div>
</template>

<script>
export default {
	name: 'Users',

	computed: {
		users () {
			return this.$store.getters['users/list']
		},
	}
}
</script>

<style lang="stylus" scoped>
.users
	display grid
	grid-template-columns repeat(auto-fit, minmax(240px, 1fr))
	grid-gap 1rem
</style>
