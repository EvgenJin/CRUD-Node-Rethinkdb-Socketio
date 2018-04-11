// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueSocketio from 'vue-socket.io'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false
Vue.use(VueSocketio, 'http://localhost:8000')
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // sockets: {
  //   disconnect: function () {
  //     console.log('socket to notification channel disconnected')
  //   },
  //   connect: function () {
  //     console.log('socket to notification channel connected')
  //   },
  // },
})
