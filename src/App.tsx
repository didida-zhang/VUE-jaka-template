/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-11-03 16:09:56
 * @Description:
 */

import { defineComponent, watch } from "vue";
import { legacyLogicalPropertiesTransformer } from "ant-design-vue";
import { getThemeToken } from "@/utils/theme";
import { initStore, useAppConfig } from "./utils/store";
import en_US from "ant-design-vue/es/locale/en_US";
import zh_CN from "ant-design-vue/es/locale/zh_CN";
import zh_HK from "ant-design-vue/es/locale/zh_HK";
import zh_TW from "ant-design-vue/es/locale/zh_TW";
import de_DE from "ant-design-vue/es/locale/de_DE";
import ja_JP from "ant-design-vue/es/locale/ja_JP";
import { useI18n } from "vue-i18n";
import styles from "./App.module.less";
import HomeView from "@/views/Home";

const App = defineComponent({
  name: "App",
  setup: () => {
    const { locale } = useI18n();
    const getLocales = (locale: string) => {
      switch (locale) {
        case "en_US":
          return en_US;
        case "de_DE":
          return de_DE;
        case "zh_TW":
          return zh_TW;
        case "zh_HK":
          return zh_HK;
        case "ja_JP":
          return ja_JP;
        default:
          return zh_CN;
      }
    };
    initStore();
    // 登录()
    // const login = async () => {
    //   try {
    //     app.loading = true;
    //     main.loadingText = t("LOGINNING");
    //     const res = await loginApi.login({
    //       loginData: {
    //         ...JSON.parse(localStorage.getItem("loginData") as any),
    //         online: false,
    //       },
    //       robotInfo: JSON.parse(localStorage.getItem("robot") as any),
    //     });
    //     if (res) {
    //       // app.loading = false;
    //     } 
    //   } catch (error) {
    
    //   }
    // };

    // if (robot.heartState == "init") {
    //   login();
    // }
    const app = useAppConfig();

    watch(
      () => app.locale,
      (val) => {
        locale.value = val;
      }
    );

    return () => (
      <a-config-provider
        hash-priority="high"
        locale={getLocales(app.locale)}
        transformers={[legacyLogicalPropertiesTransformer]}
        theme={{
          token: getThemeToken(app.colorPrimary),
        }}
      >
        <div id="settingBox" class={styles["box"]}>
          <div class={"w-full h-full"}>
            <a-spin
              size="large"
              spinning={app.loading}
            >
              <HomeView></HomeView>
            </a-spin>
          </div>
        </div>
        <div id="robot-face-info-page-box"></div>
      </a-config-provider>
    );
  },
});
export default App;
