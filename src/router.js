import Vue from 'vue'
import Router from 'vue-router'
import Song from './views/Songs/View'
import Songs from './views/Songs/List'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: { name: 'songs' }
		},
		{
			path: '/songs',
			name: 'songs',
			component: Songs
		},
		{
			path: '/songs/:slug',
			name: 'song',
			component: Song
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		}
	]
})
