/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-11-03 16:09:56
 * @Description:
 */
import { ConfigProvider } from 'ant-design-vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
export type PopUpProps = {
  title: string
}

export const popUpProps = () => ({
  title: { type: String, default: '' }
})
const App = defineComponent({
  name: 'App',
  props: popUpProps(),
  setup: (props: PopUpProps, context) => {
    const { slots } = context as any
    // 主题配置 https://www.antdv.com/docs/vue/customize-theme-cn
    const themeToken: ThemeConfig = {
      token: {
        colorPrimary: '#00b96b'
      }
    }
    return () => {
      return (
        <ConfigProvider theme={themeToken}>
          <RouterView></RouterView>
        </ConfigProvider>
      )
    }
  }
})
export default App
