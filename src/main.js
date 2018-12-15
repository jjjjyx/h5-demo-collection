import Vue from 'vue'
import 'lib-flexible/flexible.js'

import router from '@/router'
import store from '@/store'
import directives from '@/directives'
import '@/utils/prefetch'

import '@/assets/app.scss'
import App from './App.vue'

Vue.use(directives)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
