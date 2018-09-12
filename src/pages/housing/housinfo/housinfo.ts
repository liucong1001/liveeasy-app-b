import { Component,ViewChild,NgZone} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams, Slides, Content, App, ViewController, Events} from 'ionic-angular';
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
// import {NativeProvider} from "../../../providers/native/native";
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
  letteratorneyDataContent:any;
  keyData:any;
  keyDataContent:any;
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
  ModalCmp = false;
  isFavoStatus:boolean = false;
  constructor(public navCtrl: NavController, public toast:ToastComponent,public viewCtrl: ViewController,
              public navParams: NavParams,public nativePageTransitions: NativePageTransitions,
              public propertyProvider: PropertyProvider, public loadingCtrl: LoadingController,
              public configProvider:ConfigProvider,
              public localStorageProvider: LocalStorageProvider,public statusBar: StatusBar,public ngzone:NgZone,                             public app: App,public events: Events
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
    let opacity = +(e.scrollTop / 150).toFixed(2);
    if(opacity>0){
      this.testHeader=true;
      opacity = opacity > 1 ? 1 : opacity;
      // this.header._elementRef.nativeElement.style.background = `rgba(26,179,148,${opacity})`;
    }else {
      this.testHeader=false;
    }
  }

  flag=false;
  fyDescribe=false;


  @ViewChild('mySlider') slider:Slides;
  @ViewChild('mySlider1') slider1:Slides;
    mySlideOptions={
      autoplay:5000,
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
  imgSign:any;
  smImgSign:any;
  ionViewDidLoad() {
    this.imgHeader = this.configProvider.set().img;
    this.imgSign = this.configProvider.set().imgSign;
    this.smImgSign = this.configProvider.set().smSign;
    setInterval(()=>{
      this.slider&&this.slider.slideNext(300,true);
      this.slider1&&this.slider1.slideNext(300,true);
    },2000);
    this.propertyId = this.navParams.get('propertyId');
    this.getHouseData(this.propertyId,true);
    if(this.navCtrl.last()&&this.navCtrl.last().name=='ModalCmp'){
      this.ModalCmp = true;
    }
  }

  getHouseData(propertyId,isloading){
    let loading = this.loadingCtrl.create({
      content: '数据加载中...'
    });
   isloading&&loading.present();
    this.propertyProvider.getRecord(propertyId).then(res=>{
      this.houseData=res.data;
      this.imgJson =[];
      //实勘图
      this.imgJson = this.houseData&&this.houseData['propertyPics']&&JSON.parse(this.houseData['propertyPics']);
      //钥匙信息
      // this.keyData = this.houseData&&this.houseData['keyPics']&&JSON.parse(this.houseData['keyPics']);
      // 业主委托书
      // this.letteratorneyData =this.houseData&&this.houseData['attorneyPics']&&JSON.parse(this.houseData['attorneyPics']);
      isloading&&loading&&loading.dismiss();
      //关注状态
      this.isFavoStatus = this.houseData.favoriteProperties;



    }).catch(err=>{
      isloading&&loading&&loading.dismiss();
      this.toast.error('查询失败');
    });
   //钥匙详情信息
    this.propertyProvider.keydetail(propertyId).then(res=>{
      if(res.success&&res.data){
        this.keyData =res.data ;
        this.keyDataContent =JSON.parse(res.data.content);
      }
    });
  // 业主委托书详情
    this.propertyProvider.adetail(propertyId).then(res => {
      if(res.success){
        this.letteratorneyData=res.data;
        this.letteratorneyDataContent =JSON.parse(res.data.content);
      }
    });

  }




  //进入页面后执行
  ionViewDidEnter(){
    this.navBar.backButtonClick = () => {
      // console.log('刷新reloadpage',this.navParams.get('notReloadPage'),this.app.getActiveNavs()[0]['index']);
      if(this.app.getActiveNavs()[0]['index']==1){
/*      if(!this.navParams.get('notReloadPage')){
           this.navCtrl.popToRoot()
          // this.navCtrl.parent.select(1);
        }else {
          this.navCtrl.parent.select(1);
          this.navCtrl.setRoot(HousingPage);
          // this.navCtrl.popToRoot()
        }*/
       this.navCtrl.popToRoot()
      }else if(this.app.getActiveNavs()[0]['index']==0){    //从首页搜索楼盘进入
        this.navCtrl.pop()
/*        if(this.navParams.get('notReloadPage')){
          this.navCtrl.pop();
          // this.navCtrl.parent.select(1);
        }else {
          this.navCtrl.parent.select(1);
          this.navCtrl.setRoot(HousingPage);
        }
      }else {
        this.navCtrl.parent.select(1);
        this.navCtrl.setRoot(HousingPage);*/
      }else {
        this.navCtrl.pop()
      }

      // if(this.app.getActiveNavs()[0]['index']==0){
      //   if(this.navParams.get('notReloadPage')){
      //     this.navCtrl.pop();
      //     // this.navCtrl.parent.select(1);
      //   }else {
      //     // this.navCtrl.push(HousingPage);
      //     // this.navCtrl.popToRoot();
      //     this.navCtrl.parent.select(1);
      //     this.navCtrl.setRoot(HousingPage);
      //   }
      // }

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
    this.events.subscribe('bevents',(params)=>{
      console.log('接受数据',params); //propertyId
      this.getHouseData(params.propertyId,false);
      this.events.unsubscribe('bevents');
    });
    this.openWin(HousedetailPage,{propertyId:this.propertyId,item:this.houseData});
  }

  rolepeople(){
    this.openWin(RolepeoplePage,{propertyid:this.propertyId});
  };
  goAudit(){
    this.openWin(AuditPage,{houseInfo:this.houseData});
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
  //房源标签code转换为name 32768
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
    var perPrice ;
    if(data&&data.propertyPriceUnit&&data.propertyPriceUnit==1){
      perPrice = data.propertyPrice*10000/data.spaceSize;
    }else if(data&&data.propertyPriceUnit&&data.propertyPriceUnit==2){
      perPrice = data.propertyPrice/data.spaceSize;
    }
    return perPrice&&perPrice.toFixed(2);
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

  descForAPP(data){
   return   data.replace(/\n/ig, '<br/>');
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * 去掉 门牌图
   * @param data
   * @returns {any[]}
   */
  imgList(data){
    var arry = [];
     for(let item of data){
        if(item.position!='add1'){
          arry.push(item)
        }
     }
     return arry
  }
  // 异常单价
  errorPrice(data,price,size,unit){
    if(data&&data[unit]==1){
       return  (data[price]*10000/data[size]).toFixed(2)
    }else if (data[unit]==2){
      return  (data[price]*1/data[size]).toFixed(2)
    }
  }
  //添加关注
  addFavo(){
    console.log('房源id',this.localStorageProvider.get('loginInfo')['user']['id']);

    // const agentId= this.localStorageProvider.get('loginInfo')['user']['id'];
    const  data ={
      propertyId:this.houseData.propertyId,
      agentId:this.localStorageProvider.get('loginInfo')['user']['id'],
      adminDivisionCode:this.houseData.adminDivisionCode,
      estateId:this.houseData.estateId,
      createTime: new Date().getTime() ,
    };
    console.log('参数',data);
    this.propertyProvider.addFavorite(data).then(res=>{
        if(res.success){
          this.isFavoStatus = true;
          this.toast.msg('收藏成功');
        }
    });

  }
  isFavo(){
    console.log('是否关注');
    this.propertyProvider.isFavorite(this.houseData.propertyId,this.localStorageProvider.get('loginInfo')['user']['id']).
    then(res=>{
           res.success?this.isFavoStatus = true:this.isFavoStatus = false;
    })
  }

  delFavo(){
    console.log('取消关注');
    this.propertyProvider.cancelFavorite(this.houseData.propertyId,this.localStorageProvider.get('loginInfo')['user']['id']).then(res=>{
      if(res.success){
         this.toast.msg('取消收藏');
         this.isFavoStatus = false;
      }
    })
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
