import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Searchbar} from 'ionic-angular';
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from '@angular/common/http';
import { Events } from 'ionic-angular';
import {PropertyProvider} from "../../providers/property/property";
import {HousingPage} from "../housing/housing";
import {HomePage} from "../home/home";
/**
 * Generated class for the AllsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allsearch',
  templateUrl: 'allsearch.html',
})
export class AllsearchPage {
  estateList:[any];//楼盘
  callback:any;
  search:any;
  timer:any; //获取焦点定时器
  @ViewChild('searchBar') searchBar:Searchbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,public addhouseProvider:AddhouseProvider,
              public localStorageProvider:LocalStorageProvider, public events: Events,public propertyProvider:PropertyProvider,
              private http:HttpClient) {
    this.search = navParams.get('floorName');

  }

  getData(data){
    var path = 'http://47.75.151.57:7077/live/search?keyword='+data+'&site=4201';
    return  this.http.get(path).toPromise().then(res=>{
      return res as any;
    });
  }
  floor = [];
  edit = false;
  getFloorKey(event){
    console.log('值',this.search);
    this.getData(this.search).then(res=>{
      this.floor = res.result;
      this.edit = true;

      if(this.search==''){
        this.edit =false;
      }

    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AllsearchPage');
    this.floorList = this.localStorageProvider.get('floorList');
    if(this.floorList ==null){this.floorList = []}
    console.log('历史',this.floorList);
  }
  //进入页面后执行
  ionViewDidEnter(){
    this.timer= setInterval(()=>{
      this.searchBar.setFocus();
    },0)
  }
  //页面离开
  ionViewCanLeave(){
    window.clearInterval(this.timer);
  }
  floorList :Array<any>;

  select(item){

    if(item&&this.floorList.indexOf(item.keyword)==-1){
      this.floorList.push(item.keyword);
      this.localStorageProvider.set('floorList',this.floorList);
    }

    this.navCtrl.pop().then(() => {
      // 发布 bevents事件
      this.events.publish('bevents', item);
    });
  }

  back(){
    this.navCtrl.pop();
  }

  chose(item){
    console.log('历史选择的',item);
    this.search = item;
    this.getFloorKey(item)
  }
}
