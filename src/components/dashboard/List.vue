<template>
	<div class="dashboard">
		<table class="projects">
			<tbody>
				<tr class="project-item" v-for="(project, index) in projects" :key="index">
					<td>{{ index }}</td>
					<td>{{ project.artist }}</td>
					<td>{{ project.name }}</td>
					<td>{{ submitedBy(project.submited) }}</td>
					<td>{{ project.registered }}</td>
					<td>{{ project.url }}</td>
					<td><span v-for="(file, key) in project.files" :key="key">{{ file }}</span></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'Dashboard',

	computed: {
		projects () {
			return this.$store.getters['projects/list']
		},
	},

	methods: {
		submitedBy (user) {
			return this.$store.getters['users/getUser'](user)
		}
	}
}
</script>
