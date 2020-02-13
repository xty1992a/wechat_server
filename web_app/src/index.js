import Vue from "vue";
import router from "./router";
import App from "./App";
import {getParams} from "./utils/index";
import "./utils/iconfont";
import Main from "@redbuck/packages";
import "./utils/flexible";
import eruda from "eruda";

eruda.init();

Vue.use(Main);

Vue.prototype.$params = getParams();

new Vue({
  el: "#app",
  router,
  components: {App},
  render: h => h(App),
});
