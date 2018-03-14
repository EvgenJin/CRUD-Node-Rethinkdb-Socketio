// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

import VueSocketio from 'vue-socket.io'
// import socketio from 'socket.io'
// import socketio from 'socket.io'

Vue.use(VueSocketio, 'http://localhost:8000')

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
