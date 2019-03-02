import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { api } from '@/config'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = api.root
Vue.axios.defaults.headers.post['Content-Type'] = 'application/json'
