/**
 * 正式包 配置   (页面实际使用 config 中配置 http， isProd开关)
 */
import { Environment } from './environment.model';
export const ENV: Environment = {
  mode: 'Production',
  name:'正式版',
  http:'https://erp.zdfc.com/api/v1/',
  cHttp:'https://q.zdfc.com/',
  cmsHttp:'https://cms.zdfc.com/',
  isProd:true,
  appKey:'e862e663383d107fbbec515cd5064ec5'
};
