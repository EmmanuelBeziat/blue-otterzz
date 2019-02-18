<template>
	<div class="iframe-player" v-html="getIframe()"></div>
</template>

<script>
import getVideoId from 'get-video-id'
import getAudioId from 'get-audio-id'

export default {
	name: 'IframePlayer',
	props: ['source'],

	methods: {
		/**
		 * @param source { String } Source url
		 */
		parseSource (source) {
			return source.includes('spotify') || source.includes('deezer') ? getAudioId(source) : getVideoId(source)
		},

		/**
		 * Open Iframe modal based on url type
		 */
		getIframe () {
			const song = this.parseSource(this.$props.source)

			switch (song.service) {
			case 'youtube':
				return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${song.id}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`

			case 'spotify':
				return `<iframe src="https://open.spotify.com/embed/track/${song.id}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`

			case 'deezer':
				return `<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=square&playlist=false&width=300&height=300&color=007FEB&layout=dark&size=medium&type=tracks&id=${song.id}&app_id=1" width="300" height="300"></iframe>`
			}
		}
	}
}
</script>
