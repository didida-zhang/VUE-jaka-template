/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-01 17:26:54
 * @Description:
 */
import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppConfig = defineStore("app", () => {
  const loading = ref(false);

  return { loading };
});
