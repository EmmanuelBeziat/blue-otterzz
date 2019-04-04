const env = JSON.parse(unescape(process.env.PACKAGE_JSON || '%7B%7D'))

const domain = 'https://rest.blueotterzz.com'

export const api = {
	root: domain,
	routes: {
		songs: '/songs',
		lives: '/lives',
		users: '/users',
		login: '/login'
	},
	onedrive: {
		appId: 'c12c0def-7f07-4b7a-a975-75730f956787',
		password: 'xikvgsUJX30|%zSOJG456^='
	}
}

export const app = {
	name: env.name,
	version: env.version,
	description: env.description,
	author: env.author,
}
