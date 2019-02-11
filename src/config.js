const env = JSON.parse(unescape(process.env.PACKAGE_JSON || '%7B%7D'))

const domain = ''

export const api = {
	root: domain,
	routes: {
		projects: 'api/songs',
	}
}

export const app = {
	name: env.name,
	version: env.version,
	description: env.description,
	author: env.author,
}

export const spotify = {
	clientID: '854fec3ebf89495381d0f08b0fe1c559',
	clientSecret: '2e2d6166a3564e0ca8c94546f6cdbede'
}
