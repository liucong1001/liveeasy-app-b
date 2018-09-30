/**
 * 测试包 配置
 */

import { Environment } from './environment.model';

export const ENV: Environment = {
  mode: 'dev',
  name:'测试版',
  http:'https://beta-erp.zdfc.com/api/v1',
  cHttp:'https://beta-c.zdfc.com/',
  cmsHttp:'https://beta-cms.zdfc.com/',
  isProd:false,
  appKey:'9db9597481973c878648387bf30eaca0',
  apiKey:'14eca046de7309cd5125d4e3bdb1afd1',
  cordova:{
    "id":"tech.liveeasy.apps.agent",
    "version":"0.0.7",
    "name": "房贝",
    "ios":{
      "CodePushDeploymentKey": "CtefGSLBzBhhbftRvjE8ddqYIR9j89505932-72e4-46de-81fa-175372b59260"
    },
    "android":{
      "CodePushDeploymentKey":"U_5b-roJeJblAgAhox14M1I61Qcw1d3c396e-55f7-4543-bbac-85cd7a1e8cc5"
    },
    "jpushKey":"5c9844642cc40dde038a0d3d"
  }
};
