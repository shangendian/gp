import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    TOKEN: '',
    USER_INFO:{}
  },
  mutations: {
    SET_TOKEN(state,t){
      VueCookies.set('TOKEN', t) 
      sessionStorage.setItem('TOKEN',t)
      state.TOKEN = t
    },
    SET_USER_INFO(state,t){
      sessionStorage.setItem('USER_INFO',JSON.stringify(t))
      state.USER_INFO = t
    }, 
  },
  actions: {
    SET_TOKEN(context,t){
      context.commit('SET_TOKEN',t);
    },
    SET_USER_INFO(context,t){
      context.commit('SET_USER_INFO',t);
    },
  },
});
