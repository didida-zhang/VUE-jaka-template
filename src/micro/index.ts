import { useMicroApp } from "@/stores/microApp";
import { prefetchApps } from "qiankun";

/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-04 08:55:39
 * @Description:
 */
export type MicroApp = {
  name: string;
  entry: string;
  container: string;
  activeRule: string | boolean;
  props: any;
};
export const microApps: MicroApp[] = [];
export function prefetchMircoApps(baseName: string) {
  const microApp = useMicroApp();
  microApp.microApps = microApps.map(({ name, entry, props, activeRule }) => {
    return {
      name: name,
      container: "#" + name,
      activeRule,
      entry,
      props: {
        baseName: baseName + props.baseName,
      },
    };
  });
  prefetchApps(microApp.microApps); // 预加载微应用的静态资源
}
