import { Component,ViewChild  } from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams, Slides} from 'ionic-angular';
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
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,public nativePageTransitions: NativePageTransitions,
              public propertyProvider: PropertyProvider, public loadingCtrl: LoadingController,public configProvider: ConfigProvider,
              public localStorageProvider: LocalStorageProvider,public statusBar: StatusBar,
              ) {

          this.data=navParams.get('propertyId');
          console.log(this.data);
          this.tagsListPage = this.localStorageProvider.get('tagsListPage');
  }


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
    let loading = this.loadingCtrl.create({
      content: '数据加载中...'
    });
    loading.present();
    this.propertyProvider.getRecord(this.navParams.data.propertyId).then(res=>{
        if(res.success){
          this.houseData=res.data;
          // JSON.parse(this.data.propertyPics)
          if(res.data.propertyPics){
            this.imgJson = JSON.parse(res.data.propertyPics);
          }

          loading.dismiss();
        }
    });
     //业主委托书
    this.propertyProvider.adetail(this.navParams.data.propertyId).then(res=>{

      if(res.msg == 1){
        this.letteratorneyData = res.data;
        this.letteratorneyImgJson = JSON.parse(res.data.delegateDocPics);
      }
    });
    //钥匙信息
    this.propertyProvider.keydetail(this.navParams.data.propertyId).then(res=>{
        if(res.success&&res.data){
          this.keyData = res.data;
         console.log('钥匙',res.data);
          if(this.keyData.keyDlgtFilePics){
            this.keyImgJson = JSON.parse(this.keyData.keyDlgtFilePics); //默认展示有图片
          }

        }
    })



  }


  ngOnInit(){//页面加载完成后自己调用

  }

  goMore(){
     this.openWin(HousmorePage,{item:this.houseData});
    // this.navCtrl.push(HousmorePage,{item:this.houseData})
  }

  edit(){
    this.openWin(HousedetailPage,{propertyId:this.navParams.get('propertyId')});
  }
  rolepeople(){
    this.openWin(RolepeoplePage,{propertyId:this.navParams.get('propertyid')});
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
