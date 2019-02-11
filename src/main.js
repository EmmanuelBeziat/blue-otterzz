import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import iView from 'iview'

import './registerServiceWorker'
import 'iview/dist/styles/iview.css'
import './plugins/index'

Vue.config.productionTip = false

Vue.use(iView)

store.dispatch('songs/init')
store.dispatch('users/init')

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start()
	next()
})
router.afterEach(route => {
	iView.LoadingBar.finish()
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
