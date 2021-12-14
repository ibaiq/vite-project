import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import "./assets/index.scss";
import "nprogress/css/nprogress.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import store from "@/store/index.js";
import router from "@/router/index.js";
import * as ElIconModules from "@element-plus/icons-vue";

const app = createApp(App);

for (let iconName in ElIconModules) {
  // app.component(transElIconName(iconName), ElIconModules[iconName]);
  app.component(iconName, ElIconModules[iconName]);
}

app
  .use(router)
  .use(store)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount("#app");
