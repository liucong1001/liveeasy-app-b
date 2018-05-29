import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddpassengerPage } from '../addpassenger/addpassenger';
import { PassengerdetailPage } from '../passengerdetail/passengerdetail';
import { PassengerlookPage } from './../passengerlook/passengerlook';
import { PassengerfollowPage } from './../passengerfollow/passengerfollow';
import { CloseprivateguestPage } from '../closeprivateguest/closeprivateguest';
import {CustomerProvider} from "../../providers/customer/customer";
/**
 * Generated class for the MypassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mypassenger',
  templateUrl: 'mypassenger.html',
})
export class MypassengerPage {
  show=false;
  houseType=false;
  more=false;
  pop=false;

  pageData = [];
  totalPages:number;//总页数
  constructor(public navCtrl: NavController, public navParams: NavParams,private customerProvider:CustomerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypassengerPage');
    this.customerProvider.page(1).then(res=>{
      this.pageData = res.data.result;
      this.totalPages = res.data.totalPages;
    });
  }

  //条数
  currentPage:number =1;
  //下拉加载
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
      this.currentPage++;
      console.log('加载完成后，关闭刷新',this.currentPage);
      this.customerProvider.page(this.currentPage).then(res=>{
        for(let i=0;i<res.data.result.length;i++){
          this.pageData.push(res.data.result[i]);
        }
      });

      if(this.currentPage >=this.totalPages){
        //如果都加载完成的情况，就直接 disable ，移除下拉加载
        infiniteScroll.enable(false);
        //toast提示
        alert("已加载所有");
      }
      console.log('Async operation has ended');
      infiniteScroll.complete(function () {
        console.log('数据请求完成');
      });
    }, 1000);

  }

  //menu
  showMenu1(){
    if(this.show==false || this.houseType == true || this.more == true ){
      this.show=true;
      this.pop=true;
      this.houseType = false;
      this.more=false;
    }else{
      this.show=false;
      this.pop=false;
    }
  }
  showMenu2(){
    if(this.houseType==false || this.show == true || this.more == true ){
      this.houseType=true;
      this.show=false;
      this.pop=true;
      this.more = false;
    }else{
      this.houseType = false;
      this.pop=false;
    }
  }
  showMenu3(){
    if(this.more==false || this.show == true || this.houseType == true){
      this.more=true;
      this.show=false;
      this.pop=true;
      this.houseType = false;
    }else{
      this.more = false;
      this.pop=false;
    }
  }
  pops(){
    if(this.more==true || this.show == true || this.houseType == true){
      this.more=false;
      this.show=false;
      this.pop=false;
      this.houseType = false;
    }
  }
  addpassenger(){
    this.navCtrl.push(AddpassengerPage)
  }
  gopassengerDetail(){
    this.navCtrl.push(PassengerdetailPage);
  }
  goFollow(){
    this.navCtrl.push(PassengerfollowPage)
  }
  golook(){
    this.navCtrl.push(PassengerlookPage)
  }
  closePrivateGuest(){
    this.navCtrl.push(CloseprivateguestPage)
  }
}
