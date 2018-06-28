import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams, Searchbar} from 'ionic-angular';
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from '@angular/common/http';
import { Events } from 'ionic-angular';
import {PropertyProvider} from "../../providers/property/property";
import {HousingPage} from "../housing/housing";
import {HomePage} from "../home/home";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
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
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,public addhouseProvider:AddhouseProvider,
              public localStorageProvider:LocalStorageProvider, public events: Events,public propertyProvider:PropertyProvider,
              private http:HttpClient, public nativePageTransitions: NativePageTransitions,) {
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
    this.navBar.backButtonClick = this.backButtonClick;
    console.log('ionViewDidLoad AllsearchPage');
    this.floorList = this.localStorageProvider.get('floorList');
    if(this.floorList ==null){this.floorList = []}
    console.log('历史',this.floorList);
  }
  //进入页面后执行
  ionViewDidEnter(){
    this.timer= setInterval(()=>{
      this.searchBar.setFocus();
    },0);
    this.navBar.backButtonClick = () => {
        this.navCtrl.pop({animate:false});
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

    this.navCtrl.pop().then(() => {
      // 发布 bevents事件
      this.events.publish('bevents', item);
    });
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
