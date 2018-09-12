import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {PropertyProvider} from "../../../providers/property/property";
import {ToastComponent} from "../../../components/toast/toast";
import {HousinfoPage} from "../../housing/housinfo/housinfo";

/**
 * Generated class for the AttentionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attention',
  templateUrl: 'attention.html',
})
export class AttentionPage {

  agentId:string;
  currentPage:number;
  pageData:Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorageProvider: LocalStorageProvider,
              public propertyProvider: PropertyProvider,public toast:ToastComponent) {
    this.agentId = this.localStorageProvider.get('loginInfo')['user']['id'];
  }

  ionViewDidLoad() {
    this.search();
  }

  search(){
      this.pageData = [];
      this.propertyProvider.favoritePageList(1,{agentId:this.agentId}).then(res=>{
         if(res.success){
           this.currentPage=1;
           for (let i = 0; i < res.data.result.length; i ++) {
             this.pageData.push(res.data.result[i]);
           }
         }
      })
  }


  //上拉加载
  doInfinite(infiniteScroll) {

/*
    infiniteScroll.complete();

    this.currentPage++;

    if (this.pageResult&&this.pageResult.length<10) {
      //如果都加载完成的情况，就直接 disable ，移除下拉加载
      //infiniteScroll.enable(false);
      //toast提示
      this.all = true;
    }else {
      this.all = false;
      if(this.pageResult ==''){return};
      this.propertyProvider.pageSearch(this.currentPage,this.params,'propQuery').then(res => {
        this.pageResult =res.data&&res.data.result;
        if (res.data&&res.data.result) {
          for (let i = 0; i < res.data.result.length; i ++) {
            this.pageData.push(res.data.result[i]);
          }
        }else {
          this.all = true;
        }
      });
    }
    infiniteScroll.complete(function () {
      // console.log('数据请求完成');
    });*/

  }
  goHouseDetail(item) {
    /*  if(!this.addIcon){
          return
        }*/
    this.navCtrl.push(HousinfoPage,{propertyId:item.propertyId})
  }


  cancelFavo(propertyId){
    this.propertyProvider.cancelFavorite(propertyId,this.agentId).then(res=>{
      if(res.success){
        this.toast.msg('取消收藏成功!');
      }
    })
  }

}
