<template>
	<div class="dashboard">
		<template v-if="lives">
			<Table class="lives" :columns="columns" :data="lives">
				<template slot-scope="{ row }" slot="date">{{ row.date | date('full') }} — {{ row.date | date }}</template>
				<template slot-scope="{ row }" slot="status">
					<Badge status="success" text="Terminé" v-if="row.status === 'done'" />
					<Badge status="processing" text="À venir" v-if="row.status === 'upcoming'" />
					<Badge status="error" text="Annulé" v-if="row.status === 'canceled'" />
				</template>
				<template slot-scope="{ row }" slot="action">
					<Button icon="md-eye" type="default" style="margin-right: 5px" @click="$router.push({ name: 'live', params: { slug: row.slug }})" />
					<!-- <Button icon="md-trash" type="error" @click="remove(row._id)" /> -->
				</template>
			</Table>
		</template>
	</div>
</template>

<script>
import { isAfter, isBefore } from 'date-fns'

export default {
	name: 'Lives',

	data () {
		return {
			filters: null,
			columns: [
				// { type: 'selection', width: 60, align: 'center' },
				{ title: 'Date', key: 'date', slot: 'date', sortable: true,
					filters: [
						{ label: 'Passés', value: 'past' },
						{ label: 'À venir', value: 'future' },
					],
					filterMultiple: false,
					filterMethod: (value, row) => value === 'past' ? isBefore(new Date(row.date), new Date()) : isAfter(new Date(row.date), new Date())
				},
				{ title: 'Nom', key: 'name', sortable: true },
				{ title: 'Lieu', key: 'place', sortable: true },
				{ title: 'Status', key: 'status', slot: 'status', sortable: true, width: 180,
					filters: [
						{ label: 'Terminés', value: 'done' },
						{ label: 'À venir', value: 'upcoming' },
						{ label: 'Annulés', value: 'canceled' }
					],
					filterMultiple: true,
					filterMethod: (value, row) => row.status.indexOf(value) > -1
				},
				{ title: 'Voir', width: 80, align: 'center', slot: 'action' }
			]
		}
	},

	computed: {
		lives () {
			return this.$store.getters['lives/list']
		},
	},

	methods: {
		/**
		 * Get all the scores and make an average
		 * @param value { Array } Values
		 */
		getScore (values) {
			return values.reduce((accumulator, value) => accumulator + value.note, 0) / values.length
		},
	}
}
</script>

<style lang="stylus" scoped>
.dashboard
	overflow-x auto
	.lives
		min-width 800px
</style>
