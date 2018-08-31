export interface Environment {
  mode: string,
  name:string;
  http:string;
  cHttp:string;
  cmsHttp:string;
  isProd:boolean;
  appKey:string;
  cordova:object;
}
