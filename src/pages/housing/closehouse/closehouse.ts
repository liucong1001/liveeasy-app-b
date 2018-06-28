import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {ClosehouseProvider} from '../../../providers/closehouse/closehouse'
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {HttpClient} from '@angular/common/http';
import {HousingPage} from "../../housing/housing";
import {PropertyProvider} from "../../../providers/property/property";
import {ToastComponent} from "../../../components/toast/toast";
import {BelongerPage} from "./belonger/belonger";
/**
 * Generated class for the ClosehousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-closehouse',
  templateUrl: 'closehouse.html',
})
export class ClosehousePage {
  propertyid:any;
  closetime:any;
  estatename:any;
  convid:any;
  standardAddress:any;
  realtorId:any;
  loginId:any;
  subs=true;
  applic=false;
  pending=false;
  data:any;
  realtorSourceId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              public http: HttpClient,public toast:ToastComponent,
              public  closehouseProvider: ClosehouseProvider,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,public propertyProvider: PropertyProvider) {
    this.propertyid = navParams.get('propertyid');

    this.loginId=this.localStorageProvider.get('loginInfo').id;

    this.propertyProvider.getRecord(this.propertyid).then(res=>{
        this.data = res.data;
        console.log(this.data)

      this.estatename = this.data.estateName;
      this.convid = this.data.convId;
      this.standardAddress = this.data.standardAddress;
      this.closetime=new Date().getTime();
      this.realtorId = this.data.realtorId;
      this.realtorSourceId=this.data.realtorSourceId;

      console.log(this.loginId,this.realtorSourceId)
      //判断归属人和操作人是否一致
      if(this.realtorSourceId == this.loginId){
        //判断返回data.result是否显示处理申请信息
        this.closehouseProvider.getShow(this.propertyid).then(res => {
          console.log(this.propertyid)
          console.log(res);
          if(res.data == 1){
            this.pending =true;
          }
        });
      }else {
        this.toast.msg('你不是此房源归属人，请填写后申请！');
        this.subs=false;
        this.applic=true
      }

    });


  }
  form:FormGroup =this.fb.group({
    propertyStatus:['',Validators.required],
    invalidReason:[''],
    closeDesc:['',Validators.required],
  });
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClosehousePage');
  }

  subClose(){
    if(this.form.value.propertyStatus != 8){
      this.closehouseProvider.getClose({
        propertyId:this.propertyid,
        propertyStatus:this.form.value.propertyStatus,
        applyTime:this.closetime,
        invalidReason:null,
        closeDesc:this.form.value.closeDesc,
        realtorId:this.realtorSourceId,
      }).then(res => {
        console.log(res);
        if(res.success){
          this.toast.msg('关闭成功!');
          this.navCtrl.setRoot(HousingPage)
        }else{
          this.toast.error('关闭失败！');
        }
        // alert('关闭成功');
        // this.navCtrl.push(HousingPage)
      });
    }else if(this.form.value.propertyStatus == 8){
      if(this.form.value.invalidReason !=''){
        this.closehouseProvider.getClose({
          propertyId:this.propertyid,
          propertyStatus:this.form.value.propertyStatus,
          applyTime:this.closetime,
          invalidReason:this.form.value.invalidReason,
          closeDesc:this.form.value.closeDesc,
          realtorId:this.realtorSourceId
        }).then(res => {
          console.log(res);
          if(res.success){
            this.toast.msg('关闭成功!');
            this.navCtrl.setRoot(HousingPage)
          }else{
            this.toast.error('关闭失败！');
          }
          // alert('关闭成功');
          // this.navCtrl.setRoot(HousingPage);
        });
      }else {
        this.toast.error('请选择无效原因');
      }
    }
    console.log(this.form.value)
  }

  subApplic(){
    console.log(this.propertyid)
    this.closehouseProvider.getClose({
      propertyId:this.propertyid,
      //当前操作人id
      propertyStatus:parseInt(this.form.value.propertyStatus),
      // closeTime:this.closetime,
      invalidReason:this.form.value.invalidReason,
      closeDesc:this.form.value.closeDesc,
      applyTime:new Date().getTime(),
      realtorId:this.realtorSourceId
    }).then(res => {
      console.log(res);
      this.navCtrl.parent.select(1);
      this.toast.msg('提交成功，请等候归属人同意!');
    });
  }
  pendings(){
    this.navCtrl.push(BelongerPage,{
      data:this.form.value,
    })
  }

}
