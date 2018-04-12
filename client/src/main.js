import Vue from 'vue'
import App from './App'
import VueSocketio from 'vue-socket.io'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false
Vue.use(VueSocketio, 'http://localhost:8000')
Vue.use(Vuetify)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  sockets: {
    disconnect: function () {
      console.log('socket to notification channel disconnected')
    },
    connect: function () {
      console.log('socket to notification channel connected')
    },
  },
})
