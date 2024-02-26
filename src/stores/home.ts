/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-04 09:46:19
 * @Description:
 */
import { ref } from "vue";
import { defineStore } from "pinia";
import { PAGE_CONFIG } from "@/views/Home/index.config";

export const useHomeStore = defineStore("robot-face-info-home", () => {
  const pageConfig = ref(PAGE_CONFIG);
  return { pageConfig };
});
