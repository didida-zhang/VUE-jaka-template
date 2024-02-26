/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-04 09:46:19
 * @Description:
 */
import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoading = defineStore("loading", () => {
  const app = ref(false);
  return { app };
});
