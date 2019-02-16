<template>
	<div class="users">
		<Card v-for="user in users" :key="user.slug">
			<p slot="title">{{ user.name }}</p>
			<Avatar slot="extra" icon="ios-person" size="small" />
			<div>
				<span v-for="(instrument, key) in user.instruments" :key="key">{{ instrument }}</span>
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
	},
}
</script>
