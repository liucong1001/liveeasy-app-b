
import {Component, OnInit, ViewChild, Renderer, ElementRef} from '@angular/core';
import {Alert, Events, IonicPage, Navbar, NavController, NavParams, Searchbar} from 'ionic-angular';
import {AlertController, ModalController} from 'ionic-angular';
import {FollowPage} from './follow/follow';
import {ClosehousePage} from './closehouse/closehouse';
import {AddlookPage} from './addlook/addlook';
import {AddhousePage} from './addhouse/addhouse';
import {PropertyProvider} from "../../providers/property/property";
import {ConfigProvider} from "../../providers/config/config";
import {AddhouseProvider} from "../../providers/addhouse/addhouse";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {CustomerProvider} from "../../providers/customer/customer";
import {AllsearchPage} from "../allsearch/allsearch";
import {ToastComponent} from "../../components/toast/toast";
import {MorePage} from "./more/more";
import { trigger,style,transition,animate,keyframes,query,stagger,group, state, animateChild } from '@angular/animations';
import {StatusBar} from "@ionic-native/status-bar";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {HousinfoPage} from "./housinfo/housinfo";
import {HomesearchPage} from "../home/homesearch/homesearch";
import {ArryCodeValuePipe} from "../../pipes/arry-code-value/arry-code-value";

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
    division:'',
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
    this.localCode = this.localStorageProvider.get('codeData');

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

      if(!navParams.get('item')){
        this.floorName = '';
        // this.params.estateId = '';
      }else {
        this.floorName = navParams.get('item').keyword;
        this.params.estateId = navParams.get('item').id;
      }



    this.tagsListPage = new ArryCodeValuePipe().transform(this.localCode,'property_tag_desc');
    this.localStorageProvider.set('tagsListPage',this.tagsListPage);
    console.log('房源标签',this.tagsListPage);

    //朝向
    this.localCode = this.localStorageProvider.get('codeData');
    this.cxJSON = new ArryCodeValuePipe().transform(this.localCode,'orientation');
    this.cxJSON.unshift({name:'全部',val:''});
    //查询列表，行政区参数
    var loginUserDistrict = this.localStorageProvider.get('loginInfo')['office']['area']['code'];
    this.params.division = loginUserDistrict;


    console.log('area',this.localStorageProvider.get('area'));
    if(this.localStorageProvider.get('area')==null){
      //行政区划
      this.propertyProvider.getDivision().then(res=>{
        console.log('行政区划',res);
        this.area = res.data.data;
        this.localStorageProvider.set('area',this.area);
        this.area.unshift({name:'不限',id:'99',code:'99'});
      });
    }else {
      this.area = this.localStorageProvider.get('area');
      this.area.unshift({name:'不限',id:'99',code:'99'});
    }
  }




  isActive(item) {
    return this.selected === item;
  };
  allCity = false;
  unlimited(){
    this.allCity = true;
    this.params.division = '2333';
    this.params.area = '' ;
    this.search('propQuery');
  }

  searchDict = '';
  searchArea = '';
  //搜索房源——区域——商圈
  cityId:any;
  bx(){
     this.params.area = '' ;
    this.searchArea = '不限';
    this.search('propQuery');
  }
  //电梯
  dt(){
     this.params.area  = '';
    this.search('propQuery');
  }
  choseDivision=false;
  go(item) {
    this.choseDivision = false;
    if(item.id=='99'){
      this.params.division = this.localStorageProvider.get('loginInfo')['office']['area']['code'];
      this.params.area = '';
      this.searchArea = '不限';
      this.district = [];
      this.search('propQuery');
      this.choseDivision = true;
    }
    this.selected = item;
    this.aeraShow=false;
    this.tradArea=true;
    this.params.division = item.code;
    this.district =[];
    for(var i of this.area){
       if(item.code==i['code']){
         this.district = i['area'];
         if(this.district!=undefined){
           this.district.unshift({name:'不限',code:'0'});
           this.district = this.uniqueArray(this.district,'name');
         }else {
           this.district = [];
         }
       }
    }
  }

   uniqueArray(array, key){
    var result = [array[0]];
    for(var i = 1; i < array.length; i++){
      var item = array[i];
      var repeat = false;
      for (var j = 0; j < result.length; j++) {
        if (item[key] == result[j][key]) {
          repeat = true;
          break;
        }
      }
      if (!repeat) {
        result.push(item);
      }
    }
    return result;
  }



  hasData = true;
  totalRecords :any;//查询到的总条数；
  bedroomUnlimt = false;
  /**
   * 列表搜索
   */
  search(qId){
    for(var i in this.district){
       if(this.params.area ==this.district[i].estateId){
       }
    }
    this.pageData = [];
    this.hasData  = true;
     this.propertyProvider.pageSearch(1,this.params,qId).then(res=>{
       if(res){
         this.totalRecords = res.data.totalRecords;
         this.firstPageData = res.data.result;
         // res.data.hasOwnProperty('result')
         if(res.data.result){
           this.hasData  = true;
           this.pageData = [];
           for (let i = 0; i < res.data.result.length; i ++) {
             setTimeout(()=> this.pageData.push(res.data.result[i]),150 * i);
           }
         }else  {
           console.log('没有数据!');
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
         if(this.searchFloorNum ==2 && this.params.bedrooms=='0'){
           this.searchFloorNum=1;
         }
        //将下拉currentPage重置
         this.currentPage = 1;
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



  ionViewWillEnter() {
    this.statusBar.styleDefault();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HousingPage');
    this.search('properties');
    this.imgHeader = this.configProvider.set().img;
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
    if(this.searchFloorNum ==0 || this.searchFloorNum ==1){
      this.searchFloorNum = 1;
    }else {
      this.searchFloorNum =2;
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
  newCount:any;
  //下拉刷新
  doRefresh(refresher) {
    console.log('上拉刷新Begin async operation', refresher);
    console.log(refresher.deltaY)
    if(refresher.pullingIcon !='arrow-dropdown'){
      // alert(2);
      refresher.pullingText='松开推荐'
    }
    this.propertyProvider.pageSearch(1,this.params,'properties').then(res=>{
      console.log('结束时间内容',res.data.totalRecords);
      this.totalRecords = res.data.totalRecords;
      this.totalPages = res.data.totalPages;
      let newCount = this.checkUpdateCount(res.data.result);
      this.newCount=newCount;
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
        this.propertyProvider.pageSearch(this.currentPage,this.params,'propQuery').then(res => {
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

//todo 不用thumbnail  用imgpath拼接出来
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
      if (code == parseFloat(this.tagsListPage[i].val) ) {
        return this.tagsListPage[i].name
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
    {start:'5000',end:'0',val:'9'},
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
    console.log(this.structure.lower,this.structure.upper)
      this.params.price = this.structure.lower.toString()+','+this.structure.upper.toString();

  }

  name:any;
  selectPrice(){
    this.time=this.elevatorPipe(this.price);
    this.name=this.time.name;
    this.starts=this.time.start;
    this.ends=this.time.end;
    console.log(this.ends);
    if(this.starts==undefined||this.ends==undefined){
      delete  this.params.price;
    }else{
      this.params.price = this.starts + ',' + this.ends;
    }
    this.search('propQuery');
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
          this.params.estate = '';
        }else {
          this.floorName = params.keyword;
          this.params.estate = params.id;
          console.log('搜索',this.floorName,this.params.estate);
        }
        this.search('propQuery');
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
  duplicates(arr) {
    var newArr = [];
    for(var i=0;i<arr.length;i++){
      var count = 0;
      for(var j=0;j<arr.length;j++){
        if(arr[i]===arr[j]){
          count++;
        }
      }
      if(count>1 && newArr.indexOf(arr[i])===-1){
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }
  mores(){
    this.events.subscribe('moreSearchBevents', (params) => {
      // 接收B页面发布的数据
      console.log('接收更多条件为: ', params );
      if(!params){
        this.params.tags = 0;
      }else {
        this.moreSearchData = params;

        if(params.tags!=0){this.params.tags = params.tags}else{ delete this.params.tags};

        if(params.orientation!=0){this.params.orientation = params.orientation} else {delete this.params.orientation};
        if(params.hasElevator!=0){this.params.elevators = params.hasElevator} else {this.params.elevators};
        if(params.spaceSize!=0){
          // spaceSizeList
          var arry = [];
          var arryList = '';
          for(var i in params.spaceSizeList){
            arry.push(params.spaceSizeList[i]['start']);
            arry.push(params.spaceSizeList[i]['end']);
            arryList +=params.spaceSizeList[i]['start']+','+params.spaceSizeList[i]['end']+';';
          }
          for(var i in arry){
             for(var y in this.duplicates(arry) ){
                if(arry[i]== this.duplicates(arry)[y]){
                  console.log('item重复',arry[i],i);
                  var index = arry.indexOf(arry[i]);
                  if(index>-1){arry.splice(index,1)}
                }
             }
          }
          // console.log('去重复之后',arry);
          // console.log('查询面积----',arry);
          this.params.space = arryList;
        }else {
          delete this.params.space
        }

        if(params.decoration!=0){this.params.decoration = params.decoration}else {delete this.params.decoration}
        if(params.buildType!=0){this.params.buildType = params.buildType}else {delete this.params.buildType}
        if(params.position!=0){this.params.position = params.position}else {delete this.params.position}

        console.log('接收到11',this.moreSearchData);
      }
       this.search('propQuery');
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
     this.search('propQuery');
     console.log('选择到area',item,this.selected);
     if(item.name=='不限'){this.searchArea=this.selected.name};
  }

  paramsBedrooms:any;
  selectBedRooms(item){
    this.params.bedrooms = this.paramsBedrooms;
    if(item.val==0) {
      delete this.params.bedrooms
    }
    this.search('propQuery');
  }

}

/**
 * 定义搜索条件类
 */
class  PropertyPageParams {
  area?:string; //商圈
  bedrooms?:string;//户室
  city?:string;
  division?:string;
  estateId?:string;//小区
  param?:string;
  tags?:any;
  elevators?:any;//是否有电梯
  orientation?:any;//朝向
  propertyPriceStart?:any; //价格范围  开始
  propertyPriceEnd?:any; //价格范围  结束
  price?:any;
  space?:any;//建筑面积
  decoration?:any;//装修程度
  buildType?:any;//建筑类型
  position?:any;//楼层位置
  estate?:any;//楼盘搜索
}

