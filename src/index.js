import './styles/index.js'
import App from './App.vue'
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

new Vue({
  el: '#svgMusicLogosApp',
  template: '<App/>',
  components: {
    App
  }
})

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-32351360-4'
  })
}
