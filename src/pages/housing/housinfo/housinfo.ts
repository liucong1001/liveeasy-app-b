import { Component,ViewChild,NgZone} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams, Slides, Content, App} from 'ionic-angular';
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
/**
房源详情页面
 */

@IonicPage()
@Component({
  selector: 'page-housinfo',
  templateUrl: 'housinfo.html',
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
  @ViewChild(Content) content: Content;
  classFlag=false;
  constructor(public navCtrl: NavController, public toast:ToastComponent,public navParams: NavParams,public nativePageTransitions: NativePageTransitions,
              public propertyProvider: PropertyProvider, public loadingCtrl: LoadingController,public configProvider: ConfigProvider,
              public localStorageProvider: LocalStorageProvider,public statusBar: StatusBar,public ngzone:NgZone,public app: App
              ) {
    // this.data=navParams.get('propertyId');
    // console.log(this.data);
    this.tagsListPage = this.localStorageProvider.get('tagsListPage');

  }
  scrollHandler(event) {

    if (this.content.scrollTop >= 10){
      // alert(2)
      this.classFlag=true;
    }else if(this.content.scrollTop < 50){
      this.classFlag=false;
    }
  }
flag=false;
  fyDescribe=false;

  @ViewChild('mySlider') slider:Slides;
    mySlideOptions={
      autoplay:2000,
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
     // let loading = this.loadingCtrl.create({
     //   content: '数据加载中...'
     // });
     // loading.present();
     this.propertyProvider.getRecord(this.navParams.data.propertyId).then(res=>{
         if(res.success){
           this.houseData=res.data;
           console.log(this.houseData)
           this.propertyId = this.houseData.propertyId;
           if(res.data.propertyPics){
             this.imgJson = JSON.parse(res.data.propertyPics);
           }

           // loading.dismiss();
         }
     });
 }


     //业主委托书
    this.propertyProvider.adetail(this.propertyId).then(res=>{

      if(res.msg == 1){
        this.letteratorneyData = res.data;
        this.letteratorneyImgJson = JSON.parse(res.data.delegateDocPics);
      }
    });
    //钥匙信息
    this.propertyProvider.keydetail(this.propertyId).then(res=>{
        if(res.success&&res.data){
          this.keyData = res.data;
         console.log('钥匙',res.data);
          if(this.keyData.keyDlgtFilePics){
            this.keyImgJson = JSON.parse(this.keyData.keyDlgtFilePics); //默认展示有图片
          }

        }
    })
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

  buildingTypeJson = [
    {name:'--',val:'0'},
    {name:'塔楼',val:'1'},
    {name:'板楼',val:'2'},
    {name:'板塔结合',val:'3'},
  ];

  buildingTypePipe(data){
    for(var i in this.buildingTypeJson){
      if(data == this.buildingTypeJson[i].val){
        return this.buildingTypeJson[i].name;
      }
    }
  }


  //房屋用途
  buzzTypeJson = [
    {name:'出售',val:'1'},
    {name:'售租',val:'2'},
    {name:'租售',val:'3'},
  ];
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
    // this.navCtrl.push(HousmorePage,{item:this.houseData})
  }

  edit(){
    this.openWin(HousedetailPage,{propertyId:this.propertyId});
    // this.openWin();
  }

  rolepeople(){
    this.openWin(RolepeoplePage,{propertyid:this.propertyId});
  };
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
      if (code == this.tagsListPage[i].tagCode) {
        return this.tagsListPage[i].tagDesc
      }
    }
  }

  //朝向
  cxJSON = [
    // {name:'全部',val:''},
    {name:'东',val:'1'},
    {name:'东南',val:'2'},
    {name:'南',val:'3'},
    {name:'西南',val:'4'},
    {name:'西',val:'5'},
    {name:'西北',val:'6'},
    {name:'北',val:'7'},
    {name:'东北',val:'8'},
    {name:'南北',val:'9'},
    {name:'东西',val:'10'},
  ];

  orentationPipe(data){
    for(var i in this.cxJSON){
       if(data == this.cxJSON[i].val){
          return this.cxJSON[i].name;
       }
    }
  }

  decorationJson = [
    {name:'毛坯',val:'1'},
    {name:'简装',val:'2'},
    {name:'中等装修',val:'3'},
    {name:'精装',val:'4'},
    {name:'豪装',val:'5'},
  ];
  decorationPipe (data){
    for(var i in this.decorationJson){
        if(data==this.decorationJson[i].val){
            return this.decorationJson[i].name;
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

  //房源描述
  describes(){
    this.openWin(DescribePage,{
    item:this.houseData,
    })
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
  };

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
