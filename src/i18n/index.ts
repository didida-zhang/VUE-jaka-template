/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-05-12 11:27:17
 * @Description:
 */
import { createI18n } from "vue-i18n";
import en_US from "./lang/en_US";
import zh_CN from "./lang/zh_CN";
import ja_JP from "./lang/ja_JP";

const locale = localStorage.getItem("locale");
const messages = {
  zh_CN: zh_CN,
  en_US: en_US,
  ja_JP: ja_JP,
};

const i18n = createI18n({
  // 定义的语言
  locale: locale || "zh_CN",
  messages,
  globalInjection: true,
  legacy: false,
});
export default i18n;
