/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-11-03 16:09:56
 * @Description:
 */
// 按需引入组件
import { Button } from 'ant-design-vue'
import { defineComponent } from 'vue'
const HomeView = defineComponent({
  name: 'HomeView',
  setup: (props, context) => {
    return () => {
      return (
        <div class={'flex justify-center h-100vh items-center'}>
          <Button type='primary'>点击</Button>
        </div>
      )
    }
  }
})
export default HomeView
