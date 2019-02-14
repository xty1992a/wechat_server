import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
	{
	  path: '/js_sdk',
	  name: 'sdk',
	  component: () => import(/* webpackChunkName: "home/sdk" */'./views/sdk/index.vue'),// resolve => require(['./views/sdk/index.vue'], resolve),
	  meta: {
		title: '首页',
	  },
	},
	{
	  path: '/editMenu',
	  name: 'editMenu',
	  component: () => import(/* webpackChunkName: "home/edit" */'./views/sdk/index.vue'),
	  meta: {
		title: '编辑菜单',
	  },
	},
  ],
})
