import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, Navbar, NavController, NavParams, Select} from 'ionic-angular';
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
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import {ArryCodeValuePipe} from "../../../../pipes/arry-code-value/arry-code-value";
import {ErrorMessage} from "../../../../components/valid-error/valid-error";
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
  @ViewChild('selectOne') selectOne: Select;
  @ViewChild('selectTwo') selectTwo: Select;
  @ViewChild('selectThree') selectThree: Select;
  @ViewChild('selectFour') selectFour: Select;
  @ViewChild('selectFive') selectFive: Select;
  @ViewChild('selectSix') selectSix: Select;
  @ViewChild('selectSev') selectSev: Select;
  localCode:any;
  constructor(public navCtrl: NavController,public statusBar: StatusBar,
              public toast:ToastComponent,public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams,private fb:FormBuilder,
              private customerProvider:CustomerProvider,private addhouseProvider:AddhouseProvider,
              public events: Events,  public localStorageProvider: LocalStorageProvider,) {
    this.selectOptionGs={
      title:'客户归属'
    };
    this.area = this.localStorageProvider.get('area');
    this.localCode = this.localStorageProvider.get('codeData');
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
          intentionEstate:this.data.intentionEstate,
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
          // decorationArray:this.data.decorationArray,
          decorationArrs:this.data.decorationArrs,
          //其他
          requiredDemands:this.data.requiredDemands,
          againstDemands:this.data.againstDemands,
          comments:this.data.comments,
          contactFreeTmArray:this.data.contactFreeTm&&this.data.contactFreeTm.split("-"),
          contactFreeTm1:this.data.contactFreeTm&&this.data.contactFreeTm.split("-")[0],
          contactFreeTm2:this.data.contactFreeTm&&this.data.contactFreeTm.split("-")[1],
        });
        for(var item of this.area){
           if(item.code==this.data.intentionDiviCode){
              this.areaChange(item);
           }
        }
        this.estateName=this.data.estateName;
    });
    //客户来源
    this.customerSrcList = new ArryCodeValuePipe().transform(this.localCode,'cms_src');
    //客户归属
    this.customerProvider.agentList().then(res=>{
      this.agentList = res;
    });
    //客户等级
    this.customeroGrageInfoList = new ArryCodeValuePipe().transform(this.localCode,'customer_grade');

  }

  closeSelect(){
    this.selectOne.close();
    this.selectTwo.close();
    this.selectThree.close();
    this.selectFour.close();
    this.selectFive.close();
    this.selectSix.close();
    this.selectSev.close();
  }

  ionViewWillLeave(){
    this.closeSelect();
  }

  selectTitle(data){
    var title = {title:data};
    return title;
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad PassengerdetailPage');
    this.navBar.backButtonClick = () => {
      this.navCtrl.push(MypassengerPage)
    };
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }
  form:FormGroup =this.fb.group({
    customerId:['',Validators.required],
    customerName:['',Validators.required],//客户名称
    customerGender :['',Validators.required],//客户性别
    customerPhone:['',[Validators.required, Validators.pattern(/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/)]],//客户电话
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
    decorationArray:[],//装修要求
    decorationArrs:[],//装修要求
    requiredDemands:[''],//核心要求
    againstDemands:[''],//核心抵触点
    contactFreeTmArray:this.fb.array([
      this.fb.group({
      })
    ]),//免打扰时间
    contactFreeTm1:[''],//免打扰时间开始
    contactFreeTm2:[''],//免打扰时间结束
    comments:[''],//备注
  });
/*[this.fb.array([
  this.fb.group({
    // contact:[''],
    // contactType:['mobile'],
    // contactInfo:[''],
    // sex:[''],
    // desc:[''],
  })
])*/

  //表单验证消息
  errors={
    customerPhone:[
      new ErrorMessage('required','电话必须要填写！'),
      new ErrorMessage('pattern', '手机号码格式不正确！'),
    ],
    customerName:[
      // new ErrorMessage('required','业主姓名必须要填写！'),
      new ErrorMessage('pattern','请填写中文或英文'),
    ],
    minSpaceSize:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    maxSpaceSize:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    minPrice:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    maxPrice:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    minFloor:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    maxFloor:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    minBedroom:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    maxBedroom:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    minHall:[
      new ErrorMessage('pattern','请填写数字'),
    ],
    maxHall:[
      new ErrorMessage('pattern','请填写数字'),
    ],
  };

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
  isDisabled = false;
  save(){
    this.isDisabled = true;
    this.form.value.contactFreeTmArray = [];
    this.form.value.contactFreeTmArray[0]= this.form.value.contactFreeTm1;
    this.form.value.contactFreeTmArray[1]= this.form.value.contactFreeTm2;
    this.form.value.decorationArray=this.form.value.decorationArrs;
     console.log('提交',this.form.value);
    this.customerProvider.update(this.form.value).then(res=>{
      if (res.success){
        this.toast.msg('修改客户成功!');
        this.openWin(MypassengerPage);
        this.isDisabled = false;
      }
    },err=>{
      this.isDisabled = false;
      this.toast.error('修改失败！');
    })

  }


  desc(val){

    this.events.subscribe('content', (params) => {
      // 接收B页面发布的数据
      // console.log('接收数据为: ', params);
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



  /**
   验证
   */
  //验证面积
  areaCheck=false;
  priceCheck=false;
  floorCheck=false;
  roomCheck=false;
  hallCheck=false;
  areaTips=false;
  areas(){
    if(this.form.value.minSpaceSize||this.form.value.maxSpaceSize){
      if(parseFloat(this.form.value.maxSpaceSize) < parseFloat(this.form.value.minSpaceSize)){
        // console.log('结束面积不能小于开始面积');
        this.areaCheck = true;
      }else {
        this.areaCheck = false;
      }
      var reg = /^[0-9]*$/;
      if (!reg.test(this.form.value.maxSpaceSize || this.form.value.minSpaceSize)){
        this.areaTips=true;
      }else {
        this.areaTips=false;
      }
    }
    // console.log(this.form.value.minSpaceSize,)
  }
  //价格
  priceTips=false;
  prices(){
    if(this.form.value.minPrice||this.form.value.maxPrice){
      if(parseFloat(this.form.value.maxPrice) < parseFloat(this.form.value.minPrice)){
        // console.log('最高价格不能小于最低价格');
        this.priceCheck = true;
      }else {
        this.priceCheck = false;
      }
      var reg = /^[1-9]\d*\,\d*|[1-9]\d*$/;
      if (!reg.test(this.form.value.maxPrice || this.form.value.minPrice)){
        this.priceTips=true;
      }else {
        this.priceTips=false;
      }
    }
  }
  //楼层
  floorTips=false;
  floors(){
    if(this.form.value.minFloor||this.form.value.maxFloor){
      if(parseInt(this.form.value.maxFloor) < parseInt(this.form.value.minFloor)){
        // console.log('最高楼不能小于最低楼层');
        this.floorCheck = true;
      }else {
        this.floorCheck = false;
      }
      var reg = /^[0-9]*$/;
      if (!reg.test(this.form.value.minFloor || this.form.value.maxFloor)){
        this.floorTips=true;
      }else {
        this.floorTips=false;
      }
    }
  }
  //居室
  roomTipOne=false;
  roomTipTwo=false;
  rooms(){
    if(this.form.value.minBedroom&&this.form.value.maxBedroom){
      if(parseInt(this.form.value.maxBedroom) < parseInt(this.form.value.minBedroom)){
        // console.log('最多居室不能小于最少居室');
        this.roomCheck = true;
      }else {
        this.roomCheck = false;
      }
    }
    var reg = /^[0-9]*$/;
    if (!reg.test(this.form.value.minBedroom || this.form.value.maxBedroom)){
      this.roomTipOne=true;
      if(this.roomTipTwo){
        this.roomTipTwo=false;
      }
    }else{
      this.roomTipOne=false;

    }
    if(this.form.value.minBedroom==0 || this.form.value.maxBedroom==0){
      if(this.roomTipOne){
        this.roomTipOne=false;
      }
      this.roomTipTwo=true
    }else {
      this.roomTipTwo=false;

    }
  }
  //客厅
  hallTips=false;
  halls(){
    if(this.form.value.minHall||this.form.value.maxHall){
      if(parseInt(this.form.value.maxHall) < parseInt(this.form.value.minHall)){
        // console.log('最多厅不能小于最少厅');
        this.hallCheck = true;
      }else {
        this.hallCheck = false;
      }
      var reg = /^[0-9]*$/;
      if (!reg.test(this.form.value.minHall  || this.form.value.maxHall)){
        this.hallTips=true;
      }else {
        this.hallTips=false;
      }
    }
  }

  getcontactFreeTm1(event){
    if( event.hour<10 ){event.hour='0'+event.hour}
    if( event.minute<10 ){event.minute='0'+event.minute}
    var startTime = event.hour +':'+event.minute ;
    this.form.value.contactFreeTm1 = startTime;
    console.log('表单',this.form.value.contactFreeTm1);
  }

  getcontactFreeTm2(event){
    if( event.hour<10 ){event.hour='0'+event.hour}
    if( event.minute<10 ){event.minute='0'+event.minute}
    var endTime = event.hour +':'+event.minute ;
    this.form.value.contactFreeTm2 = endTime;
     console.log('表单',this.form.value.contactFreeTm2);
  }

  areaChange(data){
    // console.log('区域',data);
    this.tradingArea = data.area;
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
