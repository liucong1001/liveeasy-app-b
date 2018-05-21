import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  本地存储服务
*/
@Injectable()
export class LocalStorageProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LocalStorageProvider Provider');
  }
    get(key: string) {
        try {
            JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return null;
        }
        return JSON.parse(localStorage.getItem(key));
    }
    set(key: string, data: any) {
        if (data) {
            return localStorage.setItem(key, JSON.stringify(data));
        } else {
            return false;
        }
    }
    has(key: string) {
        return localStorage.getItem(key) !== null;
    }
    del(key: string) {
        return localStorage.removeItem(key);
    }
    clear() {
        return localStorage.clear();
    }

}
