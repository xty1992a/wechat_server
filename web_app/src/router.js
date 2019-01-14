import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
	{
	  path: '/',
	  name: 'home',
	  component: resolve => require(['./views/home.vue'], resolve),
	  meta: {
		title: '首页',
	  },
	},
	{
	  path: '/editMenu',
	  name: 'editMenu',
	  component: resolve => require(['./views/editMenu/index.vue'], resolve),
	  meta: {
		title: '编辑菜单',
	  },
	},
  ],
})