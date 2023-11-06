/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-11-03 16:09:56
 * @Description:
 */
// 按需引入组件
import { defineComponent } from 'vue'
const HomeView = defineComponent({
  name: 'HomeView',
  setup: (props, context) => {
    return () => {
      return (
        <div class={'flex justify-center h-100vh items-center'}>
          <a-button type='primary'>点击</a-button>
        </div>
      )
    }
  }
})
export default HomeView
