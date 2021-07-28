import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

// 引入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载动态设置REM基准值
import 'amfe-flexible'

// 加载字体图标样式
import './styles/index.less'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
