<template>
	<div class="files">
		<ul class="files-list" v-if="files.length">
			<li v-for="(file, key) in files" :key="key"><router-link class="file-name" :to="file.file">{{ file.file }}</router-link> • {{ file.uploadDate | date('full') }} par <router-link :to="{ name: 'user', params: { slug: file.uploader }}">{{ getUserName(file.uploader) }}</router-link></li>
		</ul>
		<div v-else>
			Aucun fichier trouvé
		</div>

		<Upload :action="'/'" ref="upload-tabs" :on-success="uploadSuccess" :format="formats" type="drag">
			<div class="upload-field">
				<Icon type="md-cloud-upload" size="52" />
				<br>Cliquez ou faites glisser un fichier…
			</div>
		</Upload>
	</div>
</template>

<script>
import getUserName from '@/plugins/mixins/getUserName'

export default {
	name: 'FilesList',
	props: ['files', 'formats'],
	mixins: [getUserName],

	methods: {
		uploadSuccess (file) {
			console.log(file)
		}
	}
}
</script>

<style lang="stylus" scoped>
.upload-field
	padding 1rem 2rem
	text-align center

.files-list
	margin-left 1rem
	margin-bottom 2rem

.file-name
	font-weight 700
</style>
