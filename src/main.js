import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  document.title = '瓜皮后台管理系统'

  /* 路由发生变化修改页面title */
  if (to.path != '/login') {
    if (store.state.TOKEN || sessionStorage.getItem('TOKEN')) {
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
  
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
