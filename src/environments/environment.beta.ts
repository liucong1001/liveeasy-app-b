import { Environment } from './environment.model';


export const ENV: Environment = {
  mode: 'beta',
  name:'beta',
  http:'https://beta-erp.zdfc.com/api/v1/',
  cHttp:'https://beta-c.zdfc.com/',
  cmsHttp:'https://beta-cms.zdfc.com/',
  isProd:false,
  appKey:'9db9597481973c878648387bf30eaca0',
  apiKey:'14eca046de7309cd5125d4e3bdb1afd1',
  cordova:{
    "id":"tech.liveeasy.apps.agent",
    "version":"0.0.4",
    "name": "房贝",
    "ios":{
      "CodePushDeploymentKey": "CtefGSLBzBhhbftRvjE8ddqYIR9j89505932-72e4-46de-81fa-175372b59260"
    },
    "android":{
      "CodePushDeploymentKey":"_67l4A_Y9DN11GmLkc3Wk0rrPBxl89505932-72e4-46de-81fa-175372b59260"
    },
    "jpushKey":"8ef99aa89f5368b352b16cc3"
  }
};

