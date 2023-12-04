/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-11-03 16:09:56
 * @Description:
 */

import { KeepAlive, defineComponent, ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import { legacyLogicalPropertiesTransformer } from "ant-design-vue";
import { getThemeToken } from "@/utils/theme";
import { useAppConfig } from "./stores/app";

const App = defineComponent({
  name: "App",
  setup: () => {
    const appRouter = useRouter();
    (window as any)["RobotFaceMain"] = {
      router: appRouter,
    };
    const color = ref<string>("red");
    const app = useAppConfig();
    return () => (
      <a-config-provider
        hash-priority="high"
        transformers={[legacyLogicalPropertiesTransformer]}
        theme={{
          token: getThemeToken(color.value),
        }}
      >
        <a-spin size="large" spinning={app.loading}>
          <RouterView
            v-slots={{
              default: ({ Component }: any) => {
                return <KeepAlive>{Component}</KeepAlive>;
              },
            }}
          ></RouterView>
        </a-spin>
      </a-config-provider>
    );
  },
});
export default App;
