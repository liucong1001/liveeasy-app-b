import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {HttpClient} from '@angular/common/http';
import {TabsPage} from "../tabs/tabs";
import {LoginProvider} from '../../providers/login/login'
import {LocalStorageProvider} from  '../../providers/local-storage/local-storage'
/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {
    username:string = 'mylangyi';
    password:string = '123456';
    url:string = "/login";
    constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,
                public loginProvider:LoginProvider,public localStorageProvider:LocalStorageProvider,
                ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AccountPage');
    }
    goLogin(){
        this.navCtrl.setRoot(LoginPage);
    }

    login(){
        this.loginProvider.login(this.username,this.password).then(res=>{
            this.navCtrl.setRoot(TabsPage);
            this.localStorageProvider.set('loginInfo',res.data);
            //QU
            this.localStorageProvider.set('loginName',res.data.loginName);
            this.localStorageProvider.set('phone',res.data.phone);
            this.localStorageProvider.set('photo',res.data.photo);
            this.localStorageProvider.set('ticket',res.ticket);
            console.log('数据',res);
        }).catch(err=>{
            alert('登录失败');
            console.log('失败',err.error.msg);
        })
    }

}
