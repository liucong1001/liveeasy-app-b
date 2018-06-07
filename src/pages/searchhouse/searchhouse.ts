import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HousedetailPage} from "../housedetail/housedetail";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Events } from 'ionic-angular';
import {PropertyProvider} from "../../providers/property/property";
@IonicPage()
@Component({
  selector: 'page-searchhouse',
  templateUrl: 'searchhouse.html',
})
export class SearchhousePage {


  estateList:[any];//楼盘
  callback:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public addhouseProvider:AddhouseProvider,
              public localStorageProvider:LocalStorageProvider, public events: Events,public propertyProvider:PropertyProvider,
              private http:HttpClient) {
    // this.initializeItems();
    console.log('翔哥');
    // var path = ;

    //楼盘列表
    this.addhouseProvider.estateListSelect().then(res=>{
      this.estateList = res.data.result;
      this.initializeItems();
      // console.log('楼盘',this.estateList);
    });
    this.callback = this.navParams.get("callback");
    //专用版搜索   private


   // this.propertyProvider.searchFloor('11').then();

  }

  getData(data){
    var path = 'http://47.75.151.57:7077/live/search?keyword='+data+'&site=4200';
    return  this.http.get(path).toPromise().then(res=>{
      return res as any;
    });
  }
  floor = [];
  getFloorKey(event){
    console.log('event',event.data);

    this.getData(event.data).then(res=>{
      this.floor = res.result;
    })
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
    this.navCtrl.pop().then(() => {
      // 发布 bevents事件
      this.events.publish('bevents', item);
    });
  }

  back(){
    this.navCtrl.pop()
  }
}

