<template>
	<div class="dashboard">
		<Table class="lives" :columns="columns" :data="lives">
			<template slot-scope="{ row }" slot="date">{{ row.date | date('full') }} — {{ row.date | date }}</template>
			<template slot-scope="{ row }" slot="action">
				<Button icon="md-eye" type="primary" style="margin-right: 5px" @click="$router.push({ name: 'song', params: { slug: row.slug }})" />
				<!-- <Button icon="md-trash" type="error" @click="remove(row._id)" /> -->
			</template>
		</Table>
	</div>
</template>

<script>
import { spotify } from '@/config'
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
		getScore (values) {
			return values.reduce((accumulator, value) => accumulator + value.note, 0) / values.length
		},
	}
}
</script>

<style lang="stylus" scoped>
.file-download
	padding 0 .35em

	span&
		color var(--color-grey)
</style>

<style lang="stylus">
@require '~@/assets/styles/iview-override.styl'
</style>

