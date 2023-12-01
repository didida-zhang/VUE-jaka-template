/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-01 11:36:20
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home";

const router = (base: string) => {
  return createRouter({
    history: createWebHistory(base),
    routes: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
    ],
  });
};

export default router;
