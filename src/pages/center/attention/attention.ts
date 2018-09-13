import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {PropertyProvider} from "../../../providers/property/property";
import {ToastComponent} from "../../../components/toast/toast";
import {HousinfoPage} from "../../housing/housinfo/housinfo";
import {ArryCodeValuePipe} from "../../../pipes/arry-code-value/arry-code-value";
import {ConfigProvider} from "../../../providers/config/config";

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

  localCode:any;
  cxJSON:Array<{name:string;val:string}>;
  tagsListPage =[];
  imgHeader: string; //线上图片默认头地址
  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorageProvider: LocalStorageProvider,
              public propertyProvider: PropertyProvider,public toast:ToastComponent, public configProvider: ConfigProvider,) {
    this.agentId = this.localStorageProvider.get('loginInfo')['user']['id'];
    //朝向
    this.localCode = this.localStorageProvider.get('codeData');
    this.cxJSON = new ArryCodeValuePipe().transform(this.localCode,'orientation');
    this.cxJSON.unshift({name:'全部',val:''});
    this.tagsListPage = new ArryCodeValuePipe().transform(this.localCode,'property_tag_desc');
    this.imgHeader = this.configProvider.set().img;
  }

  ionViewDidLoad() {
    this.search();
  }

  search(){
      this.pageData = [];
      this.propertyProvider.favoritePageList(1,).then(res=>{
         if(res.success){
           this.currentPage=1;this.hasData = true;
           this.pageResult =res.data&&res.data.result;
           for (let i = 0; i < res.data.result.length; i ++) {
             this.pageData.push(res.data.result[i]);
           }
         }else{  this.hasData = false;}
      })
  }

  all = false;
  pageResult :any;
  hasData = true;
  //上拉加载
  doInfinite(infiniteScroll) {


    infiniteScroll.complete();

    this.currentPage++;

    if (this.pageResult&&this.pageResult.length<10) {
      //如果都加载完成的情况，就直接 disable ，移除下拉加载
      //infiniteScroll.enable(false);
      //toast提示
      this.all = true;
    }else {
      this.all = false;
      if(this.pageResult ==''){this.all = true; return}
      this.propertyProvider.favoritePageList(this.currentPage).then(res => {
        this.pageResult =res.data&&res.data.result;
        console.log('pageResult',this.pageResult);
        if (res.data&&res.data.result) {
          for (let i = 0; i < res.data.result.length; i ++) {
            this.pageData.push(res.data.result[i]);
          }

          if(res.data.result<10){ this.all = true;}

        }else {
          this.all = true;
        }
      });
    }
    infiniteScroll.complete(function () {
      // console.log('数据请求完成');
    });

  }

  //房源标签转换（字符串转为数组）
  tagPipe(data) {
    if (data) {
      return data.split(",");
    }
  }
  //房源标签code转换为name
  tagName(code) {
    for (var i in this.tagsListPage) {
      if (code == parseFloat(this.tagsListPage[i].val) ) {
        return this.tagsListPage[i].name
      }
    }
  }
  pic(data) {
    if (data) {
      return JSON.parse(data).imagePath+this.configProvider.set().smSign
    }
  }
  cxPipe(data){
    for(var i in this.cxJSON){
      if(data == this.cxJSON[i].val){
        return this.cxJSON[i].name;
      }
    }
  }

  goHouseDetail(item) {
    /*  if(!this.addIcon){
          return
        }*/
    this.navCtrl.push(HousinfoPage,{propertyId:item.propertyId})
  }


  cancelFavo(item,i){

    this.propertyProvider.cancelFavorite(item.propertyId,this.agentId).then(res=>{
      if(res.success){
        this.pageData.splice(i,1);
        this.toast.msg('取消收藏成功!');
      }
    })
  }

}
