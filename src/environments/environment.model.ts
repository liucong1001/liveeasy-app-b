export interface Environment {
  mode: string,
  name:string;
  http:string;
  cHttp:string;
  cmsHttp:string;
  isProd:boolean;
  appKey:string;
  apiKey:string;
  cordova:object;
}
