import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { PfollowrecordPage } from './pfollowrecord/pfollowrecord';
import { PlookrecordPage } from './plookrecord/plookrecord';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddhouseProvider} from "../../../../providers/addhouse/addhouse";
import {CustomerProvider} from "../../../../providers/customer/customer";
import {MypassengerPage} from "../../mypassenger/mypassenger";
import {SearchhousePage} from "../../../housing/housedetail/searchhouse/searchhouse";
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
  constructor(public navCtrl: NavController, public navParams: NavParams,private fb:FormBuilder,
              private customerProvider:CustomerProvider,private addhouseProvider:AddhouseProvider,
              public events: Events) {

    this.customerProvider.getDetail(navParams.data.customerId).then(res=>{
       this.data = res;
       console.log('详情',this.data);

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
          minFloor:this.data.minFloor,
          maxFloor:this.data.maxFloor,
          minBedroom:this.data.minBedroom,
          maxBedroom:this.data.maxBedroom,
          minHall:this.data.minHall,
          maxHall:this.data.maxHall,
        });

    });

      console.log('赋值之后',this.form.value);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerdetailPage');
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
    this.navCtrl.push(PlookrecordPage,{
      id:this.data,
    })
  }
  passengerFollow(){
    this.navCtrl.push(PfollowrecordPage,{
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
    this.navCtrl.push(SearchhousePage);
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
        alert('修改客户成功!');
        this.navCtrl.push(MypassengerPage);
      }
    },err=>{
      alert('修改失败！');
    })

  }

}
