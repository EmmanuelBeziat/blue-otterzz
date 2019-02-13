import Vue from 'vue'
import { format, formatDistanceStrict } from 'date-fns'
import { fr } from 'date-fns/locale'

/**
 * @param {String} value
 * @return {String}
 */

Vue.filter('date', (value, params) => {
	switch (params) {
	case 'full': return format(new Date(value), 'eeee dd MMMM yyyy à hh:mm', { locale: fr })
	case 'date': return format(new Date(value), 'eeee dd MMMM yyyy', { locale: fr })
	case 'hour': return format(new Date(value), 'hh:mm', { locale: fr })
	default: return formatDistanceStrict(new Date(value), new Date(), { addSuffix: true, locale: fr, includeSeconds: true })
	}
})
