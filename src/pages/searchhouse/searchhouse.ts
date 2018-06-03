import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HousedetailPage} from "../housedetail/housedetail";
import { Events } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-searchhouse',
  templateUrl: 'searchhouse.html',
})
export class SearchhousePage {


  estateList:[any];//楼盘
  callback:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public addhouseProvider:AddhouseProvider,
              public localStorageProvider:LocalStorageProvider, public events: Events) {
    // this.initializeItems();
    //楼盘列表
    this.addhouseProvider.estateListSelect().then(res=>{
      this.estateList = res.data.result;
      this.initializeItems();
      // console.log('楼盘',this.estateList);
    });
    this.callback = this.navParams.get("callback")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchhousePage');
  }

  items;
  initializeItems(){
      this.items = this.estateList;
  }
  getItems(ev){
    this.initializeItems();
    var val=ev.target.value;
    if(val&&val.trim()!=''){
      this.items=this.items.filter((item)=>{
        // return (item.toLowerCase().indexOf(val.toLowerCase())>-1)
        return (item.estateName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  select(item){
    // let param = item;
    // this.callback(param).then(()=>{
    //   this.navCtrl.pop();
    // });
    this.navCtrl.pop().then(() => {
      // 发布 bevents事件
      this.events.publish('bevents', item);
    });
  }

  back(){
    this.navCtrl.pop()
  }
}

