import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import(/* webpackChunkName: "home/index" */"./views/home/index.vue"),
      meta: {
        title: "平台能力"
      }
    },
    {
      path: "/js_sdk",
      name: "sdk",
      component: () => import(/* webpackChunkName: "home/sdk" */"./views/sdk/index.vue"),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/editMenu",
      name: "editMenu",
      component: () => import(/* webpackChunkName: "home/edit" */"./views/sdk/index.vue"),
      meta: {
        title: "编辑菜单",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {

  document.title = to.meta.title;
  next();
});
export default router;
