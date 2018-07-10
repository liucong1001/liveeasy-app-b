import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LocalStorageProvider} from './../local-storage/local-storage'
/*
 app项目权限控制
*/
@Injectable()
export class PermissionProvider {
  permissionList:Array<any>;
  constructor(public http: HttpClient,private localStorageProvider:LocalStorageProvider) {
    console.log('Hello PermissionProvider Provider');
    this.permissionList = this.localStorageProvider.get('permissionArry');
  }

  /**
   * 权限标识存在返回true ，不存在返回false
   * @param data
   * @returns {boolean}
   */
  has(data){
     if(this.permissionList.indexOf(data)!=-1){
       console.log('存在',data);
        return true
     }else {
       console.log('不存在',data);
       return false
     }
  }


}
