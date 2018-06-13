import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {AddhouseProvider} from "../../../../providers/addhouse/addhouse";
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import {HousedetailPage} from "../housedetail";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Events } from 'ionic-angular';
import {PropertyProvider} from "../../../../providers/property/property";
@IonicPage()
@Component({
  selector: 'page-searchhouse',
  templateUrl: 'searchhouse.html',
})
export class SearchhousePage {


  estateList:[any];//楼盘
  callback:any;
  search:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public addhouseProvider:AddhouseProvider,
              public localStorageProvider:LocalStorageProvider, public events: Events,public propertyProvider:PropertyProvider,
              private http:HttpClient) {

    //默认楼盘展示
  }

  getData(data){
    var path = 'http://47.75.151.57:7077/live/search?keyword='+data+'&site=4201';
    return  this.http.get(path).toPromise().then(res=>{
      return res as any;
    });
  }
  edit = false;
  floor = [];
  getFloorKey(event){
    console.log('mode',event);
    this.getData(event).then(res=>{
      this.floor = res.result;
      this.edit = true;
      if(this.search==''){
        this.edit =false;
      }
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchhousePage');
   this.floorList = this.localStorageProvider.get('floorList');
   if(this.floorList ==null){this.floorList = []}
   console.log('历史',this.floorList);
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

  floorList :Array<any>;
  select(item){
    // console.log('选择的',item.keyword);

    // if(this.textArrt.indexOf(name) == -1){
    //   this.textArrt.push(name);
    //   console.log('名字',this.textArrt);
    //   return true;
    // }else {
    //   return false;
    // }

    if(this.floorList.indexOf(item.keyword)==-1){
      this.floorList.push(item.keyword);
      this.localStorageProvider.set('floorList',this.floorList);
    }


    this.navCtrl.pop().then(() => {
      // 发布 bevents事件
      this.events.publish('bevents', item);
    });
  }

  back(){
    this.navCtrl.pop()
  }

  chose(item){
    console.log('历史选择的',item);
       this.search = item;
       this.getFloorKey(item)
  }
}

