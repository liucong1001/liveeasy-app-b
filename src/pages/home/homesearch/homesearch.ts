import {Component, ViewChild} from '@angular/core';
import {IonicPage, ModalController, Navbar, NavController, NavParams, Searchbar} from 'ionic-angular';
import {AddhouseProvider} from "../../../providers/addhouse/addhouse";
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {HttpClient} from '@angular/common/http';
import { Events } from 'ionic-angular';
import {PropertyProvider} from "../../../providers/property/property";
import {HousingPage} from "../../housing/housing";
import {HomePage} from "../../home/home";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
/**
  首页楼盘搜索
 */

@IonicPage()
@Component({
  selector: 'page-homesearch',
  templateUrl: 'homesearch.html',
})
export class HomesearchPage {
  estateList:[any];//楼盘
  callback:any;
  search:any;
  timer:any; //获取焦点定时器
  @ViewChild('searchBar') searchBar:Searchbar;
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,public addhouseProvider:AddhouseProvider,
              public localStorageProvider:LocalStorageProvider, public events: Events,public propertyProvider:PropertyProvider,
              private http:HttpClient, public nativePageTransitions: NativePageTransitions,public modalCtrl: ModalController) {
    this.search = navParams.get('floorName');
  }


  floor = [];
  edit = false;

  getFloorKey(event){
    this.propertyProvider.searchFloor(this.search).then(res=>{
      if(res.success){
        this.floor = res.data.result;
        this.edit = true;
        if(this.search==''){
          this.edit =false;
        }
      }
    })
  }


  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad AllsearchPage');
    this.floorList = this.localStorageProvider.get('floorList');
    if(this.floorList ==null){this.floorList = []}
    console.log('历史',this.floorList);
  }
  //进入页面后执行
  ionViewDidEnter(){
    this.timer= setTimeout(()=>{
      this.searchBar.setFocus();
    },100);

    this.navBar.backButtonClick = () => {
       this.navCtrl.setRoot(HomePage)
    };
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
    this.navCtrl.push(HousingPage,{item:item,pageName:'HomesearchPage'});
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

  backButtonClick = (e: UIEvent) => {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 400,
      slowdownfactor: 3,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options)
      .then()
      .catch();
    this.navCtrl.pop({animate:false});
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

}
