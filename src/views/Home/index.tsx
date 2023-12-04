/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-04 09:12:12
 * @Description:
 */
import { microApps } from "@/micro";
import { useMicroApp } from "@/stores/microApp";
import { KeepAlive, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
// import { RouterView } from "vue-router";

const LayoutView = defineComponent({
  name: "LayoutView",
  setup: () => {
    const currentName = ref("info");
    const microApp = useMicroApp();
    const route = useRoute();
    const checkPath = (path: string) => {
      const app =
        microApps.find((item) => path.startsWith(`/${item.name}`)) ||
        microApps[0];
      currentName.value = app ? app.name : "info";
      if (app) {
        microApp.registerApps(app);
      }
    };
    watch(
      () => route.path,
      (val) => {
        checkPath(val);
      },
      {
        immediate: true,
      }
    );
    onMounted(() => {
      checkPath(route.path);
    });

    return () => (
      <div>
        <KeepAlive>
          {microApps.map((item) => (
            <div id={item.name}></div>
          ))}
        </KeepAlive>
      </div>
    );
  },
});
export default LayoutView;
