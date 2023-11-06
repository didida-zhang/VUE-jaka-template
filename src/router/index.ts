/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-11-03 15:33:56
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
