/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-01 11:36:20
 * @Description:
 */

import { createApp } from "vue";
import { createPinia } from "pinia";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import AppView from "./App";
import createRouter from "./router";
import { registerMicroApps, start } from "qiankun";
import {
  renderWithQiankun,
  qiankunWindow,
  type QiankunProps,
} from "vite-plugin-qiankun/dist/helper";
import "./assets/main.css";

let app: any = null;
const render = (props?: any) => {
  const { container } = props;
  app = createApp(AppView);
  const router = createRouter(
    qiankunWindow.__POWERED_BY_QIANKUN__
      ? props?.baseName || `/${props?.name}`
      : import.meta.env.BASE_URL
  );
  // 获取到主应用传递的props并挂载到vue的原型上
  app.config.globalProperties.$props = props;
  app.config.globalProperties.router = router;
  app
    .use(createPinia())
    .use(router)
    .use(Antd)
    .mount(container ? container.querySelector("#app") : "#app");
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log("正在作为子应用运行");
  }
};

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
renderWithQiankun({
  bootstrap() {
    console.log("[vue] vue app bootstraped");
  },
  mount(props) {
    render(props);
  },
  unmount() {
    app?.unmount();
    app = null;
  },
  update: function (props: QiankunProps): void | Promise<void> {
    app?.update(props);
  },
});
