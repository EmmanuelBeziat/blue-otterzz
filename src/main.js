import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(iView)

store.dispatch('projects/init')
store.dispatch('users/init')

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
