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
  spaceSize:any ;
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
      // alert(this.searchMoreData.tagsArry.length);
      //建筑面积赋状态

      // spaceSizeVal
       this.spaceSize =  this.searchMoreData['spaceSizeVal'];
      // {name:'110-130㎡',start:110,end:130, val:'5'},
      // this.isActive7(this.spaceSizeJson[3]);
    }
    console.log('进入 MorePage',this.searchMoreData);
  }

  initTags(item){
    if(this.searchMoreData.tagsArry.length>1){
      //初始化选中状态
      this.searchMoreData.tagsArry = this.searchMoreData.tagsArry;

      if(this.searchMoreData.tagsArry.length>1){
        console.log('多个');
        for(var i in this.searchMoreData.tagsArry ){
          if(item.tagCode == this.searchMoreData.tagsArry[i] ){
            item.active = true;
            return item.active;
          }
        }
      }

      if(this.searchMoreData.tagsArry.length==1){
        console.log('单个');
        // for(var i in this.searchMoreData.tagsArry ){
          if(item.tagCode == this.searchMoreData.tagsArry[i] ){
            return true
            // item.active =true;
            // return item.active;
          }
        // }
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

  //电梯
  dtJson = [
    {name:'全部',val:''},
    {name:'无',val:'0'},
    {name:'有',val:'1'},
  ];
  //装修
  decorationJson = [
    {name:'全部',val:''},
    {name:'毛坯',val:'1'},
    {name:'简装',val:'2'},
    {name:'中等装修',val:'3'},
    {name:'精装',val:'4'},
    {name:'豪装',val:'5'},
  ];
  //楼层
  floorJson = [
    {name:'地下',val:'-1'},
    {name:'底层',val:'1'},
    {name:'中层',val:'2'},
    {name:'高层',val:'3'},
  ];
  //建筑类型
  buildingTypeJson=[
    {name:'全部',val:''},
    {name:'未知',val:'0'},
    {name:'塔楼',val:'1'},
    {name:'板楼',val:'2'},
    {name:'板塔结合',val:'3'},
  ];
  //房屋用途
  buzzTypeJson = [
    {name:'全部',val:''},
    {name:'出售',val:'1'},
    {name:'出租',val:'2'},
    {name:'租售',val:'3'},
  ];
  spaceSizeJson = [
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
    if(this.selected==item){
       this.choseDirect(this.cxJSON[0]);
    }else {
      this.selected = item;
      this.searchMoreData.orientation  = item.val;
    }


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
    if(this.selected3 == item){
      this.choseDt(this.dtJson[0]);
    }else {
      this.selected3 = item;
      this.searchMoreData.hasElevator=item.val;
    }

    console.log(item.val)
  }
  // this.selected3 = item;
  selected4:any;
  //装修
  chosedecoration(item){
    if( this.selected4 == item){
      this.chosedecoration(this.decorationJson[0]);
    }else{
      this.selected4 = item;
      this.searchMoreData['decoration'] = item.val;
      this.searchMoreData['decorationName'] = item.name;
    }

  }
  selected5:any;
  //建筑类型
  chosebuildingType(item){
    if(this.selected5 == item){
      this.chosebuildingType(this.buildingTypeJson[0]);
    }else{
      this.selected5 = item;
      this.searchMoreData['buildingType'] = item.val;
      this.searchMoreData['buildingTypeName'] = item.name;
    }
  }
  //房屋用途
  chosebuzzType(item){
   this.searchMoreData['buzzType'] = item.val;
    this.searchMoreData['buzzTypeName'] = item.name;
   console.log('搜索条件',this.searchMoreData);
  }
  //建筑面积
  choseSpaceSize(item){
    if(this.spaceSize ==item.val){
      this.choseSpaceSize(this.spaceSizeJson[0]);
    }else {
      this.spaceSize =item.val;
      this.searchMoreData['spaceSizeStart'] =   item.start.toString();
      this.searchMoreData['spaceSizeEnd'] = item.end.toString();
      this.searchMoreData['spaceSizeVal'] = item.val;
      this.searchMoreData['spaceSizeName'] = item.name;
      console.log('选择的面积',item);
    }

  }
  isActive1(item){
    if(item.tagCode==this.searchMoreData['tags']){
      return  true;
    }else{
      return this.selected === item;
    }
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
  isActive4(item){
    if(item.val==this.searchMoreData['decoration']){
      return  true;
    }else{
      return this.selected === item;
    }
  }

  isActive5(item){
    if(item.val==this.searchMoreData['buildingType']){
      return  true;
    }else{
      return this.selected === item;
    }
  }

  isActive6(item){
    if(item.val==this.searchMoreData['buzzType']){
      return  true;
    }else{
      return this.selected === item;
    }
  }
  //建筑面积
  isActive7(item){
    if(item.val==this.spaceSize){
      return  true;
    }else{
      return this.selected === item;
    }
  }
//楼层
  isActive8(item){
    if(item.val==this.spaceSize){
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
    this.choseSpaceSize(this.spaceSizeJson[0]);
    this.chosedecoration(this.decorationJson[0]);
    this.chosebuildingType(this.buildingTypeJson[0]);
    this.chosebuzzType(this.buildingTypeJson[0]);
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
  };
 //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  onChange($event){
    console.log('价格',this.spaceSize);
  }

}
