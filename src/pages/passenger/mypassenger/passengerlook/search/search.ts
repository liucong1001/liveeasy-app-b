import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, Navbar, NavController, NavParams, Searchbar} from 'ionic-angular';;
import {HttpClient} from '@angular/common/http';
import { Events } from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {CustomerProvider} from "../../../../../providers/customer/customer";
import {LocalStorageProvider} from "../../../../../providers/local-storage/local-storage";
import {StatusBar} from "@ionic-native/status-bar";
/**
 我的客源-约看-楼盘搜索
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  estateList:[any];//楼盘
  callback:any;
  search:any;
  timer:any; //获取焦点定时器
  @ViewChild('searchBar') searchBar:Searchbar;
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController,
              public navParams: NavParams, public customerProvider:CustomerProvider,public localStorageProvider:LocalStorageProvider,
              public events: Events,private http:HttpClient, public nativePageTransitions: NativePageTransitions,
              public modalCtrl: ModalController,public statusBar: StatusBar
  ) {
    this.search = navParams.get('floorName');
  }

  getData(data){
    return  this.customerProvider.lookSearch(data).then(res=>{
      return res as any;
    });
  }
  floor = [];
  edit = false;
  getFloorKey(event){
    this.getData(this.search).then(res=>{
      if(res.data){
        this.floor = res.data;
        this.edit = true;
        if(this.search==''){
          this.edit =false;
          this.floor=[];
        }
      }else {
        this.floor=[];
      }

    })
  }


  ionViewDidLoad() {
    this.propertyList = this.localStorageProvider.get('propertyList');
    if(this.propertyList ==null){this.propertyList = []}
  }
  //进入页面后执行
  ionViewDidEnter(){
    this.timer= setTimeout(()=>{
      this.searchBar.setFocus();
    },100);
  }
  //页面离开
  ionViewCanLeave(){
    window.clearInterval(this.timer);
  }
  propertyList :Array<any>;

  // propertyList
  select(item){
    if(item&&this.propertyList.indexOf(item.estateName)==-1){
      this.propertyList.push(item.estateName);
      this.localStorageProvider.set('propertyList',this.propertyList);
    }
    this.navCtrl.pop().then(() => {
      // 发布 bevents事件
      this.events.publish('bevents', item);
    });
  }


  onClear(event){
    this.search = '';
  }

  back(){
    this.navCtrl.pop({animate:false});
  }

  chose(item){
    console.log('历史选择的',item);
    this.search = item;
    this.getFloorKey(item)
  }


  //------跳转页面过渡--------//
  openWin(goPage, param = {}) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: -1,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage, param, {animate:false});
  }
  //状态栏黑色字体
  ionViewWillEnter() {
    this.statusBar.styleDefault();
  }

}
