import Vue from 'vue'
import Router from 'vue-router'
import Song from './views/Songs/View'
import Songs from './views/Songs/List'
import Live from './views/Lives/View'
import Lives from './views/Lives/List'
import User from './views/Users/View'
import Users from './views/Users/List'
import UserEdit from './views/Users/Edit'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			name: 'home',
			redirect: { name: 'songs' },
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
			path: '/lives',
			name: 'lives',
			component: Lives
		},
		{
			path: '/lives/:slug',
			name: 'live',
			component: Live
		},
		{
			path: '/users',
			name: 'users',
			component: Users
		},
		{
			path: '/users/:slug',
			name: 'user',
			component: User,
		},
		{
			path: '/users/edit',
			name: 'user-edit',
			component: UserEdit,
		},
		{
			path: '/login',
			name: 'login',
			component: () => import(/* webpackChunkName: "Login" */ './views/Login/Login.vue'),
			beforeEnter: (to, from, next) => {
				const isLogged = window.localStorage.getItem('blue-otterzz-login')
				isLogged && JSON.parse(isLogged.name !== '') ? next('/songs') :	next()
			}
		},
		{
			path: '/register',
			name: 'register',
			component: () => import(/* webpackChunkName: "Register" */ './views/Login/Register.vue')
		},
		{
			path: '/lost-password',
			name: 'password',
			component: () => import(/* webpackChunkName: "Password" */ './views/Login/Password.vue')
		}
	]
})
