/**
 * 测试包 配置
 */

import { Environment } from './environment.model';

export const ENV: Environment = {
  mode: 'dev',
  name:'测试版',
  http:'https://beta-erp.zdfc.com/api/v1/',
  cHttp:'https://beta-c.zdfc.com/',
  cmsHttp:'https://beta-cms.zdfc.com/',
  isProd:false,
  appKey:'9db9597481973c878648387bf30eaca0'
};
