import { Component,ViewChild,NgZone} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams, Slides, Content, App, ViewController} from 'ionic-angular';
import {HousedetailPage} from "../housedetail/housedetail";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {HousmorePage} from "./housmore/housmore";
import {RolepeoplePage} from "../housedetail/rolepeople/rolepeople";
import {PropertyProvider} from "../../../providers/property/property";
import {PropertyModel} from "../../../model/property/property.model";
import { LoadingController, Loading } from 'ionic-angular';
import {ConfigProvider} from "../../../providers/config/config";
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {FollowPage} from "../follow/follow";
import {StatusBar} from "@ionic-native/status-bar";
import {RecordPage} from "../housedetail/record/record";
import {HomePage} from "../../home/home";
import {HousingPage} from "../housing";
import {ToastComponent} from "../../../components/toast/toast";
import {DescribePage} from "./describe/describe";
import { ControlAnchor, NavigationControlType,BaiduMapModule,} from 'angular2-baidu-map';
import {AuditPage} from "./audit/audit";
import {ArryCodeValuePipe} from "../../../pipes/arry-code-value/arry-code-value";
// import {BaiduMapModule } from "angular2-baidu-map";

/**
房源详情页面
 */

@IonicPage()
@Component({
  selector: 'page-housinfo',
  templateUrl: 'housinfo.html',
  styles: [`
        baidu-map{
            width: 100%;
            height: 300px;
            display: block;
        }
    `]
})
export class HousinfoPage {
  data:any;
  houseData:PropertyModel;
  letteratorneyData:any;
  keyData:any;
  imgHeader: string;
  tagsListPage =[];
  propertyId:string;
  @ViewChild('navbar') navBar: Navbar;
  // @ViewChild(Content) content: Content;
  classFlag=false;
  opts:any;//百度地图
  localCode:any;
  cxJSON:Array<{name:string;val:string}>;
  buzzTypeJson:Array<{name:string;val:string}>;
  decorationJson:Array<{name:string;val:string}>;
  buildingTypeJson:Array<{name:string;val:string}>;
  floorJSON:Array<{name:string;val:string}>;
  modals=false;
  testHeader=false;
  constructor(public navCtrl: NavController, public toast:ToastComponent,public viewCtrl: ViewController,
              public navParams: NavParams,public nativePageTransitions: NativePageTransitions,
              public propertyProvider: PropertyProvider, public loadingCtrl: LoadingController,public configProvider: ConfigProvider,
              public localStorageProvider: LocalStorageProvider,public statusBar: StatusBar,public ngzone:NgZone,public app: App
              ) {
    this.tagsListPage = this.localStorageProvider.get('tagsListPage');
    this.localCode = this.localStorageProvider.get('codeData');
this.modals=navParams.get('modals');
    this.cxJSON = new ArryCodeValuePipe().transform(this.localCode,'orientation');
    this.buzzTypeJson = new ArryCodeValuePipe().transform(this.localCode,'buzz_type');
    this.decorationJson = new ArryCodeValuePipe().transform(this.localCode,'decoration');
    this.buildingTypeJson = new ArryCodeValuePipe().transform(this.localCode,'building_type');
    this.floorJSON=new ArryCodeValuePipe().transform(this.localCode,'building_height_type');

    if(this.modals == false){
      this.modals=true;
    }
  }
  @ViewChild("header") header;
  scrollHandler(e) {
    // if((e.scrollTop / 150).toFixed(2)){
    //
    //
    // }else {
    //   this.testHeader=false;
    // }

    let opacity = +(e.scrollTop / 150).toFixed(2);
    console.log(opacity)
    if(opacity>0){
      this.testHeader=true;
      opacity = opacity > 1 ? 1 : opacity;
      this.header._elementRef.nativeElement.style.background = `rgba(26,179,148,${opacity})`;
    }else {
      this.testHeader=false;
    }

  }

  flag=false;
  fyDescribe=false;

  @ViewChild('mySlider') slider:Slides;
    mySlideOptions={
      autoplay:3000,
      initialSlide:0,
      pager:true,
      loop:true,
      speed:300
    };
  imgJson :any; //实勘图
  letteratorneyImgJson:any;
  keyImgJson:any;


  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();

  }
  ionViewDidLoad() {
    this.imgHeader = this.configProvider.set().img;


    setInterval(()=>{
      this.slider.slideNext(300,true);
    },2000);

    console.log('ionViewDidLoad HousinfoPage');

 if(this.navParams.get('item')){
   //如果是从列表页过来  直接传递数据 不请求 （一次调用详情接口）
     this.houseData = this.navParams.get('item');
     console.log(this.houseData)
     this.propertyId = this.houseData.propertyId;
     if(this.navParams.get('item').propertyPics){
       this.imgJson = JSON.parse(this.navParams.get('item').propertyPics);
     }
 }else if(this.navParams.get('propertyId')){
     this.propertyProvider.getRecord(this.navParams.data.propertyId).then(res=>{
         if(res.success){
           this.houseData=res.data;
           console.log(this.houseData)
           this.propertyId = this.houseData.propertyId;
           if(res.data.propertyPics){
             this.imgJson = JSON.parse(res.data.propertyPics);
           }
         }
     });
 }


    //  //业主委托书
    // this.propertyProvider.adetail(this.propertyId).then(res=>{
    //   if(res.success&&res.data ){
    //     this.letteratorneyData = JSON.parse(JSON.stringify(res.data.content));
    //     console.log('业主委托书',this.letteratorneyData);
    //   }
    // });
    // //钥匙信息
    // this.propertyProvider.keydetail(this.propertyId).then(res=>{
    //     if(res.success&&res.data){
    //       // this.keyData = res.data.content;
    //       // this.keyData = JSON.parse(this.keyData.toString());
    //       this.keyData = JSON.parse(JSON.stringify(res.data.content));
    //     }
    // });
    // this.propertyProvider.shikanDetail(this.propertyId).then();
    // this.propertyProvider.getPropertyPics(this.propertyId).then();

    //baidu map
    this.opts = {
      // 地图中心坐标
      center: {
        longitude: 116.4177150000,
        latitude: 40.0612540000
      },
      zoom: 17,
      // 地图上的坐标
      markers: [{
        longitude: 116.4177150000,
        latitude: 40.0612540000,
        title: '华泰汽车集团',
        content: '朝阳区立水桥',
        autoDisplayInfoWindow: true
      }],
      geolocationCtrl: {
        anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
      },
      scaleCtrl: {
        anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
      },
      overviewCtrl: {
        isOpen: true
      },
      navCtrl: {
        type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
      }
    };

    // this.offlineOpts = {
    //   retryInterval: 5000,
    //   txt: '没有网络'
    // };
  }


  // 刚加载加载地图信息
  loadMap(e:any) {
    console.log(e);
  }

  // 单机地图坐标, 打印信息
  clickMarker(marker:any) {
    console.log(marker);
  }



  //进入页面后执行
  ionViewDidEnter(){
    this.navBar.backButtonClick = () => {
      console.log('刷新reloadpage',this.navParams.get('notReloadPage'),);
      if(this.app.getActiveNavs()[0]['index']==1){
        if(this.navParams.get('notReloadPage')){
          // this.navCtrl.pop();
          this.navCtrl.parent.select(1);
        }else {
          // this.navCtrl.push(HousingPage);
          // this.navCtrl.popToRoot();
          this.navCtrl.parent.select(1);
          this.navCtrl.setRoot(HousingPage);
        }
      }
      //从首页搜索楼盘进入
      if(this.app.getActiveNavs()[0]['index']==0){
        if(this.navParams.get('notReloadPage')){
          this.navCtrl.pop();
          // this.navCtrl.parent.select(1);
        }else {
          // this.navCtrl.push(HousingPage);
          // this.navCtrl.popToRoot();
          this.navCtrl.parent.select(1);
          this.navCtrl.setRoot(HousingPage);
        }
      }

    };
  }


//通用转换
  houseInfoPipe(data,Arry){
      for(var i in Arry){
        if(data == Arry[i].val ){
          return Arry[i].name
        }
      }
  }

  goMore(){
     this.openWin(HousmorePage,{item:this.houseData});
  }

  edit(){
    this.openWin(HousedetailPage,{propertyId:this.propertyId});
  }

  rolepeople(){
    this.openWin(RolepeoplePage,{propertyid:this.propertyId});
  };
  goAudit(){
    this.openWin(AuditPage,{houseInfo:this.navParams.get('item')});
  }
  //跟进
  goFollow(){
    this.openWin(FollowPage,{
      item:this.houseData
    })
  }
  //记录
  record(){
    this.openWin(RecordPage,{
      item:this.houseData
    });
  }

  //房源标签转换（字符串转为数组）
  tagPipe(data) {
    if (data) {
      return data.split(",");
    }
  }
  tip(){
    this.toast.msg('此功能暂未开发');
  }
  //房源标签code转换为name
  tagName(code) {
    for (var i in this.tagsListPage) {
      if (code == parseFloat(this.tagsListPage[i].val) ) {
        return this.tagsListPage[i].name
      }
    }
  }

  orentationPipe(data){
    for(var i in this.cxJSON){
       if(data == this.cxJSON[i].val){
          return this.cxJSON[i].name;
       }
    }
  }

  //均价处理
  unitPrice(data){
    var perPrice;
    if(data.propertyPriceUnit==1){
      perPrice = data.propertyPrice*10000/data.spaceSize;
    }else if(data.propertyPriceUnit==2){
      perPrice = data.propertyPrice/data.spaceSize;
    }
    return perPrice.toFixed(2);
  }

  //楼层等级处理
  floorPipe(data){
    for(var i in this.floorJSON){
      if(data == this.floorJSON[i].val){
        return this.floorJSON[i].name;
      }
    }
  }

  //房源描述
  describes(){
    this.openWin(DescribePage,{
    item:this.houseData,
    })
  }

  //标签列表字段中是否存在“某个”房源标签
  ishasTag(data,dataList,item){
    if(dataList){
      var arry = dataList.split(",");
      var arryNoSpace = [];
      for (var i in arry){
        arryNoSpace.push(arry[i].trim().replace(/\s/g,"")); //去掉标签数组中的空格
      }
      if(arryNoSpace.indexOf(data)!=-1){
        return true
      }else {
        return false;
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
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

}
