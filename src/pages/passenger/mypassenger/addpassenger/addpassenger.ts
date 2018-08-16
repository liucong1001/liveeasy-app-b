import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, Navbar, NavController, NavParams,Content} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerProvider} from "../../../../providers/customer/customer";
import {MypassengerPage} from "../mypassenger";
import {AddhouseProvider} from "../../../../providers/addhouse/addhouse";
import {SearchhousePage} from "../../../housing/housedetail/searchhouse/searchhouse";
import {ErrorMessage} from "../../../../components/valid-error/valid-error";
import {ToastComponent} from "../../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {StatusBar} from "@ionic-native/status-bar";
import {DescsPage} from "../descs/descs";
import {LocalStorageProvider} from "../../../../providers/local-storage/local-storage";
import {ArryCodeValuePipe} from "../../../../pipes/arry-code-value/arry-code-value";
/**
 * Generated class for the AddpassengerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpassenger',
  templateUrl: 'addpassenger.html',
})
export class AddpassengerPage {
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
  shangQuan = [];//保存商圈
  intentionTradeCodeId:string;  //用于转换商圈
  type:string="";
  aa:any;
  localCode:any;
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams,private fb:FormBuilder,public toast:ToastComponent,public localStorageProvider: LocalStorageProvider,
              private customerProvider:CustomerProvider,private addhouseProvider:AddhouseProvider,
              public events: Events,public statusBar: StatusBar
  ) {

    this.localCode = this.localStorageProvider.get('codeData');
    //客户来源
     this.customerSrcList = new ArryCodeValuePipe().transform(this.localCode,'cms_src');
    //客户归属
    this.customerProvider.agentList().then(res=>{
       this.agentList = res;
       console.log(this.agentList)
      for(var i in this.agentList){
        if(this.agentList[i].id == this.localStorageProvider.get('loginInfo').id){
          console.log(this.agentList[i].id)
          this.form.patchValue({
            agentId:this.agentList[i].id
          })
        }
      }
    });
   //客户等级
   this.customeroGrageInfoList = new ArryCodeValuePipe().transform(this.localCode,'customer_grade');
   this.area = this.localStorageProvider.get('area');
   this.scrollTo()
  }
  @ViewChild(Content) content: Content;

  scrollTo() {
    window.addEventListener('native.keyboardshow', (e: any) => {
      this.content.scrollTo(0, e.keyboardHeight);
    });
  }


  selectTitle(data){
    var title = {title:data};
    return title;
  }
  //状态栏文字颜色修改-白色
  ionViewWillEnter() {
    this.statusBar.styleLightContent();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpassengerPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }


  form:FormGroup =this.fb.group({
    customerName:['',Validators.required],//客户名称
    customerGender :['1',Validators.required],//客户性别
    customerPhone:['',[Validators.required, Validators.pattern(/^[1][3,4,5,7,8][0-9]{9}$/)]],//客户电话
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
    contactFreeTmArray:[[]],//免打扰时间
    contactFreeTm1:[''],//免打扰时间开始
    contactFreeTm2:[''],//免打扰时间结束
    comments:[''],//备注
  });

  //表单验证消息
  errors={
    customerName:[
      new ErrorMessage('required','客户名称必须要填写！'),
    ],
    customerPhone:[
      new ErrorMessage('required','电话必须要填写！'),
      new ErrorMessage('pattern', '手机号码格式不正确！'),
    ],
    customerSrc:[
      new ErrorMessage('required','客户来源必须要填写！'),
    ],
    agentId:[
      new ErrorMessage('required','客户归属必须要填写！'),
    ],

  };

  //验证面积
  areaCheck=false;
  priceCheck=false;
  floorCheck=false;
  roomCheck=false;
  hallCheck=false;
  areas(){
    if(this.form.value.minSpaceSize&&this.form.value.maxSpaceSize){
      if(parseInt(this.form.value.maxSpaceSize) < parseInt(this.form.value.minSpaceSize)){
        console.log('结束面积不能小于开始面积');
        this.areaCheck = true;
      }else {
        this.areaCheck = false;
      }
    }
    console.log(this.form.value.minSpaceSize,)
  }
  //价格
  prices(){
    if(this.form.value.minPrice&&this.form.value.maxPrice){
      if(parseInt(this.form.value.maxPrice) < parseInt(this.form.value.minPrice)){
        console.log('最高价格不能小于最低价格');
        this.priceCheck = true;
      }else {
        this.priceCheck = false;
      }
    }
  }
  //楼层
  floors(){
    if(this.form.value.minFloor&&this.form.value.maxFloor){
      if(parseInt(this.form.value.maxFloor) < parseInt(this.form.value.minFloor)){
        console.log('最高楼不能小于最低楼层');
        this.floorCheck = true;
      }else {
        this.floorCheck = false;
      }
    }
  }
  //居室
  rooms(){
    if(this.form.value.minBedroom&&this.form.value.maxBedroom){
      if(parseInt(this.form.value.maxBedroom) < parseInt(this.form.value.minBedroom)){
        console.log('最多居室不能小于最少居室');
        this.roomCheck = true;
      }else {
        this.roomCheck = false;
      }
    }
  }
  //客厅
  halls(){
    if(this.form.value.minHall&&this.form.value.maxHall){
      if(parseInt(this.form.value.maxHall) < parseInt(this.form.value.minHall)){
        console.log('最多厅不能小于最少厅');
        this.hallCheck = true;
      }else {
        this.hallCheck = false;
      }
    }
  }



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
  //
  // areaChange(event){
  //
  //   this.tradingArea = [];
  //   if(this.shangQuan){
  //     for(var i in this.shangQuan){
  //       if(this.shangQuan[i].code.substring(0,6)==event){
  //         this.tradingArea.push(this.shangQuan[i]);
  //       }
  //     }
  //   }
  //
  // }
  estateName='';
  goserach(){
    this.events.subscribe('bevents', (params) => {
      // 接收B页面发布的数据
      console.log('接收数据content为: ', params);
      // this.form.value.estateName = params.estateName;
      // this.form.value.estateId =  params.estateId;
      this.estateName = params.keyword;
      this.form.controls['intentionEstate'].setValue(params.id);

      // 取消订阅
      this.events.unsubscribe('bevents');
    });
    this.navCtrl.push(SearchhousePage);
  }

  estateChange(Value){
    console.log('value',Value);
    //哥
    // this.form.controls['adminDivisionCode'].setValue(Value.site);
    // this.form.controls['estateName'].setValue(Value.keyword);
    if(Value){
      this.estateName = Value.keyword;
      this.form.controls['intentionEstate'].setValue(Value.id);
      console.log('表单',this.form.value);
    }

  }

  getcontactFreeTm1(event){
    // this.form.value.contactFreeTmArray
    var startTime = event.hour +':'+event.minute ;
    this.form.value.contactFreeTmArray[0] = startTime;
     console.log('时间',event,startTime);
  }

  getcontactFreeTm2(event){
    var endTime = event.hour +':'+event.minute ;
    this.form.value.contactFreeTmArray[1] = endTime;
    console.log('表单',this.form.value);
  }


  save(){
    console.log('表单客户',this.form.value);
    this.customerProvider.add(this.form.value).then(res=>{
      if (res.success){
        this.toast.msg('录入成功!');
        this.navCtrl.push(MypassengerPage);
      }
    },err=>{
       alert('录入失败！');
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

  areaChange(data){
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
