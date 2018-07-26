import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import { PfollowrecordPage } from './pfollowrecord/pfollowrecord';
import { PlookrecordPage } from './plookrecord/plookrecord';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddhouseProvider} from "../../../../providers/addhouse/addhouse";
import {CustomerProvider} from "../../../../providers/customer/customer";
import {MypassengerPage} from "../../mypassenger/mypassenger";
import {SearchhousePage} from "../../../housing/housedetail/searchhouse/searchhouse";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {ToastComponent} from "../../../../components/toast/toast";
import {DescsPage} from "../descs/descs";
import {StatusBar} from "@ionic-native/status-bar";
/**
 * Generated class for the PassengerdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passengerdetail',
  templateUrl: 'passengerdetail.html',
})
export class PassengerdetailPage {
  showIntention=false;
  right=true;
  down=false;
  rest=false;
  restRight=true;
  restDown=false;

  customerSrcList = [];
  agentList = [];
  customeroGrageInfoList = [];
  //意向
  area = [];
  estateList = []; //楼盘列表
  district:any;
  tradingArea = [];//商圈数组
  intentionTradeCodeId:string;  //用于转换商圈
 data :any;
  estateName:'';
  selectOptionGs:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,public statusBar: StatusBar,
              public toast:ToastComponent,public nativePageTransitions: NativePageTransitions, public navParams: NavParams,private fb:FormBuilder,
              private customerProvider:CustomerProvider,private addhouseProvider:AddhouseProvider,
              public events: Events) {
    this.selectOptionGs={
      title:'客户归属'
    }
    this.customerProvider.getDetail(navParams.data.customerId).then(res=>{
        this.data = res;
        this.form.patchValue({
          customerId:this.data.customerId,
          customerName:this.data.customerName,
          customerGender:this.data.customerGender,
          customerPhone:this.data.customerPhone,
          customerSrc:this.data.customerSrc,
          agentId:this.data.agentId,
          customerGrade:this.data.customerGrade,
          //更多
          intentionDiviCode:this.data.intentionDiviCode,
          intentionTradeCode:this.data.intentionTradeCode,
          // intentionEstate:this.data.intentionEstate,
           minSpaceSize:this.data.minSpaceSize,
          maxSpaceSize:this.data.maxSpaceSize,
          minPrice:this.data.minPrice,
          maxPrice:this.data.maxPrice,
          minFloor:this.data.minFloor,
          maxFloor:this.data.maxFloor,
          minBedroom:this.data.minBedroom,
          maxBedroom:this.data.maxBedroom,
          minHall:this.data.minHall,
          maxHall:this.data.maxHall,
          decorations:this.data.decorations,
          //其他
          requiredDemands:this.data.requiredDemands,
          againstDemands:this.data.againstDemands,
          comments:this.data.comments,
          contactFreeTmArray:this.data.contactFreeTm&&this.data.contactFreeTm.split("-"),
          contactFreeTm1:this.data.contactFreeTm&&this.data.contactFreeTm.split("-")[0],
          contactFreeTm2:this.data.contactFreeTm&&this.data.contactFreeTm.split("-")[1],
        });
    });
    //客户来源
    this.customerProvider.customerSrcInfo().then(res=>{
      this.customerSrcList = res;
    });
    //客户归属
    this.customerProvider.agentList().then(res=>{
      this.agentList = res;
    });
    //客户等级
    this.customerProvider.customeroGrageInfo().then(res=>{
      this.customeroGrageInfoList = res;
    });
    //区域
    this.customerProvider.area().then(res=>{
      this.area = res.data.distrs;
    });
    //商圈
    this.customerProvider.tradingArea().then(res=>{
      this.tradingArea = res;
    });
    //楼盘列表
    // this.addhouseProvider.estateListSelect().then(res=>{
    //   this.estateList = res.data.result;
    // });
  }
  selectTitle(data){
    var title = {title:data};
    return title;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerdetailPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  form:FormGroup =this.fb.group({
    customerId:['',Validators.required],
    customerName:['',Validators.required],//客户名称
    customerGender :['',Validators.required],//客户性别
    customerPhone:['',Validators.required],//客户电话
    customerSrc:['',Validators.required], //客户来源
    agentId:['',Validators.required],//归属人id
    customerGrade:['',],//客户等级
    intentionDiviCode :[''],//意向区域
    intentionTradeCode :[''],//意向商圈
    intentionEstate :[''],//意向楼盘
    minSpaceSize:[''],//最小面积
    maxSpaceSize:[''],//最大面积
    minPrice :[''],//最低价格
    maxPrice:[''],//最高价格
    minFloor:[''],//最低楼层
    maxFloor:[''],//最高楼层
    minBedroom:[''],//最少居室
    maxBedroom:[''],//最多居室
    minHall:[''],//最少厅
    maxHall:[''],//最多厅
    decorations:[],//装修要求
    requiredDemands:[''],//核心要求
    againstDemands:[''],//核心抵触点
    contactFreeTmArray:[],//免打扰时间
    contactFreeTm1:[''],//免打扰时间开始
    contactFreeTm2:[''],//免打扰时间结束
    comments:[''],//备注
  });

  clickIntention(){
    if(this.showIntention==false ){
      this.showIntention=true;
      this.right=false;
      this.down=true;
    }else{
      this.showIntention=false;
      this.right=true;
      this.down=false;
    }
  }

  rests(){
    if(this.rest==false ){
      this.rest=true;
      this.restRight=false;
      this.restDown=true;
    }else{
      this.rest=false;
      this.restRight=true;
      this.restDown=false;
    }
  }

  passengerLook(){
    this.openWin(PlookrecordPage,{
      id:this.data,
    })
  }
  passengerFollow(){
    this.openWin(PfollowrecordPage,{
      id:this.data,
    })
  }


  goserach(){
    this.events.subscribe('bevents', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据为: ', params);
      // this.form.value.estateName = params.estateName;
      // this.form.value.estateId =  params.estateId;
      this.estateName = params.keyword;
      this.form.controls['intentionEstate'].setValue(params.id);

      // 取消订阅
      this.events.unsubscribe('bevents');
    });
    this.openWin(SearchhousePage);
  }
  save(){
    console.log('编辑客户',this.form.value);

    // var body = null;
    // for(var key in this.form.value){
    //   body = body+'&'+key+'='+this.form.value[key]+'';
    // }
    // body = body.slice(5);
    // console.log('body:',body);
    this.customerProvider.update(this.form.value).then(res=>{
      if (res.success){
        this.toast.msg('修改客户成功!');
        this.openWin(MypassengerPage);
      }
    },err=>{
      alert('修改失败！');
    })

  }


  desc(val){

    this.events.subscribe('content', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据为: ', params);
      if(params){
        if(params.num==1){
          this.form.controls['requiredDemands'].setValue(params.val);
        };
        if(params.num==2){
          this.form.controls['againstDemands'].setValue(params.val);
        };
        if(params.num==3){
          this.form.controls['comments'].setValue(params.val);
        };
      }

      // 取消订阅
      this.events.unsubscribe('content');
    });


    if(val==1){
      this.openWin(DescsPage,{
        val:1,
        content:this.form.value.requiredDemands
      });
    }
    if(val==2){
      this.openWin(DescsPage,{
        val:2,
        content:this.form.value.againstDemands
      });
    }
    if(val==3){
      this.openWin(DescsPage,{
        val:3,
        content:this.form.value.comments
      });
    }
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
