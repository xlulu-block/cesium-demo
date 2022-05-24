import Vue from 'vue'
import App from './App.vue'
import router from './router'

//vue-iclient3d-webgl组件库
import  '@supermap/vue-iclient3d-webgl/dist/styles/vue-iclient3d-webgl.min.css';
import VueiClient from '@supermap/vue-iclient3d-webgl';
Vue.use(VueiClient);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
