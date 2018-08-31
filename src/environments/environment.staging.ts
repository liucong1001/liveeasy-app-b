import { Environment } from './environment.model';


export const ENV: Environment = {
  mode: 'beta',
  name:'beta',
  http:'https://beta-erp.zdfc.com/api/v1/', // https://erp.zdfc.com/api/v1/
  cHttp:'https://beta-c.zdfc.com/',         // https://q.zdfc.com/
  cmsHttp:'https://beta-cms.zdfc.com/',     // https://cms.zdfc.com/
  isProd:false,
  appKey:'',
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

