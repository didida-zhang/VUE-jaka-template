/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-11-03 16:09:56
 * @Description:
 */

import { defineComponent, onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import { legacyLogicalPropertiesTransformer } from "ant-design-vue";
import { getThemeToken } from "@/utils/theme";
import { registerMicroApps, start } from "qiankun";

const App = defineComponent({
  name: "App",
  setup: () => {
    const color = ref<string>("red");
    // 加载子应用示例
    onMounted(() => {
      registerMicroApps([
        {
          name: "app1",
          entry: "http://172.30.0.56:31202/",
          container: "#container",
          activeRule: "/app1", //
          props: {},
        },
      ]);
      // 启动 qiankun
      start();
    });
    return () => (
      <a-config-provider
        hash-priority="high"
        transformers={[legacyLogicalPropertiesTransformer]}
        theme={{
          token: getThemeToken(color.value),
        }}
      >
        <RouterView></RouterView>
        <div id="container"></div>
      </a-config-provider>
    );
  },
});
export default App;
