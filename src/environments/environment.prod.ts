/**
 * 正式包 配置   (页面实际使用 config 中配置 http)
 */
import { Environment } from './environment.model';
export const ENV: Environment = {
  mode: 'prod',
  name:'房贝',
  http:'https://erp.zdfc.com/api/v1',
  cHttp:'https://q.zdfc.com/',
  cmsHttp:'https://cms.zdfc.com/',
  isProd:true,
  appKey:'e862e663383d107fbbec515cd5064ec5',
  apiKey:'6890ebb9f1f855413e19dd14bd61eada',
  cordova:{
    "id":"tech.liveeasy.apps.agent",
    "version":"0.0.7",
    "name": "房贝",
    "ios":{
      "CodePushDeploymentKey": "CtefGSLBzBhhbftRvjE8ddqYIR9j89505932-72e4-46de-81fa-175372b59260"
    },
    "android":{
      "CodePushDeploymentKey":"_67l4A_Y9DN11GmLkc3Wk0rrPBxl89505932-72e4-46de-81fa-175372b59260"
    },
    "jpushKey":"3c4b19f05528b83aa4f720b2"
  }
};
