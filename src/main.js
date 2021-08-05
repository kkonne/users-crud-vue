import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"

Vue.config.productionTip = false

axios.defaults.baseURL = "https://6103057679ed680017482413.mockapi.io/users/";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
