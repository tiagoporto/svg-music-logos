import App from './App'
import FlagIcon from 'vue-flag-icon'
import { registerServiceWorker } from './serviceWorker'
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(FlagIcon)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/search',
      name: 'search',
      query: {
        q: null,
        origin: null,
        genre: null
      },
      component: App
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const hasQueryParams = route => {
    return Boolean(Object.keys(route.query).length)
  }

  if (!hasQueryParams(to) && hasQueryParams(from)) {
    next({ name: to.name, query: from.query })
  } else {
    next()
  }
})

const app = new Vue({
  router
})

app.$mount('#svgMusicLogosApp')
registerServiceWorker()

const hostname = window.location && window.location.hostname
const isMyDomain = hostname === 'tiagoporto.github.io'

if (isMyDomain || hostname !== 'localhost') {
  Vue.use(VueAnalytics, {
    id: 'UA-32351360-4'
  })
}
