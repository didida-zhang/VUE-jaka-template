/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-04 09:46:19
 * @Description:
 */
import { ref } from "vue";
import { defineStore } from "pinia";

export const useModelStore = defineStore("robot-face-info-model", () => {
  const voltage = ref(false);
  const joint = ref(false);
  return { voltage, joint };
});
