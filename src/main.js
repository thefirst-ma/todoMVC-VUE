import Vue from 'vue' //第三方模块
import App from './App.vue' // 自定义模块的引入的 前面需要加./

Vue.config.productionTip = false

new Vue({
  render: h => h(App), //使用render函数渲染出App组件
}).$mount('#app')       //通过$.mount("#app") 指定根组件模板 之前使用 el:"#app"
