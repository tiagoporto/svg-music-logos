import './imports/google_analytics.js'
import App from './imports/App.vue'
import Vue from 'vue'

new Vue({
  el: '#svgMusicLogosApp',
  template: '<App/>',
  components: {
    App
  }
})

window.onscroll = () => {
  if (window.scrollY > 0) {
    document.getElementById('jumbotron').style.height = '100%'
  } else {
    document.getElementById('jumbotron').style.height = '400px'
  }
}
