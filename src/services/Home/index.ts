/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-11-06 09:17:12
 * @Description:
 */
import httpRequest, { grpcRequest } from '@/utils/http'
import type { Cartpos, JointPos, LoginData } from './type'
import { apis } from '@/api/config'
export const homeApi = {
  /**
   * 示例接口 登录接口
   * @returns
   */
  login: async (data: LoginData) => {
    try {
      const other: any = { hideError: true }
      const res = await httpRequest({
        url: apis.login,
        method: 'post',
        data,
        ...other
      })
      return res
    } catch (error) {
      return null
    }
  },
  /**
   * 示例接口 根据笛卡获取关节角度
   */
  kineforward: async (jointpos: JointPos): Promise<Cartpos> => {
    try {
      const res = await grpcRequest(apis.kineforward, { jointpos })
      return res.data.cartpos
    } catch (err) {
      return { x: 0, y: 0, z: 0, a: 0, b: 0, c: 0 }
    }
  }
}
