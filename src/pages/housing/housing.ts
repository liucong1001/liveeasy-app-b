
import {Component, OnInit, ViewChild, Renderer, ElementRef} from '@angular/core';
import {Alert, Events, IonicPage, Navbar, NavController, NavParams, Searchbar,ItemSliding } from 'ionic-angular';
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
import {LookhousePage} from "./housedetail/lookhouse/lookhouse";
import {el} from "@angular/platform-browser/testing/src/browser_util";

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
  // animations: [
  //   trigger('flyInOut', [
  //     state('in',
  //       style({opacity: 1, transform: 'translateY(0)'}),
  //
  //     ),
  //     transition('void => *', [
  //       style({
  //         opacity: 0,
  //         transform: 'translateY(100%)'
  //       }),
  //       animate('.35s ease-in')
  //     ])
  //   ])
  // ]
  animations: [
    trigger('animation', [
      state('open', style({ opacity: 1,  height: '*'})),
      state('close', style({ opacity: 0, height: '0'})),
      transition('open => close', animate('.3s ease-in')),
      transition('close => open', animate('.3s ease-out')),
    ]),
    // trigger('bottom', [
    //   state('open',style({ opacity: 1,transform: 'skew(0deg)'})),
    //   state('close', style({ opacity: 0,transform: 'skew(45deg)'})),
    //   transition('open => close', animate('600ms')),
    //   transition('close => open', animate('600ms')),
    // ])
  ],


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

  housingEstate = false;
  pageData = [];
  firstPageData = [];
  totalPages: number;//总页数
  imgHeader: string; //线上图片默认头地址
  type: string;

  area: any;
  tagsList = [];
  tagsListPage = [];
  estateList = []; //楼盘列表
  district: any;
  aeraShow = true;
  tradArea = false;
  hTips = false;
  associate = false;
  searchPop = false;
  address: any;
  /**
   * 列表搜索条件
   * @type {{}}
   */
  params: PropertyPageParams = {
    area: '',
    division: '',
  };
  //楼盘搜索
  searchFloorName: any;
  selected: any;
  offset = 100;
  orientation: any;
  tags: any;
  @ViewChild('searchBar') searchBar: Searchbar;
  @ViewChild('navbar') navBar: Navbar;
  // @ViewChild('slidingItem') slidingItem: ItemSliding;
  badHttp = false;
  comFromHomeSearch = false;
  addIcon = true;
  localCode: any;
  updateInput = false;
  cxJSON: Array<{ name: string; val: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController, public events: Events,
              public modalCtrl: ModalController, public propertyProvider: PropertyProvider,
              public localStorageProvider: LocalStorageProvider,
              public configProvider: ConfigProvider,
              public statusBar: StatusBar,
              public addhouseProvider: AddhouseProvider,
              public customerProvider: CustomerProvider,
              public nativePageTransitions: NativePageTransitions,
              public toast: ToastComponent,
              private renderer: Renderer) {
    this.localCode = this.localStorageProvider.get('codeData');
    console.log('初始化上一个', this.navCtrl.last() && this.navCtrl.last().name);
    if (this.navCtrl.last() && this.navCtrl.last().name == 'HomesearchPage') {
      this.comFromHomeSearch = true;
      this.addIcon = false;
      this.updateInput = true;
    }
    this.propertyCategory = this.propertyCategoryData;

    if (!this.navParams.get('item')) {
      this.floorName = '';
    } else {
      this.floorName = this.navParams.get('item').keyword;
      this.params.estate = this.navParams.get('item').id;
    }
    // if(!navParams.get('item')){
    //   this.floorName = '';
    // }else {
    //   this.floorName = navParams.get('item').keyword;
    //   this.params.estateId = navParams.get('item').id;
    // }
    this.tagsListPage = new ArryCodeValuePipe().transform(this.localCode, 'property_tag_desc');
    this.localStorageProvider.set('tagsListPage', this.tagsListPage);
    // console.log('tagsListPage',this.tagsListPage);
    //朝向
    this.localCode = this.localStorageProvider.get('codeData');
    this.cxJSON = new ArryCodeValuePipe().transform(this.localCode, 'orientation');
    this.cxJSON.unshift({name: '全部', val: ''});
    //查询列表，行政区参数
    var loginUserDistrict = this.localStorageProvider.get('loginInfo')['user']['office']['area']['code'];
    // console.log('查询参数登录',this.localStorageProvider.get('loginInfo')['user']);
    this.params.division = loginUserDistrict;

    if (this.localStorageProvider.get('area') == null) {
      //行政区划
      this.propertyProvider.getDivision().then(res => {
        this.area = res.data.result[0];
        this.localStorageProvider.set('area', this.area);
        this.area && this.area.unshift({name: '不限', id: '99', code: '99'});
      });

    } else {
      this.area = this.localStorageProvider.get('area');
      this.area && this.area.unshift({name: '不限', id: '99', code: '99'});
    }

  }

  isActive(item) {
    return this.selected === item;
  };

  allCity = false;

  unlimited() {
    this.allCity = true;
    this.params.division = '2333';
    this.params.area = '';
    this.search('propQuery');
  }

  searchDict = '';
  searchArea = '';
  //搜索房源——区域——商圈
  cityId: any;

  bx() {
    this.params.area = '';
    this.searchArea = '不限';
    this.search('propQuery');
  }

  //电梯
  dt() {
    this.params.area = '';
    this.search('propQuery');
  }

  choseDivision = false;

  go(item) {
    this.choseDivision = false;
    if (item.id == '99') {
      this.params.division = this.localStorageProvider.get('loginInfo')['user']['office']['area']['code'];
      // delete this.params.division;
      delete this.params.division1;
      // this.params.division1 = this.params.division;
      this.params.area = '';
      this.district = [];
      this.search('propQuery');
      this.choseDivision = true;
    }
    this.searchArea = item.name;
    this.selected = item;
    this.aeraShow = false;
    this.tradArea = true;
    this.params.division = item.code;
    this.params.division1 = this.params.division;
    this.district = [];
    for (var i of this.area) {
      if (item.code == i['code']) {
        this.district = i['area'];
        if (this.district != undefined) {
          this.district.unshift({name: '不限', code: '0'});
          this.district = this.uniqueArray(this.district, 'name');
        } else {
          this.district = [];
        }
      }
    }
  }

  uniqueArray(array, key) {
    var result = [array[0]];
    for (var i = 1; i < array.length; i++) {
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
  totalRecords: any;//查询到的总条数；
  bedroomUnlimt = false;

  /**
   * 列表搜索
   */
  search(qId) {
    for (var i in this.district) {
      if (this.params.area == this.district[i].estateId) {
      }
    }
    if (this.params.division == '99') {
      this.params.division = this.localStorageProvider.get('loginInfo')['user']['office']['area']['code'];
      delete this.params.division1
    }
    if (!this.params.area) {
      delete this.params.area1;
    }

    this.pageData = [];
    this.hasData = true;
    this.propertyProvider.pageSearch(1, this.params, qId).then(res => {
      this.category = false;
      if (res.success) {
        this.badHttp = false;

        this.totalRecords = res.data.totalRecords;
        this.firstPageData = res.data.result;
        // res.data.hasOwnProperty('result')
        if (res.data.result) {
          this.hasData = true;
          this.pageData = [];
          for (let i = 0; i < res.data.result.length; i++) {
            this.pageData.push(res.data.result[i]);
          }
          this.currentPage = 1;
          this.pageResult = res.data && res.data.result;
          if (res.data.result.length < 10) {
            this.all = true;
          }
        } else {
          // console.log('没有数据!');
          this.hasData = false;
        }
        this.totalPages = res.data.totalPages;
        //关闭搜索框子
        this.allClose();
        //户型搜索条件字显示
        if (this.searchFloorNum == 1) {
          this.searchFloorNum = 2;
        }
        if (this.searchFloorNum == 2 && this.params.bedrooms == '0') {
          this.searchFloorNum = 1;
        }
        //将下拉currentPage重置
        this.currentPage = 1;
      } else {
        this.badHttp = true;
      }

    }).catch(err => {
      // if(err.name=="TimeoutError"){
      //      this.badHttp = true;
      //  }
      if (err) {
        this.badHttp = true;
      }
      // console.log('错误返回',err);
    });
  }


  ionViewWillEnter() {
    this.statusBar.styleDefault();
  }

  ionViewDidLoad() {

    if (this.navParams.data.pageName == 'HomesearchPage') {
      this.search('propQuery');
    } else {
      this.search('properties');
    }

    this.imgHeader = this.configProvider.set().img;
//动画初始化
    for (var i = 1; i < 4; i++) {
      this.states[i] = 'close'
    }


  }

  //禁用调出键盘
  ionViewDidEnter() {
    let input = this.searchBar.getElementRef().nativeElement.querySelector('input');
    this.renderer.setElementAttribute(input, 'disabled', 'true');

    this.navBar.backButtonClick = () => {
      // this.navCtrl.push(HomesearchPage);
      this.navCtrl.popToRoot();
    };

  }

  datas: any;

  searchMore() {
    var data = this.localStorageProvider.get('searchMoreData');
    this.datas = data;
    // (data.orientation ==''||data.orientation ==null) &&
    // console.log(data.hasElevator,data.orientation)
    if (data) {
      if (data.tags != 0) {
        // console.log(2);
        return true;
      } else if (data.hasElevator != '') {
        // console.log(3)
        return true;
      }
      else if (data.orientation != '') {
        // console.log(4)
        return true;
      }
      else {
        return false;
      }

    } else {
      return false;
    }
  }

  pop = false;
  states = [];
  toggleNum: any;

  toggleSta(num) {
    // debugger;
    this.toggleNum = num;
    if (this.states[num] == 'close') {
      for (var i = 1; i < 4; i++) {
        if (i != num) {
          this.states[i] = this.states[i] === 'open' ? 'close' : 'close';
        }
      }
      this.states[num] = this.states[num] === 'close' ? 'open' : 'close';
      this.pop = true;
    } else {
      this.states[num] = this.states[num] === 'open' ? 'close' : 'close';
      this.pop = false;
    }
  }

  allClose() {
    this.states[this.toggleNum] = this.states[this.toggleNum] === 'open' ? 'close' : 'close';
    this.pop = false;
    this.category = false;
  }

  // searchEaste = false;
  searchFloorNum = 0; //初始化搜索次数

  ionViewWillLeave(slidingItem: ItemSliding){
    this.allClose();
    this.category=false;
    console.log(slidingItem)
    if(slidingItem){
      slidingItem.close();
    }
  }


  goFollow(item,slidingItem: ItemSliding) {
    this.openWin(FollowPage, {
      item:item
    });
    if(slidingItem){
      slidingItem.close();
    }
    console.log(slidingItem)
  }

  goAddLook(item,slidingItem: ItemSliding) {
    this.openWin(AddlookPage, {item: item,standardAddress:item.standardAddress});
    if(slidingItem){
      slidingItem.close();
    }
  }
  goLookHouse(item,slidingItem: ItemSliding) {
    this.openWin(LookhousePage, {item: item, propertyId: item.propertyId,params:this.params});
    if(slidingItem){
      slidingItem.close();
    }
  }
  goCloseHouse(item,slidingItem: ItemSliding) {
    this.openWin(ClosehousePage, {
      propertyid: item.propertyId,
      item:item,
    });
    if(slidingItem){
      slidingItem.close();
    }

  }

  goHouseDetail(item) {
    this.navCtrl.push(HousinfoPage,{propertyId:item.propertyId,status:this.params.status,params:this.params})
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
    if(refresher.pullingIcon !='arrow-dropdown'){
      refresher.pullingText='松开推荐'
    }
    this.propertyProvider.pageSearch(1,this.params,'propQuery').then(res=>{
      this.totalRecords = res.data.totalRecords;
      this.totalPages = res.data.totalPages;
      let newCount = this.checkUpdateCount(res.data.result);
      this.newCount=newCount;
      this.firstPageData = res.data.result;
      refresher.complete();
      this.pageResult =res.data&&res.data.result;

      if (res.data.result && res.data.result.length > 0) {
        this.pageData = [];
        for (let i = 0; i < res.data.result.length; i ++) {
          this.pageData.push(res.data.result[i])
        }
        this.badHttp = false;
        this.currentPage =1;
      }
      console.log('下拉pageResult',this.pageResult);

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
         // this.toast.defaultMsg('middle','暂无更新111');
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
        this.badHttp = true;this.pageData =[];this.hasData=false; this.all=true;
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

    if(this.params.division=='99'){
      this.params.division =this.localStorageProvider.get('loginInfo')['user']['office']['area']['code'];
      delete this.params.division1
    }
    if(!this.params.area){
      delete this.params.area1;
    }
      infiniteScroll.complete();
/*      if(this.currentPage==1){
        this.currentPage=2
      }else {
        this.currentPage++;
      }*/
      this.currentPage++;

      if (this.pageResult&&this.pageResult.length<10) {
        //如果都加载完成的情况，就直接 disable ，移除下拉加载
        //infiniteScroll.enable(false);
        //toast提示
        this.all = true;
      }else {
         this.all = false;
        if(this.pageResult ==''){this.all=true;return};
        this.propertyProvider.pageSearch(this.currentPage,this.params,'propQuery').then(res => {
          this.pageResult =res.data&&res.data.result;
          if (res.data&&res.data.result) {
            for (let i = 0; i < res.data.result.length; i ++) {
              this.pageData.push(res.data.result[i]);
            }
            if(res.data.result=''){this.all=true}

          }else {
            this.all = true;
          }
          console.log('全部',this.all);
        });
      }
      infiniteScroll.complete(function () {
        // console.log('数据请求完成');
      });

  }

  pic(data) {
    if (data) {
    return JSON.parse(data).imagePath+this.configProvider.set().smSign
    }
  }

  //房源标签转换（字符串转为数组）
  tagPipe(data) {
    if (data) {
      // console.log(data.split(","));
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
    {start:'0',end:'100',val:1},
    {start:'100',end:'500',val:2},
    {start:'500',end:'1000',val:3},
    {start:'1000',end:'1500',val:4},
    {start:'1500',end:'2000',val:5},
    {start:'2000',end:'2500',val:6},
    {start:'2500',end:'3000',val:7},
    {start:'3000',end:'3500',val:8},
    {start:'5000',end:'',val:9},
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

    this.starts=this.structure.lower;
    this.ends=this.structure.upper;
    // console.log(this.structure.lower,this.structure.upper);
    // this.selctPri=2;

    this.params.price = this.structure.lower.toString()+','+this.structure.upper.toString();

  }
  selctPri=1;
  name:any;
  // val:any;
  selectPrice(val){
    this.time=this.elevatorPipe(this.price);
    this.name=this.time.name;
    this.starts=this.time.start;
    this.ends=this.time.end;
    if(val==0){
      delete  this.params.price;
      this.structure= {lower:'0', upper:'600'};
      this.selctPri=1;
    }else {
      this.selctPri=2;
    }

    if(this.starts==undefined||this.ends==undefined){
      delete  this.params.price;
    }else{
      this.params.price = this.starts + ',' + this.ends;
    }

    if(this.starts,this.ends){
      this.structure= {lower: this.starts, upper:this.ends};
      // console.log(this.structure)
    }
    this.search('propQuery');
  }

  priceSea() {
    if (this.starts != undefined && this.ends != undefined) {
      this.selctPri = 2;
      this.price=false;
    } else {
      this.selctPri = 1;
    }
    this.search('propQuery');
  }



    allSearch(){
    this.events.subscribe('beventsSearchProperty', (params) => {
        if(!params){
          this.floorName = '';
          delete   this.params.estate
        }else {
          this.floorName = params.keyword;
          this.params.estate = params.id;
        }
        this.search('propQuery');
      // 取消订阅
      this.events.unsubscribe('beventsSearchProperty');
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
      // console.log('接收更多条件为: ', params );
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
                  // console.log('item重复',arry[i],i);
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

        console.log('接收到11',this.moreSearchData,this.params);
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
     this.params.area1 = item.id;
     if(item.name=='不限'){
      this.searchArea=this.selected.name;
      delete this.params.area1 ;
     }
    this.search('propQuery');
  }

  paramsBedrooms:any;
  selectBedRooms(item){
    this.params.bedrooms = this.paramsBedrooms;
    if(item.val==0) {
      delete this.params.bedrooms
    };
    if(this.params.division=='99'){
       this.params.division = this.localStorageProvider.get('loginInfo')['user']['office']['area']['code'];
       delete  this.params.division1;
    }
    console.log('选择bed',item,'参数');
    this.search('propQuery');
  }
  category =false;
  propertyCategory:any;
  // categoryPop=false;
  propertyCategoryData = [
    {name:'在售房源',status:'8',src:'./assets/imgs/pitch.png'},
    {name:'暂不出售',status:'64',src:'./assets/imgs/pitch.png'},
    {name:'无效房源',status:'128',src:'./assets/imgs/pitch.png'},
    {name:'他售房源',status:'256',src:'./assets/imgs/pitch.png'},
    {name:'成交房源',status:'32',src:'./assets/imgs/pitch.png'},
    {name:'我的房源',status:'16',src:'./assets/imgs/pitch.png'},
  ];

  showCategory(){
     this.category = !this.category;
    // if(this.category=='close'){
    //   this.category = this.category === 'close' ? 'open' : 'close';
    //   this.categoryPop=true;
    // }else {
    //   this.category = this.category === 'open' ? 'close' : 'close';
    //   this.categoryPop=false;
    // }
  }

  searchCategory(index,item){
    item.active = true;
    for(var i in this.propertyCategory ){
         if(i== index.toString()){
         }else{
           this.propertyCategory[i]['active'] = false;
          // item.active = false;
         }
    }
    if(item.status=='16'){ //我的房源
      this.params.agent = this.localStorageProvider.get('loginInfo')['user']['id'];
      delete  this.params.status;
    }else if(item.status=='8'){  //在售房源
      delete  this.params.agent;
      delete  this.params.status;
    }else {  //其他房源
      this.params.status=item.status;
      delete  this.params.agent;
      this.params.close='1';
    }
    this.category=false;
    this.all= false;
    this.search('propQuery');
  }

}

/**
 * 定义搜索条件类
 */
class  PropertyPageParams {
  area?:string; //商圈
  area1?:string;
  bedrooms?:string;//户室
  city?:string;
  division?:string;
  division1?:string;
  // estateId?:string;//小区
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
  status?:any;//房源状态
  agent?:string;//经纪人id
  close?:any;//排序
}

