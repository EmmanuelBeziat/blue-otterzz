<template>
	<div class="users">
		<template v-if="users">
			<Card class="user-card" v-for="user in users" :key="user.slug">
				<p class="user-card-title" slot="title">
					<router-link :to="{ name: 'user', params: { slug: user.slug }}">{{ user.username }}</router-link>
				</p>
				<Avatar slot="extra" :src="user.picture" size="small" v-if="user.picture" />
				<Avatar slot="extra" icon="ios-person" size="small" v-else />
				<p>{{ user.bio }}</p>
				<footer class="user-card-footer">
					<Tooltip :content="instrument" placement="top" v-for="(instrument, key) in user.instruments" :key="key">
						<Icon v-if="instrument === 'sing'" type="md-microphone" size="22" />
						<Icon v-if="instrument === 'guitar'" custom="icon-pick" size="22" />
						<Icon v-if="instrument === 'bass'" custom="icon-pick" size="22" />
					</Tooltip>
				</footer>
			</Card>
		</template>
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

.user-card-title
	color inherit

.user-card-footer
	margin-top 1rem
</style>
