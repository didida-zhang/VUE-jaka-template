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
export const microApps: MicroApp[] = [
  {
    name: "info",
    entry: "http://172.30.0.56:31210/",
    container: "#info",
    activeRule: true, //
    props: {
      baseName: "/info",
    },
  },
  {
    name: "io",
    entry: "http://172.30.0.56:31220/",
    container: "#io",
    activeRule: true, //
    props: {
      baseName: "/io",
    },
  },
];
export function prefetchMircoApps() {
  const apps = microApps.map(({ name, entry }) => {
    return {
      name: name,
      container: "#" + name,
      activeRule: true,
      entry,
    };
  });
  prefetchApps(apps); // 预加载微应用的静态资源
}
