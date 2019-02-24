const env = JSON.parse(unescape(process.env.PACKAGE_JSON || '%7B%7D'))

const domain = 'https://rest.blueotterzz.com'

export const api = {
	root: domain,
	routes: {
		songs: '/songs',
		lives: '/lives',
		users: '/users',
		login: '/login'
	}
}

export const app = {
	name: env.name,
	version: env.version,
	description: env.description,
	author: env.author,
}
