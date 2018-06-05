import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {ClosehouseProvider} from '../../providers/closehouse/closehouse'
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HttpClient} from '@angular/common/http';
import {HousingPage} from "../housing/housing";
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
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              public http: HttpClient,
              public  closehouseProvider: ClosehouseProvider,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,) {
    this.propertyid = navParams.get('propertyid');
    this.estatename = navParams.get('estatename');
    this.convid = navParams.get('convid');
    this.standardAddress = navParams.get('standardAddress');
    this.closetime=new Date().getTime();
    this.realtorId = navParams.get('realtorId');
    this.loginId=this.localStorageProvider.get('loginInfo').id;
    console.log(this.loginId,this.realtorId)
    //判断归属人和操作人是否一致
    if(this.realtorId == this.loginId){
      //判断返回data.result是否显示处理申请信息
      this.closehouseProvider.getShow(this.propertyid).then(res => {
        console.log(this.propertyid)
        console.log(res);
        // if(res.data.result == 1){
        //   this.pending =true;
        // }
      });
    }else {
      console.log('你不是此房源归属人，请先申请');
      this.subs=false;
      this.applic=true
    }

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
    if(this.form.value.propertyStatus != 7){
      this.closehouseProvider.getClose({
        propertyId:this.propertyid,
        propertyStatus:this.form.value.propertyStatus,
        closeTime:this.closetime,
        invalidReason:this.form.value.invalidReason,
        closeDesc:this.form.value.closeDesc
      }).then(res => {
        console.log(res);
        alert('关闭成功');
        this.navCtrl.push(HousingPage)
      });
    }else if(this.form.value.propertyStatus == 7){
      if(this.form.value.invalidReason !=''){
        this.closehouseProvider.getClose({
          propertyId:this.propertyid,
          propertyStatus:this.form.value.propertyStatus,
          closeTime:this.closetime,
          invalidReason:this.form.value.invalidReason,
          closeDesc:this.form.value.closeDesc
        }).then(res => {
          console.log(res);
          alert('关闭成功');
          this.navCtrl.push(HousingPage)
        });
      }else {
        alert('请选择无效原因')
      }
    }
    console.log(this.form.value)
  }

  subApplic(){
    console.log(this.propertyid)
    this.closehouseProvider.getClose({
      propertyId:this.propertyid,
      propertyStatus:this.form.value.propertyStatus,
      closeTime:this.closetime,
      invalidReason:this.form.value.invalidReason,
      closeDesc:this.form.value.closeDesc
    }).then(res => {
      console.log(res);
      alert('提交成功，请等候同意！');
    });
  }


}
