import Vue from 'vue'
import App from './App.vue'
import http from './http'
import router from "@/router";
import store from "@/store";
import moment from 'moment'

Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)

})
Vue.config.productionTip = false
Vue.prototype.$axios = http

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
