/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-04 09:46:19
 * @Description:
 */
import { reactive } from "vue";
import { defineStore } from "pinia";
import { loadMicroApp } from "qiankun";
import type { MicroApp } from "@/micro";

export const useMicroApp = defineStore("microApp", () => {
  const microAppsInstance = reactive<any>({});
  const registerApps = (app: MicroApp) => {
    if (!microAppsInstance[app.name]) {
      microAppsInstance[app.name] = loadMicroApp(app);
    }
  };
  const uninstallMicroApp = (app: MicroApp) => {
    if (!app || !app.name) {
      for (const key in microAppsInstance) {
        microAppsInstance[key].unmount();
      }
      Object.assign(microAppsInstance, {});
    } else {
      microAppsInstance[app.name].unmount();
      microAppsInstance[app.name] = null;
    }
  };
  return { microAppsInstance, registerApps, uninstallMicroApp };
});
