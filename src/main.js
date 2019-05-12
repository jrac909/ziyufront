import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

import App from './App'
import store from './store' /* 这里导入的是一个文件夹，这样写可能是内部实现了引入文件夹下的 index.js 文件，所以在
index.js 中要把所有接口引入，留 index.js 当对外接口 */
import router from './router'

import '@/icons' // icon
import '@/permission'

Vue.use(ElementUI)
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  /* 其实就是 render: function(createElement()){ return createElement(App)} */
  /* createElement 的参数：
		1. 为 'App', 字符串，代表标签，会在页面创建一个 <App></App>，此时还需要注册组件 components: {App}
		2. 直接传入组件 App，如下，也不用注册组件了
   */
  render: h =>h(App)
})
