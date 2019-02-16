<template>
	<div class="modal-player">
		<Button song="default" icon="md-play" @click="modal(parseSource(source))">Écouter</Button>
	</div>
</template>

<script>
import getVideoId from 'get-video-id'
import getAudioId from 'get-audio-id'

export default {
	name: 'ModalPlayer',
	props: ['source'],

	methods: {
		/**
		 * @param source { String } Source url
		 */
		parseSource (source) {
			return source.includes('spotify') || source.includes('deezer') ? getAudioId(source) : getVideoId(source)
		},

		/**
		 * Open iView modal based on url type
		 * https://www.iviewui.com/components/modal-en#API
		 * @param song { String }
		 */
		modal (song) {
			const closable = true
			const okText = `Fermer`

			switch (song.service) {
			case 'youtube':
				this.$Modal.info({
					okText,
					width: 600,
					content: `<iframe width="560" height="315" src="https://www.youtube.com/embed/${song.id}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
				})
				break

			case 'spotify':
				this.$Modal.info({
					okText,
					width: 340,
					content: `<iframe src="https://open.spotify.com/embed/track/${song.id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
				})
				break

			case 'deezer':
				this.$Modal.info({
					okText,
					width: 340,
					content: `<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=square&playlist=false&width=300&height=300&color=007FEB&layout=dark&size=medium&type=tracks&id=${song.id}&app_id=1" width="300" height="300"></iframe>`
				})
			}
		}
	}
}
</script>
