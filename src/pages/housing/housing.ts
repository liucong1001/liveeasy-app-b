
import {Component, OnInit, ViewChild, Renderer, ElementRef} from '@angular/core';
import {Alert, Events, IonicPage, Navbar, NavController, NavParams, Searchbar} from 'ionic-angular';
import {AlertController, ModalController} from 'ionic-angular';
import {FollowPage} from './follow/follow';
import {ClosehousePage} from './closehouse/closehouse';
import {AddlookPage} from './addlook/addlook';
import {HousedetailPage} from './housedetail/housedetail';
import {AddhousePage} from './addhouse/addhouse';
import {PropertyProvider} from "../../providers/property/property";
// import {Pipe, PipeTransform} from '@angular/core';
import {StringJsonPipe} from "../../pipes/string-json/string-json";
import {ConfigProvider} from "../../providers/config/config";
import {PropertyModel} from "../../model/property/property.model";
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {CustomerProvider} from "../../providers/customer/customer";
import {AllsearchPage} from "../allsearch/allsearch";
import {SearchhousePage} from "./housedetail/searchhouse/searchhouse";
import {Tabs} from 'ionic-angular';
import {visibilityToggle} from "../../components/animations/toggle.animation";
import {ToastComponent} from "../../components/toast/toast";
import {MorePage} from "./more/more";
import { trigger,style,transition,animate,keyframes,query,stagger,group, state, animateChild } from '@angular/animations';
import {StatusBar} from "@ionic-native/status-bar";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {HousinfoPage} from "./housinfo/housinfo";
import {HomesearchPage} from "../home/homesearch/homesearch";
import {errorHandler} from "@angular/platform-browser/src/browser";
import {CodeValuePipe} from "../../pipes/code-value/code-value";

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
  animations: [
    trigger('flyInOut', [
      state('in',
        style({opacity: 1, transform: 'translateY(0)'}),

        ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(100%)'
        }),
        animate('.35s ease-in')
      ])
    ])
  ]
})
export class HousingPage {
  visibility = 'hidden';
  showFilter = false;
  // 列表搜索表单隐藏显示切换
  toggle() {
    this.showFilter = !this.showFilter;
    this.visibility = this.showFilter ? 'shown' : 'hidden';
  }
  classFlag = true;
  show = false;
  houseType = false;
  more = false;
  pop = false;
  housingEstate = false;
  pageData = [];
  firstPageData = [];
  totalPages: number;//总页数
  imgHeader: string; //线上图片默认头地址
  type: string;

  area: any;
  tagsList = [];
  tagsListPage =[];
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
     area:'',
    // district:'',
    // bedroomType:'0',
    // districtCode:'',
    // estateId:'',
    // param:'1', //默认搜索是1,只看我的6,
    // tags:0,
    // orientation:'',
    // hasElevator:'',
    // propertyPriceStart:'', //价格范围  开始
    // propertyPriceEnd:'', //价格范围  结束
  };
  //楼盘搜索
  searchFloorName:any;
  selected :any;
  offset = 100;
  orientation:any;
  tags:any;
  @ViewChild('searchBar') searchBar:Searchbar;
  @ViewChild('navbar') navBar: Navbar;

  badHttp = false;
  comFromHomeSearch = false;
  localCode:any;
  cxJSON:Array<{name:string;val:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public events: Events,
              public modalCtrl: ModalController, public propertyProvider: PropertyProvider,
              public localStorageProvider: LocalStorageProvider,
              public configProvider: ConfigProvider,
              public statusBar: StatusBar,
              public addhouseProvider: AddhouseProvider,
              public customerProvider:CustomerProvider,
              public nativePageTransitions: NativePageTransitions,
              public toast:ToastComponent,
              private renderer:Renderer
  ) {
    console.log('lastPage上一个页面',this.navCtrl.last());
    if(this.navCtrl.last()&&this.navCtrl.last().name=='HomesearchPage'){
       this.comFromHomeSearch = true;
    }

      // menu.enable(true); //menus-功能开启
    if(!this.navParams.get('item')){
      this.floorName = '';
      // this.params.estateId = '';
    }else {
      this.floorName = this.navParams.get('item').keyword;
      this.params.estateId = this.navParams.get('item').id;
    }

    // console.log('页面数据',this.pageData);
    //   this.menu.enable(true); //menus-功能开启
      if(!navParams.get('item')){
        this.floorName = '';
        // this.params.estateId = '';
      }else {
        this.floorName = navParams.get('item').keyword;
        this.params.estateId = navParams.get('item').id;
      }


    this.customerProvider.area().then(res=>{
      console.log('区域', res);
      if(res){
        this.area = res.data.distrs;
        this.localStorageProvider.set('distrs',this.area);
        if(this.area){
          this.area.unshift({name:'不限',id:'99'});
        }
        /**
         * 区域和房源标签合成一个接口
         */
        this.tagsList = res.data.tags; //房源标签
        this.localStorageProvider.set('tagsList',this.tagsList);
      }

    });



    //房源标签
    this.addhouseProvider.estateTagsSelect().then(res => {
       this.tagsListPage = res.data;
       this.localStorageProvider.set('tagsListPage',this.tagsListPage);
    });
    //朝向
    this.localCode = this.localStorageProvider.get('codeData');
    this.cxJSON = new CodeValuePipe().transform(this.localCode['orientation']);
    this.cxJSON.unshift({name:'全部',val:''});



  }

  isActive(item) {
    return this.selected === item;
  };
  allCity = false;
  unlimited(){
    this.allCity = true;
    this.params.district = '';
    this.params.districtCode = '';
    this.params.area = '';
    this.search();
    // this.isActive('');
    // this.reset();
  }

  searchDict = '';
  searchArea = '';
  //搜索房源——区域——商圈
  cityId:any;
  bx(){
    console.log('参数',this.params);
    this.params.area ='';
    this.searchArea = '不限';
    this.search();
  }
  //电梯
  dt(){
    console.log('参数',this.params);
    this.params.area ='';
    this.search();
  }
  go(item) {
    // this.allCity = false;
    if(item.id=='99'){
      this.params.districtCode = '';
      this.params.estateId = '';
      this.params.area = '';
      this.searchArea = '不限';
      this.hTips=false;
      // console.log('点击不限=====');
      this.search();
    }

    // this.searchDict = item.name;


    this.selected = item;
    this.aeraShow=false;
    this.tradArea=true;
    this.params.district = item.id;
    this.params.districtCode = item.code;
    this.propertyProvider.search2(item.id).then(res => {
      this.district=res.data;
      // console.log('asdsd',this.district);
      if(this.district == undefined){
          // alert('暂无该地区!')
        this.hTips=true
      }else {
        this.hTips=false;
      }
    })
    console.log('bolean',this.hTips);
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
  totalRecords :any;//查询到的总条数；
  /**
   * 列表搜索
   */
  search(){

    for(var i in this.district){
       if(this.params.area ==this.district[i].estateId){
         // console.log('选择',this.district[i].estateName)
       }
    }

    this.pageData = [];
    this.hasData  = true;
     this.propertyProvider.pageSearch(1,this.params).then(res=>{

       if(res){
         console.log('结束时间内容',res.data.totalRecords);
         this.totalRecords = res.data.totalRecords;
         this.firstPageData = res.data.result;
         if(res.data.hasOwnProperty('result')){
           this.hasData  = true;
           this.pageData = [];
           for (let i = 0; i < res.data.result.length; i ++) {
             setTimeout(()=> this.pageData.push(res.data.result[i]),150 * i);
           }
         }else{
           this.hasData = false;
         }
         console.log('hasData',this.hasData);
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
       }
       this.badHttp = false;

     }).catch(err=>{
       // if(err.name=="TimeoutError"){
       //      this.badHttp = true;
       //  }
        if(err){
          this.badHttp = true;
        }
       console.log('错误返回',err);
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
  ionViewWillEnter() {
    this.statusBar.styleDefault();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HousingPage');
    this.search();
    this.imgHeader = this.configProvider.set().img;
    /**
     * 祥哥 房源列表搜索接口
      */
    // this.propertyProvider.page2().toPromise().then();
    console.log('更多是否存在',this.moreSearchData);
  }
    //禁用调出键盘
  ionViewDidEnter(){
    let input = this.searchBar.getElementRef().nativeElement.querySelector('input');
    this.renderer.setElementAttribute(input, 'disabled', 'true');

    this.navBar.backButtonClick = () => {
      // this.navCtrl.push(HomesearchPage);
      this.navCtrl.popToRoot();
    };

  }
  datas:any;

  searchMore(){
    var data=  this.localStorageProvider.get('searchMoreData');
    this.datas=data;
    // (data.orientation ==''||data.orientation ==null) &&
    // console.log(data.hasElevator,data.orientation)
     if(data){
           if(data.tags!=0){
             // console.log(2);
               return true;
           }else if(data.hasElevator !=''){
             // console.log(3)
             return true;
           }
           else if(data.orientation !=''){
             // console.log(4)
             return true;
           }
           else {
               return false;
           }

     }else {
       return false;
     }
  }

  //menu
  showMenu1() {
    if (this.show == false || this.houseType == true || this.more == true || this.housingEstate == true) {
      this.show = true;
      this.pop = true;
      this.houseType = false;
      this.more = false;
      this.housingEstate = false;
      // console.log("111");
    } else {
      this.show = false;
      this.pop = false;
      // console.log("222");
    }
    // this.toggle();
  }
  // searchEaste = false;
  searchFloorNum = 0; //初始化搜索次数
  //户型搜索
  showMenu2() {
    if(this.searchFloorNum == 2){
      this.searchFloorNum =2;
    }else {
      this.searchFloorNum =1;
    }
    if (this.houseType == false || this.show == true || this.more == true || this.housingEstate == true) {
      this.houseType = true;
      this.show = false;
      this.pop = true;
      this.more = false;
      this.housingEstate = false;
      // console.log("111开");
    } else {
      this.houseType = false;
      this.pop = false;
      // console.log("222关");
    }
    // this.toggle();
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
    // this.toggle();
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

  ionViewWillLeave(){
    if (this.more == true || this.show == true || this.houseType == true || this.housingEstate == true) {
      this.more = false;
      this.show = false;
      this.pop = false;
      this.houseType = false;
      this.housingEstate = false;
    }
  }
 //
  goFollow(item) {
    this.openWin(FollowPage, {
      item:item
    });
  }

  goAddLook(item) {
    this.openWin(AddlookPage, {item: item,standardAddress:item.standardAddress});
  }

  goCloseHouse(item) {
    this.openWin(ClosehousePage, {
      propertyid: item.propertyId,
      item:item,
    })

  }

  goHouseDetail(item) {
    this.localStorageProvider.set('propertyIdDetail',item.propertyId);
    // this.openWin(HousinfoPage, {
    //   propertyId:item.propertyId,
    // });
    this.openWin(HousinfoPage,{item:item,notReloadPage:true})
  }

  addHouse() {
    this.openWin(AddhousePage);
  }
  num :any;
  timer:any;
  not=false;
  haveData=false;
  //下拉刷新
  doRefresh(refresher) {
    console.log('上拉刷新Begin async operation', refresher);
    console.log(refresher.deltaY)
    if(refresher.pullingIcon !='arrow-dropdown'){
      // alert(2);
      refresher.pullingText='松开推荐'
    }
    this.propertyProvider.pageSearch(1,this.params).then(res=>{
      console.log('结束时间内容',res.data.totalRecords);
      this.totalRecords = res.data.totalRecords;
      this.totalPages = res.data.totalPages;
      let newCount = this.checkUpdateCount(res.data.result);
      this.firstPageData = res.data.result;
      refresher.complete();
      if (res.data.result && res.data.result.length > 0) {
        this.pageData = [];
        for (let i = 0; i < res.data.result.length; i ++) {

          this.pageData.push(res.data.result[i])
          // setTimeout(()=> this.pageData.push(res.data.result[i]),100 * i);
        }
      }

      if (newCount > 0 ) {
        this.num=3;
        this.haveData=true;
        this.timer=setInterval(()=>{
          this.num--;
          if(this.num===0){
            this.haveData=false;
            window.clearInterval(this.timer);
          }
        },1000);
        // this.toast.defaultMsg('middle','已更新'+ newCount +'条记录');
      } else {
        // this.toast.defaultMsg('middle','暂无更新');
        this.not=true;
        this.num=3;
        this.timer=setInterval(()=>{
          this.num--;
          // console.log(this.num)
          if(this.num===0){
            this.not=false;
            window.clearInterval(this.timer);
          }
        },1000);
      }


    }).catch(err=>{
      if(err){
        this.badHttp = true;
        refresher.complete();
      }
    });
  }

  openWin(goPage, param = {}) {
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 400,
      slowdownfactor: 3,
      iosdelay: 50
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(goPage, param, {animate:false});
  }

  checkUpdateCount(result) {
    let count = 0;
    result = result || [];
    this.firstPageData = this.firstPageData || [];
    for (let item in result) {
      var rs = this.firstPageData.find(firstData => firstData.propertyId == result[item].propertyId ) || [];
      if (rs.length == 0) {
        count ++;
      }
    }
    return count;
  }

  //条数
  currentPage: number = 1;
  all = false;
  pageResult :any;
  //上拉加载
  doInfinite(infiniteScroll) {

    setTimeout(()=>{
      infiniteScroll.complete();
      if(this.currentPage==1){
        this.currentPage=2
      }else {
        this.currentPage++;
      }

      if (this.pageResult&&this.pageResult.length<10) {
        //如果都加载完成的情况，就直接 disable ，移除下拉加载
         infiniteScroll.enable(false);
        //toast提示
        this.all = true;
      }else {
        this.all = false;
        this.propertyProvider.pageSearch(this.currentPage,this.params).then(res => {
          this.pageResult = res.data.result;
          console.log('pageResult--',this.pageResult);
          if (res.data.result) {
            for (let i = 0; i < res.data.result.length; i ++) {
              this.pageData.push(res.data.result[i]);
              // setTimeout(()=> this.pageData.push(res.data.result[i]),100 * i);
            }
          }else {
          //  this.pageResult ==undefined  为空 没有数据  （加载全部）
            infiniteScroll.enable(false);
            this.all = true;
          }
        });
      }

      console.log('Async operation has ended');
      infiniteScroll.complete(function () {
        console.log('数据请求完成');
      });

    },1000);

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
    for (var i in this.tagsListPage) {
      if (code == this.tagsListPage[i].tagCode) {
        return this.tagsListPage[i].tagDesc
      }
    }
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


  houseJSON = [
    {name:'不限',val:0},
    {name:'一室',val:1},
    {name:'二室',val:2},
    {name:'三室',val:3},
    {name:'四室',val:4},
    {name:'五室',val:5},
    {name:'五室以上',val:6},
  ];


  hasElevatorJson = [
    {name:'不限',val:0},
    {start:'0',end:'100',val:'1'},
    {start:'100',end:'500',val:'2'},
    {start:'500',end:'1000',val:'3'},
    {start:'1000',end:'1500',val:'4'},
    {start:'1500',end:'2000',val:'5'},
    {start:'2000',end:'2500',val:'6'},
    {start:'2500',end:'3000',val:'7'},
    {start:'3000',end:'3500',val:'8'},
    {start:'5000',val:'9'},
  ];
//户型转换
  housePipe(data){
     for(var i in this.houseJSON){
        if(data == this.houseJSON[i].val){
          return this.houseJSON[i].name;
        }
     }
  }


  elevatorPipe(val){
    for(var i in this.hasElevatorJson){
      if(this.hasElevatorJson[i].val==val){
        return this.hasElevatorJson[i];
      }
    }
  }
  floorName = '';
  time:any;
  price:any;
  starts:any;
  ends:any;
  structure:any = {lower: 0, upper:500};
  onChange(ev:any) {
    this.params.propertyPriceStart=this.structure.lower.toString();
    this.params.propertyPriceEnd=this.structure.upper.toString();
  }
  name:any;
  selectPrice(){
    this.time=this.elevatorPipe(this.price);
    this.name=this.time.name;
    this.starts=this.time.start;
    this.ends=this.time.end;
    console.log(this.ends);
    this.params.propertyPriceStart=this.starts;
    this.params.propertyPriceEnd=this.ends;
    this.search();
    if(this.starts,this.ends){
      this.structure= {lower: this.starts, upper:this.ends};
      console.log(this.structure)
    }
  }

  allSearch(){
    this.events.subscribe('bevents', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据为: ', params);
        if(!params){
          this.floorName = '';
          this.params.estateId = '';
        }else {
          this.floorName = params.keyword;
          this.params.estateId = params.id;
          console.log('搜索',this.floorName,this.params.estateId);
        }
        this.search();
      // 取消订阅
      this.events.unsubscribe('bevents');
    });
    this.navCtrl.push(AllsearchPage,{floorName:this.floorName});
  }
  spaceSizeName:'';
  decorationName:'';
  buildingTypeName:'';
  buzzTypeName:'';
  moreSearchData :any;
  positionInBuilding:'';
  mores(){

    this.events.subscribe('moreSearchBevents', (params) => {
      // 接收B页面发布的数据

      console.log('接收更多条件为: ', params );
      if(!params){
        this.params.tags = 0;
      }else {
        this.moreSearchData = params;

        this.params.tags = params.tags;
        this.params.orientation = params.orientation;
        this.params. propertyPriceStart = params.propertyPriceStart;
        this.params. propertyPriceEnd = params.propertyPriceEnd;
        //liu
        this.params['spaceSizeStart']=params.spaceSizeStart;
        this.params['spaceSizeEnd']=params.spaceSizeEnd;
        this.params['decoration']=params.decoration;
        this.params['buildingType']=params.buildingType;
        this.params['buzzType']=params.buzzType;

        this.spaceSizeName = params.spaceSizeName;
        this.decorationName =params.decorationName;
        this.buildingTypeName =params.buildingTypeName;
        this.buzzTypeName= params.buzzTypeName;
        console.log('接收到11',this.moreSearchData);
        this.positionInBuilding=params.positionInBuildingName;
        console.log('接收到',params);
        console.log(this.spaceSizeName,this.decorationName,this.buildingTypeName,this.buzzTypeName,this.positionInBuilding)
        // this.params. propertyPriceStart  propertyPriceEnd
        // console.log('搜索',this.floorName,this.params.estateId);
      }
       this.search();
      // 取消订阅
      this.events.unsubscribe('moreSearchBevents');
    });
    this.openWin(MorePage);
  }



  cxPipe(data){
    for(var i in this.cxJSON){
      if(data == this.cxJSON[i].val){
        return this.cxJSON[i].name;
      }
    }
  }

  selectArea(item){
     this.searchArea= item.name;
    this.search();
  }


}

/**
 * 定义搜索条件类
 */
class  PropertyPageParams {
  district?:string;
  area?:string; //商圈
  bedroomType?:string;//户室
  city?:string;
  districtCode?:string;
  estateId?:string;//小区
  param?:string;
  tags?:any;
  hasElevator?:any;//是否有电梯
  orientation?:any;//朝向
  propertyPriceStart?:any; //价格范围  开始
  propertyPriceEnd?:any; //价格范围  结束
}

