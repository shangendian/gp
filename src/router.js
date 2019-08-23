import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/Home', children:[]},
    { path: '/login',name: 'login', component: () => import( './views/login')},
    { path: '/Home',
      name: 'Home', 
      component: () => import( './components/Home'),
      children:[
        {path: '/BannerCreate',name: 'BannerCreate', component: () => import( './views/BannerCreate')},
        {path: '/bannerList',name: 'bannerList', component: () => import( './views/bannerList')},
        {path: '/flash',name: 'flash', component: () => import( './views/flash')},
        {path: '/topic',name: 'topic', component: () => import( './views/topic')},
        {path: '/publicFeed',name: 'publicFeed', component: () => import( './views/publicFeed')},
        {path: '/publicFeedList',name: 'publicFeedList', component: () => import( './views/publicFeedList')},
        {path: '/advertising',name: 'advertising', component: () => import( './views/advertising')},
        {path: '/userList',name: 'userList', component: () => import( './views/userList')},
        {path: '/Administrator',name: 'Administrator', component: () => import( './views/Administrator')},
        {path: '/report',name: 'report', component: () => import( './views/report')},
        {path: '/feedback',name: 'feedback', component: () => import( './views/feedback')},
        {path: '/versions',name: 'versions', component: () => import( './views/versions')},
        {path: '/comment',name: 'comment', component: () => import( './views/comment')},
    ]},
    
  ],
});
