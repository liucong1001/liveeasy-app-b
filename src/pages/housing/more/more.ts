import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, Nav, NavController, NavParams, Navbar} from 'ionic-angular';
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {TabsPage} from "../../tabs/tabs";
import {HousingPage} from "../housing";
import {MyApp} from "../../../app/app.component"
import { NgZone  } from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {
  tagsList:any;
  tagsStr = [];
  orientation:any; //朝向
  //搜索数据
  searchMoreData = {
    tags:0,
    tagsArry:[],
    orientation:'',
    hasElevator:'',
  };
  @ViewChild(Navbar) navBar: Navbar;
  selected:any;
  selected2:any;
  rootPage:any = MyApp ;
  selected3:any;
  structure: any = {lower: 0, upper: 1000};
  constructor(public navCtrl: NavController, public navParams: NavParams,public localStorageProvider: LocalStorageProvider,
              public events: Events, private zone: NgZone,public statusBar: StatusBar,
              public nativePageTransitions: NativePageTransitions,) {

  }


  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    //标签
    this.tagsList=this.localStorageProvider.get('tagsList');
    console.log(this.tagsList);

    if(this.localStorageProvider.get('searchMoreData')){
      this.searchMoreData = this.localStorageProvider.get('searchMoreData');

    }
    console.log('进入 MorePage',this.searchMoreData);
  }

  initTags(item){
    if(this.searchMoreData.tagsArry.length>1){
      //初始化选中状态
      this.searchMoreData.tagsArry = this.searchMoreData.tagsArry;
      for(var i in this.searchMoreData.tagsArry ){
        if(item.tagCode == this.searchMoreData.tagsArry[i] ){
          item.active =true;
          return item.active;
        }
      }
    }
  }


  //更多
  //其他
  qtJSON = [
    {name:'只看我的房源',val:0},
    {name:'待处理关闭申请房源',val:1},
    {name:'待审核实勘房源',val:2},
    {name:'待确认钥匙房源',val:3},
  ];
  //朝向
  cxJSON = [
    {name:'全部',val:''},
    {name:'东',val:'1'},
    {name:'南',val:'2'},
    {name:'西',val:'3'},
    {name:'北',val:'4'},
    {name:'南北',val:'5'},
    {name:'双南',val:'6'},
    {name:'东西',val:'7'},
    {name:'东南',val:'8'},
    {name:'西南',val:'9'},
    {name:'东北',val:'10'},
    {name:'西北',val:'11'},
  ];

  //电梯
  dtJson = [
    {name:'全部',val:''},
    {name:'无',val:'0'},
    {name:'有',val:'1'},
  ];
  resetDiret(){
    return false;
  }
  // 房源标签
  choseTag(item){
    item.active = !item.active;
   if(item.active) {
     this.searchMoreData.tagsArry.push(item.tagCode);
   }else {
         var indexArry  = this.searchMoreData.tagsArry.indexOf(item.tagCode);
         if(indexArry>-1){this.searchMoreData.tagsArry.splice(indexArry,1)}
   }

   this.searchMoreData.tagsArry =this.searchMoreData.tagsArry;
   this.searchMoreData.tags =0;
   for(var i in this.searchMoreData.tagsArry){
      this.searchMoreData.tags+=this.searchMoreData.tagsArry[i];
   }

  }
  flag=false;
  //朝向 orientation
  choseDirect(item){
    this.selected = item
    this.searchMoreData.orientation  = item.val;
  }
  isActive(item) {
    if(item.val==this.searchMoreData.orientation){
      return  true;
    }else{
      return this.selected === item;
    }
  };
  //其他
  choseOther(item){
    this.selected2 = item;
  }
  //电梯
  choseDt(item){
    this.selected3 = item;
    this.searchMoreData.hasElevator=item.val;
    console.log(item.val)
  }



  isActive2(item){
    return this.selected2 === item;

  }
  isActive3(item){
    if(item.val==this.searchMoreData.hasElevator){
      return  true;
    }else{
      return this.selected === item;
    }
  }

  reset(){
     this.tagsList=this.localStorageProvider.get('tagsList');
     this.searchMoreData.tagsArry =[];
     this.searchMoreData.tags=0;
     //清除朝向
     this.choseDirect(this.cxJSON[0]);
     //清除
    this.choseDt(this.dtJson[0]);
     console.log('清除',this.searchMoreData);
     this.localStorageProvider.del('searchMoreData');
  }
  confirm(){
    console.log('确定',this.searchMoreData);
    this.localStorageProvider.set('searchMoreData',this.searchMoreData);
    this.navCtrl.pop().then(() => {
      // 发布 bevents事件
      this.events.publish('moreSearchBevents', this.searchMoreData);
    });
  }

  //------返回处理--------//
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
//状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
}
