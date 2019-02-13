<template>
	<div class="live-view">
		<h1>{{ live.name }}</h1>
		<h2>{{ live.date | date('full') }}, {{ live.place }}</h2>
		{{ live }}
	</div>
</template>

<script>
export default {
	name: 'Live',

	computed: {
		live () {
			return this.$store.getters['lives/getLive'](this.$route.params.slug)
		}
	},
}
</script>
