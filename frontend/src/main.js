import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import {useCookies} from 'vue3-cookies'

createApp(App)
  .use(store)
  .use(router)
  .use(useCookies())
  .mount('#app')
