import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, Nav, NavController, NavParams, Navbar, Content} from 'ionic-angular';
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {TabsPage} from "../../tabs/tabs";
import {HousingPage} from "../housing";
import {MyApp} from "../../../app/app.component"
import { NgZone  } from '@angular/core';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {ArryCodeValuePipe} from "../../../pipes/arry-code-value/arry-code-value";
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
    tagsList:[],
    orientation:0,
    orientationArry:[],
    orientationList:[],
    hasElevator:0,
    hasElevatorArry:[],
    hasElevatorList:[],
    decoration:0,
    decorationArry:[],
    decorationList:[],
    buildType:0,
    buildTypeArry:[],
    buildTypeList:[],
    spaceSize:0,
    // 50,100;150,200  建筑面积多选
    spaceSizeArry:[],
    spaceSizeList:[],
    position:0,
    positionArry:[],
    positionList:[],
  };
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild(Content) content: Content;
  selected:any;
  selected1:any;
  selected2:any;
  rootPage:any = MyApp ;
  selected3:any;
  selected4:any;
  selected5:any;
  selected6:any;
  selected7:any;
  structure: any = {lower: 0, upper: 1000};
  spaceSize:any ;
  localCode:any;
  cxJSON:Array<{name:string;val:string}>;
  decorationJson:Array<{name:string;val:string}>;
  buildTypeJson:Array<{name:string;val:string}>;
  qtJSON:any;
  dtJson:any;
  floorJson:any;
  buzzTypeJson:any;
  spaceSizeJson:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public localStorageProvider: LocalStorageProvider,
              public events: Events, private zone: NgZone,public statusBar: StatusBar,
              public nativePageTransitions: NativePageTransitions,) {
    //朝向
    this.localCode = this.localStorageProvider.get('codeData');
    this.initData();

  }

  //初始化数据
  initData(){
    //朝向
    this.cxJSON = new ArryCodeValuePipe().transform(this.localCode,'orientation');
    this.cxJSON.unshift({name:'全部',val:''});
    //装修
    this.decorationJson = new ArryCodeValuePipe().transform(this.localCode,'decoration');
    this.decorationJson.unshift({name:'全部',val:''});
    //建筑类型
    this.buildTypeJson = new ArryCodeValuePipe().transform(this.localCode,'building_type');
    this.buildTypeJson.unshift({name:'全部',val:''});

    //更多
    //其他
    this.qtJSON = [
      {name:'只看我的房源',val:0},
      {name:'待处理关闭申请房源',val:1},
      {name:'待审核实勘房源',val:2},
      {name:'待确认钥匙房源',val:3},
    ];

    //电梯
    this.dtJson = [
      {name:'全部',val:''},
      {name:'无电梯',val:'1'},
      {name:'有电梯',val:'2'},
    ];

    //楼层
    this.floorJson = [
      {name:'地下',val:'2'},
      {name:'底层',val:'4'},
      {name:'中层',val:'8'},
      {name:'高层',val:'16'},
    ];

    //房屋用途
   this.buzzTypeJson = [
      {name:'全部',val:''},
      {name:'出售',val:'1'},
      {name:'出租',val:'2'},
      {name:'租售',val:'3'},
    ];
   //建筑面积
   this.spaceSizeJson = [
      {name:'',start:0,end:0, val:'0'},
      {name:'50㎡',start:0,end:50, val:'1'},
      {name:'50-70㎡',start:50,end:70, val:'2'},
      {name:'70-90㎡',start:70,end:90, val:'3'},
      {name:'90-110㎡',start:90,end:110, val:'4'},
      {name:'110-130㎡',start:110,end:130, val:'5'},
      {name:'130-150㎡',start:130,end:150, val:'6'},
      {name:'150-200㎡',start:150,end:200, val:'7'},
      {name:'200㎡以上',start:200,end:9999, val:'8'},
    ];
  }




  trackByFn(index, item) {
    return index;
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
    //标签
    this.tagsList=this.localStorageProvider.get('tagsListPage');

    if(this.localStorageProvider.get('searchMoreData')){
      this.searchMoreData = this.localStorageProvider.get('searchMoreData');
    }
  }

  ionViewDidEnter(){

  }


  initTags(item,attr,arryAttr){
    if(this.searchMoreData[arryAttr].length>1){
      //初始化选中状态
      this.searchMoreData[arryAttr] = this.searchMoreData[arryAttr];
      if(this.searchMoreData[arryAttr].length>1){
        // console.log('多个');
        for(var i in this.searchMoreData[arryAttr] ){
          if(item[attr] == this.searchMoreData[arryAttr][i] ){
            item.active = true;
            return item.active;
          }
        }
      }

    }

    if(this.searchMoreData[arryAttr].length==1){
       // console.log('赋值赋值！！',this.searchMoreData[arryAttr]);
      if(item[attr] == this.searchMoreData[arryAttr][0] ){
        item.active = true;
        return item.active;
      }
    }
  }

  isActiveBase(item,val,sumAttr,selected){
    if(item&&item[val]==this.searchMoreData[sumAttr]){
      // console.log('没有select');
      return  true;
    }else{
      // console.log('选择',this[selected]);
      return this[selected] == item;
    }
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
    // this.searchMoreData.tagsArry =this.searchMoreData.tagsArry;
    this.searchMoreData.tags =0;
    for(var i in this.searchMoreData.tagsArry){
      // this.searchMoreData.tags+=this.searchMoreData.tagsArry[i];
      this.searchMoreData.tags+=this.searchMoreData.tagsArry[i];
    }
    // console.log('tags参数',item,this.searchMoreData['tagsArry']);
  }

   flag=false;

   choseOrientation(item){
     item.active = !item.active;
     if(item.active) {
       this.searchMoreData.orientationArry.push(item.val);
     }else {
       var indexArry  = this.searchMoreData.orientationArry.indexOf(item.val);
       if(indexArry>-1){this.searchMoreData.orientationArry.splice(indexArry,1)}
     }
     // this.searchMoreData.tagsArry =this.searchMoreData.tagsArry;
     this.searchMoreData.orientation =0;
     for(var i in this.searchMoreData.orientationArry){
       // this.searchMoreData.tags+=this.searchMoreData.tagsArry[i];
       this.searchMoreData.orientation+=this.searchMoreData.orientationArry[i];
     }
     // console.log('orientation参数',item,this.searchMoreData['orientationArry']);
   }



  //朝向 orientation
  choseMultIple(item,attrName,attrNameArry,attrNameList){
    item.active = !item.active;
    var value = item.val;

    if(item.active){
      this.searchMoreData[attrNameArry].push(parseFloat(value));
      this.searchMoreData[attrNameList].push(item);
    }else {
      var indexArry  = this.searchMoreData[attrNameArry].indexOf(parseFloat(value));
      if(indexArry>-1){this.searchMoreData[attrNameArry].splice(indexArry,1)};

      for(var key in this.searchMoreData[attrNameList]){
           if(this.searchMoreData[attrNameList][key]['val']==value){
             this.searchMoreData[attrNameList].splice(key,1);
           }
      }
    }
    this.searchMoreData[attrName] = 0;
    // if(this.searchMoreData[attrNameArry]==false){this.searchMoreData[attrName] = 0;}
    for(var i in this.searchMoreData[attrNameArry]){
      this.searchMoreData[attrName]+= parseInt(this.searchMoreData[attrNameArry][i]) ;
    }
     // console.log('查询',item,this.searchMoreData[attrNameArry],this.searchMoreData[attrNameList]);
  }



  multiplyReset(attr,attrArry,attrList){
    this.searchMoreData[attrArry] = [];
    this.searchMoreData[attr] = 0;
    this.searchMoreData[attrList] = [];
  }

  resetClass(attrName,attrNameArry,attrNameList){
      var arryActive = this.searchMoreData [attrNameList];
     if(arryActive){
         for(var i in arryActive){
              arryActive[i]['active'] = false;
           // console.log('rest',arryActive[i]);
           // this.choseMultIple(arryActive[i],attrName,attrNameArry,attrNameList)
         }
       this.searchMoreData [attrNameList] = [];
       // console.log('清楚之后', this.searchMoreData [attrNameList]);
     }
    this.searchMoreData[attrNameArry] = [];
    this.searchMoreData[attrName] = 0;
    this.content.resize();
    // this.localStorageProvider.set('searchMoreData',this.searchMoreData);
    // this.choseMultIple(item,'orientation','orientationArry');
  }



  reset(){
    this.tagsList=this.localStorageProvider.get('tagsListPage');
    //清除朝向
    // this.choseDirect(this.cxJSON[0]);
    this.multiplyReset('tags','tagsArry','tagsList');
    this.multiplyReset('orientation','orientationArry','orientationList');
    this.multiplyReset('hasElevator','hasElevatorArry','hasElevatorList');
    this.multiplyReset('spaceSize','spaceSizeArry','spaceSizeList');
    this.multiplyReset('decoration','decorationArry','decorationList');
    this.multiplyReset('buildType','buildTypeArry','buildTypeList');
    this.multiplyReset('position','positionArry','positionList');
    // console.log('清除',this.searchMoreData);
    this.initData();
    this.localStorageProvider.del('searchMoreData');
  }

  confirm(){
    // console.log('确定',this.searchMoreData);
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
  };
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  onChange($event){
    // console.log('价格',this.spaceSize);
  }

}
