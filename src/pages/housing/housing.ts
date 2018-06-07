import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController, ModalController} from 'ionic-angular';
import {FollowPage} from '../follow/follow';
import {ClosehousePage} from '../closehouse/closehouse';
import {AddlookPage} from '../addlook/addlook';
import {HousedetailPage} from '../housedetail/housedetail';
import {AddhousePage} from '../addhouse/addhouse';
import {PropertyProvider} from "../../providers/property/property";
// import {Pipe, PipeTransform} from '@angular/core';
import {StringJsonPipe} from "../../pipes/string-json/string-json";
import {ConfigProvider} from "../../providers/config/config";
import {PropertyModel} from "../../model/property/property.model";
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {CustomerProvider} from "../../providers/customer/customer";
import {AllsearchPage} from "../allsearch/allsearch";

/**
 * Generated class for the HousingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-housing',
  templateUrl: 'housing.html',
  // pipes:[StringJsonPipe],
})
export class HousingPage {
  classFlag = true;
  show = false;
  houseType = false;
  more = false;
  pop = false;
  housingEstate = false;
  pageData = [PropertyModel];
  totalPages: number;//总页数
  imgHeader: string; //线上图片默认头地址
  type: string;
  area: any;
  tagsList = [];
  estateList = []; //楼盘列表
  district:any;
  aeraShow=true;
  tradArea=false;
  hTips=false;
  associate=false;
  searchPop=false;
  address:any;
  /**
   * 列表搜索条件
   * @type {{}}
   */
  params:PropertyPageParams = {
    district:'',
    area:'',
    bedroomType:'0',
    districtCode:'',
    estateId:'',
    param:'1', //默认搜索是1,只看我的6,
    tags:0,
  };
  //楼盘搜索
  searchFloorName:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController, public propertyProvider: PropertyProvider, public localStorageProvider: LocalStorageProvider,
              public configProvider: ConfigProvider, public addhouseProvider: AddhouseProvider,public customerProvider:CustomerProvider) {
    console.log('页面数据',this.pageData);
    this.customerProvider.area().then(res=>{
      console.log('区域', res);
      this.area = res;
    });
    //房源标签
    this.addhouseProvider.estateTagsSelect().then(res => {
      this.tagsList = res.data;
      console.log('房源列表', this.tagsList);

    });

    //楼盘列表
    this.addhouseProvider.estateListSelect().then(res=>{
      this.estateList = res.data.result;
      console.log('楼盘列表',this.estateList);
    });
  }
  selected :any;
  isActive(item) {
    return this.selected === item;
  };


  searchDict = '';
  searchArea = '';
  //搜索房源——区域——商圈
  go(item) {
    this.searchDict = item.name;

    this.selected = item;
    this.aeraShow=false;
    this.tradArea=true;
    this.params.district = item.id;
    this.params.districtCode = item.code;
    this.propertyProvider.search2(item.id).then(res => {
      this.district=res.data;
      if(this.district == undefined){
          // alert('暂无该地区!')
        this.hTips=true
      }else {
        this.hTips=false;
      }
    })
  }


  test() {
    console.log(this.type)
    this.localStorageProvider.set('bedroom', this.type);
    this.propertyProvider.houseType({}).then(res => {
      // this.pageData=res.data;
      console.log('数据', res.data);
    })
  }

  hasData = true;
  /**
   * 列表搜索
   */
  search(){

    for(var i in this.district){
       if(this.params.area ==this.district[i].estateId){
         console.log('选择',this.district[i].estateName)
       }
    }

    this.pageData = null;
    this.hasData  = true;
     this.propertyProvider.pageSearch(1,this.params).then(res=>{
       this.pageData = res.data.result;
       console.log('查询到的页面数据',this.pageData);
       console.log('是否有数据',res.data.hasOwnProperty('result'));
        if(res.data.hasOwnProperty('result')){
           this.hasData  = true;
        }else{
           this.hasData = false;
        }
       this.totalPages = res.data.totalPages;
        //关闭搜索框子
       this.show = false;
       this.houseType = false;
       this.more = false;
       this.pop = false;
       this.housingEstate = false;

       //户型搜索条件字显示
       if(this.searchFloorNum ==1){
          this.searchFloorNum = 2;
       }
       console.log('次数',this.searchFloorNum);

     });
  }
  //重置
  reset(){
    this.params= {
      district:'',
      area:'',
      bedroomType:'0',
      districtCode:'420103',
      estateId:'',
      param:'1', //默认搜索是1,只看我的6,
    };
    this.search();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HousingPage');
    this.search();
    this.imgHeader = this.configProvider.set().img;
  }

  //menu
  showMenu1() {
    if (this.show == false || this.houseType == true || this.more == true || this.housingEstate == true) {
      this.show = true;
      this.pop = true;
      this.houseType = false;
      this.more = false;
      this.housingEstate = false;
    } else {
      this.show = false;
      this.pop = false;
    }
  }
  // searchEaste = false;
  searchFloorNum = 0; //初始化搜索次数
  //户型搜索
  showMenu2() {
    this.searchFloorNum =1;
    if (this.houseType == false || this.show == true || this.more == true || this.housingEstate == true) {
      this.houseType = true;
      this.show = false;
      this.pop = true;
      this.more = false;
      this.housingEstate = false;
    } else {
      this.houseType = false;
      this.pop = false;
    }
  }

  showMenu3() {
    if (this.housingEstate == false || this.show == true || this.more == true || this.houseType == true) {
      this.housingEstate = true;
      this.show = false;
      this.pop = true;
      this.more = false;
      this.houseType = false;
    } else {
      this.housingEstate = false;
      this.pop = false;
    }
  }

  showMenu4() {
    if (this.more == false || this.show == true || this.houseType == true || this.housingEstate == true) {
      this.more = true;
      this.show = false;
      this.pop = true;
      this.houseType = false;
      this.housingEstate = false;
    } else {
      this.more = false;
      this.pop = false;
    }
  }

  pops() {
    if (this.more == true || this.show == true || this.houseType == true || this.housingEstate == true) {
      this.more = false;
      this.show = false;
      this.pop = false;
      this.houseType = false;
      this.housingEstate = false;
    }
  }

 //根据楼盘名返回楼盘地址
  searchStandardAddress(name){
     for(var i in  this.estateList){
         if(name == this.estateList[i].estateName){
            return this.estateList[i].standardAddress;
         }
     }
  }

  goFollow(item) {
    this.navCtrl.push(FollowPage, {
      propertyid: item.propertyId,
      estatename: item.estateName,
      convid: item.convId,
      standardAddress:this.searchStandardAddress(item.estateName)
    });
  }

  goAddLook(item) {
    this.navCtrl.push(AddlookPage, {item: item,standardAddress:this.searchStandardAddress(item.estateName)});
  }

  goCloseHouse(item) {
    this.navCtrl.push(ClosehousePage, {
      propertyid: item.propertyId,
      estatename: item.estateName,
      convid: item.convId,
      realtorId:item.realtorId,
      standardAddress:this.searchStandardAddress(item.estateName),
    })

  }

  goHouseDetail(item) {
    this.navCtrl.push(HousedetailPage, {
      item: item,
      estateList:this.estateList
    });
  }

  addHouse() {
    this.navCtrl.push(AddhousePage);
  }

  //上拉刷新
  doRefresh(refresher) {
    console.log('上拉刷新Begin async operation', refresher);

    setTimeout(() => {
      // this.items = [];
      // for (var i = 0; i < 30; i++) {
      //     this.items.push( this.items.length );
      //   }
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  //条数
  currentPage: number = 1;

  //下拉加载
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      infiniteScroll.complete();
      this.currentPage++;
      console.log('加载完成后，关闭刷新', this.currentPage);

      if (this.currentPage >= this.totalPages) {
        //如果都加载完成的情况，就直接 disable ，移除下拉加载
        infiniteScroll.enable(false);
        //toast提示
        alert("已加载所有");
       }else {
        this.propertyProvider.pageSearch(this.currentPage,this.params).then(res => {
          for (let i = 0; i < res.data.result.length; i++) {
            this.pageData.push(res.data.result[i]);
          }
          // console.log('下加载分数据2',res.data.result,'分页内容',this.pageData);
        });
      }

      console.log('Async operation has ended');
      infiniteScroll.complete(function () {
        console.log('数据请求完成');
      });
    }, 1000);

  }


  pic(data) {
    if (data) {
      return JSON.parse(data)[0].thumbnail
    }
  }

  //房源标签转换（字符串转为数组）
  tagPipe(data) {
    if (data) {
      return data.split(",");
    }
  }

  //房源标签code转换为name
  tagName(code) {
    for (var i in this.tagsList) {
      if (code == this.tagsList[i].tagCode) {
        return this.tagsList[i].tagDesc
      }
    }
  }

  houseJSON = [
    {name:'不限',val:0},
    {name:'一室',val:1},
    {name:'二室',val:2},
    {name:'三室',val:3},
    {name:'四室',val:4},
    {name:'五室',val:5},
    {name:'五室以上',val:6},
  ];
//户型转换
  housePipe(data){
     for(var i in this.houseJSON){
        if(data == this.houseJSON[i].val){
          return this.houseJSON[i].name;
        }
     }
  }
  //小区转化
  estatePipe(data){
     for(var i in this.estateList){
       if(data ==this.estateList[i].estateId){
         return this.estateList[i].estateName
       }
     }
  }
  allSearch(){
    this.navCtrl.push(AllsearchPage)
  }
}

/**
 * 定义搜索条件类
 */
class  PropertyPageParams {
  district:string;
  area:string; //商圈
  bedroomType?:string;//户室
  city?:string;
  districtCode?:string;
  estateId?:string;//小区
  param?:string;
  tags?:any;
}

