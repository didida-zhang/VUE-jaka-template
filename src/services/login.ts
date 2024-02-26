/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-06 09:42:51
 * @Description:
 */
export type LoginData = {
  username: string;
  password: string;
  ip: string;
  online?: boolean;
};
export type Robot = {
  address: string;
  family: string;
  port: number;
  isConnect: "False" | "True";
  robotId: string;
  robotName: string;
  robotIp: string;
  controlVersion: string;
};
import httpRequest from "@/utils/http";
import { apis } from "@/api";

export const loginApi = {
  /**
   * 示例接口 登录接口
   * @returns
   */
  login: async (data: { loginData: LoginData; robotInfo: Robot | null }) => {
    try {
      const other: any = { hideError: true };
      const res = await httpRequest({
        url: apis.login,
        method: "post",
        data: data.loginData,
        ...other,
      });
      let info = data.robotInfo;
      if (!data.loginData.online) {
        const robotList = await loginApi.getRobotList();
        if (robotList.length) {
          info = robotList.find(
            (item) => item.robotIp === data.loginData.ip
          ) as Robot;
        }
        if (!info) {
          const robotInfo = await loginApi.getRobotInfoApi(data.loginData.ip);
          if (robotInfo) {
            info = robotInfo;
          } else {
            if (!info) {
              info = {
                robotIp: data.loginData.ip,
              } as any;
            }
          }
        }
      }
      localStorage.setItem("loginData", JSON.stringify(data.loginData));
      localStorage.setItem("robot", JSON.stringify(info));
      return res;
    } catch (error) {
      return null;
    }
  },
  getRobotInfoApi: async (ip: string) => {
    try {
      // const res = await grpcRequest('MSGID_HEARTBEAT', {})
      const res = await httpRequest({
        url: "/robot/getRobotInfo",
        method: "post",
        headers: {
          robotIp: ip,
        },
        data: {},
      });
      return res.data;
    } catch (err) {
      return null;
    }
  },
  getRobotList: async (): Promise<Robot[]> => {
    try {
      const other: any = { hideError: true };
      const res = await httpRequest({
        url: apis.getUdpList,
        method: "post",
        data: {},
        ...other,
      });
      return res.data;
    } catch (err) {
      return [];
    }
  },
};
