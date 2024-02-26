/*
 * @File name:
 * @Author: LSZ
 * @Version: V1.0
 * @Date: 2023-12-05 15:24:27
 * @Description:
 */

import { defineStore } from "pinia";
import { reactive, ref } from "vue";
const name = `robot-face-sub-${new Date().getTime()}`;
export type Robot = {
  address: string;
  family: string;
  port: number;
  isConnect: "False" | "True";
  robotId: string;
  robotName: string;
  robotIp: string;
  controlVersion: string;
  scbVersion: string;
  servoVersion: string;
  sim: string;
  posture: {};
  customPose: Array<any>;
  toolOffset: Array<any>;
  userOffset: Array<any>;
};
export interface AppType {
  loading: boolean;
  colorPrimary: string;
  locale: "ja_JP" | "zh_CN" | "en_US" | "de_DE" | "fr_FR" | "ko_KR";
  colorSecondary: string;
  colorGradient: string;
  ready: boolean;
  getJoint: boolean;
  joints: any;
  common: any;
}
export type RobotStatus = {
  drag_near_limit: any[];
  din: any[];
  dout: any[];
  ain: any[];
  aout: any[];
  tio_din: any[];
  tio_dout: any[];
  tio_ain: any[];
  tio_aout: any[];
  extio_din: any[];
  extio_dout: any[];
  extio_ain: any[];
  extio_aout: any[];
  basicIoType: any[];
  relay_io: any[];
  errtype: number;
  errcode: number;
  errstring: string;
  joint_position: any;
  cartesian_position: any;
  robot_powered_on: boolean;
  robot_enabled: boolean;
  robot_in_drag: boolean;
  robot_on_slimit: boolean;
  protective_stop: boolean;
  emergency_stop: boolean;
  prog_stat: string;
  reduce_mode: string;
  extio_state: number;
  tio_key_state: {
    pointState: boolean;
  };
  servo_upGrade_percentage_total: number;
  servo_upGrade_percentage_axis: number;
  torque_sensor_state: number;
  admittance_enabled: number;
  scb_stick_locked: boolean;
  currToolId: number;
  currUsrFrameId: number;
  steppingWait: boolean;
  isCollectingDiagData: boolean;
  isSamplingTrajPoint: boolean;
  servoDebugEnable: boolean;
  profinetState: number;
  eip_state: number;
  upgFirmware: number;
  position_segTarget: any;
};
export type RobotType = {
  info: Robot;
  heart: RobotStatus;
  heartState: "init" | "running" | "failed";
};
export const initStore = () => {
  const params = {
    ref,
    reactive,
    name,
    defineStore,
  };
  (window as any)["common_utils"].appStore.initStore(params);
  (window as any)["common_utils"].robotStore.initStore(params);
};
export const useAppConfig = (): AppType => {
  return (window as any)["common_utils"].appStore.useStore(name);
};
export const useRobotStore = (): RobotType => {
  return (window as any)["common_utils"].robotStore.useStore(name);
};
export const initPoll = (r: Robot) => {
  const robot = useRobotStore();
  robot.info = r;
  (window as any)["common_utils"].robotStore.initPoll({
    robotIp: robot.info.robotIp,
  });
};
