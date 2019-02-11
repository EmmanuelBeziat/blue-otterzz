import Vue from 'vue'
import { formatDistanceStrict } from 'date-fns'
import { fr } from 'date-fns/locale'

/**
 * @param {String} value
 * @return {String}
 */

Vue.filter('date', (value) => formatDistanceStrict(new Date(value), new Date(), { addSuffix: true, locale: fr, includeSeconds: true }))
