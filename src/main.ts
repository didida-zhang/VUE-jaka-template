/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-11-03 15:33:56
 * @Description:
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App'
import router from './router'
import 'virtual:windi.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import {
  renderWithQiankun,
  qiankunWindow,
  type QiankunProps
} from 'vite-plugin-qiankun/dist/helper'

let app: any = null

const render = (props?: any) => {
  const { container } = props
  app = createApp(App)
  // 获取到主应用传递的props并挂载到vue的原型上
  app.config.globalProperties.$props = props
  app
    .use(createPinia())
    .use(router)
    .use(Antd)
    .mount(container ? container.querySelector('#sub-app-box') : '#sub-app-box')
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log('正在作为子应用运行')
  }
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}

renderWithQiankun({
  bootstrap() {
    console.log('[vue] vue app bootstraped')
  },
  mount(props) {
    render(props)
  },
  unmount() {
    app.unmount()
    app = null
  },
  update: function (props: QiankunProps): void | Promise<void> {
    app.update(props)
  }
})
