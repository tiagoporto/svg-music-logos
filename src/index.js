import './styles/index.js'
import App from './App.vue'
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: App
    }, {
      path: '/search/:q',
      name: 'search',
      component: App
    }, {
      path: '*',
      redirect: '/'
    }
  ]
})

const app = new Vue({
  router
})

app.$mount('#svgMusicLogosApp')

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-32351360-4'
  })
}
