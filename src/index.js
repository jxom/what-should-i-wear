import Vue from 'vue'
import VueResource from 'vue-resource'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'flat-ui/css/flat-ui.css'

import App from '@/containers/App'

Vue.use(VueResource)
new Vue({
  el: '#app',
  render: h => h(App)
})
