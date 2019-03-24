export default {
	methods: {
		compare (oldObject, newObject) {
			let result = []

			Object.keys(newObject).forEach(key => {
				if (oldObject[key] !== newObject[key]) {
					result.push(key)
				}
			})

			return result
		}
	}
}
