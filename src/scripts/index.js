import App from './imports/App.vue'
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

window.onscroll = () => {
  if (window.scrollY > 20) {
    document.getElementById('jumbotron').style.height = '100%'
  } else {
    document.getElementById('jumbotron').style.height = '400px'
  }
}
