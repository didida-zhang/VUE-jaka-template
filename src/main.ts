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
import i18n from "./i18n";
import ECharts from "vue-echarts";
import { use } from "echarts/core";

import { CanvasRenderer } from "echarts/renderers";
import AppView from "./App";
import {
  renderWithQiankun,
  qiankunWindow,
  type QiankunProps,
} from "vite-plugin-qiankun/dist/helper";
import "jaka-ui/lib/css/index.css";
import "./assets/main.css";
import { prefetchMircoApps } from "./micro";
import jakaUtils from "jaka-utils";
import JakaUI from "jaka-ui";

import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  LegendComponent,
} from "echarts/components";
let app: any = null;
use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  DataZoomComponent,
  LegendComponent,
]);
// 写一个全局的方法，方便主子应用调用
(window as any)["common_utils"] = (window as any)["common_utils"] || {
  appStore: new jakaUtils.store.AppConfig(),
  robotStore: new jakaUtils.store.JAKARobot(),
};

const render = (props?: any) => {
  const { container } = props;
  app = createApp(AppView);
  app.component("v-chart", ECharts);
  // 获取到主应用传递的props并挂载到vue的原型上
  app.config.globalProperties.$props = props;
  app
    .use(createPinia())
    .use(i18n)
    .use(Antd)
    .use(JakaUI)
    .mount(container ? container.querySelector("#app") : "#app");
  (window as any)["JogName"] = props.getJoint ? "main" : "";
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    prefetchMircoApps(props?.baseName);
  } else {
    prefetchMircoApps("/");
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
