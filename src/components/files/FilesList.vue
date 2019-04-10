<template>
	<div class="files">
		<ul class="files-list" v-if="files.length">
			<li v-for="(file, key) in files" :key="key"><a class="file-name" :href="downloadFile(file.file)" download target="_blank">{{ file.file }}</a> • {{ file.date | date('full') }} par <router-link :to="{ name: 'user', params: { slug: file.user }}">{{ getUserName(file.user) }}</router-link></li>
		</ul>
		<div v-else>
			Aucun fichier trouvé
		</div>

		<Upload v-if="downloadAvailable" :action="'/'" ref="upload-tabs" :on-success="uploadSuccess" :on-error="uploadError" :max-size="options.maxSize" :format="options.formats" type="drag">
			<div class="upload-field">
				<Icon type="md-cloud-upload" size="52" />
				<br>Cliquez ou faites glisser un fichier…
			</div>
		</Upload>
	</div>
</template>

<script>
import { api } from '@/config'
import getUserName from '@/plugins/mixins/getUserName'

export default {
	name: 'FilesList',
	props: ['files', 'options'],
	mixins: [getUserName],

	data () {
		return {
			downloadAvailable: false
		}
	},

	methods: {
		/**
		 * Get the url to download a file
		 * @param file { String } File name
		 */
		downloadFile (file) {
			return `${api.files}/${this.$route.params.slug}/${file}`
		},

		uploadSuccess (file) {
			console.log(file)
		},

		uploadError (file) {
			console.log(file)
		}
	}
}
</script>

<style lang="stylus" scoped>
.files
	margin-bottom 2rem

.upload-field
	padding 1rem 2rem
	text-align center

.files-list
	margin-left 1rem
	margin-bottom 2rem

.file-name
	font-weight 700
</style>
