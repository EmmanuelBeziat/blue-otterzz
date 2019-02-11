const env = JSON.parse(unescape(process.env.PACKAGE_JSON || '%7B%7D'))

const domain = ''

export const api = {
	root: domain,
	routes: {
		projects: 'api/projects',
	}
}

export const app = {
	name: env.name,
	version: env.version,
	description: env.description,
	author: env.author,
}
