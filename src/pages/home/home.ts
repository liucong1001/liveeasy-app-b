import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MsgdetailPage } from '../msgdetail/msgdetail';
import {HomeProvider} from "../../providers/home/home";
import {AddhousePage} from "../addhouse/addhouse";
import {AddpassengerPage} from "../addpassenger/addpassenger";
import {DeclarationPage} from "../declaration/declaration";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  associate=false;
  pop=false;
  notificationNews = [];
  constructor(public navCtrl: NavController,public homeProvider:HomeProvider) {
    // // 测试接口
    // this.homeProvider.test().then(res=>{
    //   console.log('test成功',res);
    // }).catch(err=>{
    //   console.log('test失败',err);
    // });
    // // pagelist接口
    // this.homeProvider.pageList().then();
    //   this.homeProvider.cpageList({a:'ad',name:'liu'}).then();
    //   this.homeProvider.gpageList({a:'11',b:'22'}).then();

       this.homeProvider.getNotification().then(res=>{
           this.notificationNews = res.data.result;
       });
    this.initializeItems()
  }
  addhouse(){
    this.navCtrl.push(AddhousePage)
  }
  addpassenger(){
    this.navCtrl.push(AddpassengerPage)
  }
  msgDetail(){
    this.navCtrl.push(MsgdetailPage)
  }

  godeclara(){
  this.navCtrl.push(DeclarationPage)
}
//搜索
  items;
  initializeItems(){
    this.items=[
      'Amsterdam',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      'Dhaka',
      'Edinburgh',
      'Uelzen',
      'Washington'
    ]
  }
  getItems(ev){
    this.initializeItems();
    var val=ev.target.value;
    this.associate=true;
    this.pop=true;
    if(val&&val.trim()!=''){
      this.items=this.items.filter((item)=>{
        return (item.toLowerCase().indexOf(val.toLowerCase())>-1)
      })
    }
  }
  pops(){
    this.pop=false;
    this.associate=false;
  }
}
