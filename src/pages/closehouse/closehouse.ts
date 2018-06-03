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
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              public http: HttpClient,
              public  closehouseProvider: ClosehouseProvider,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,) {
    this.propertyid = navParams.get('propertyid');
    this.estatename = navParams.get('estatename');
    this.convid = navParams.get('convid');
    this.closetime=new Date().getTime();
    // console.log(this.estatename)
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
        //判断归属人和操作人是否一致
        // this.navCtrl.push(HousingPage)
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
          //判断归属人和操作人是否一致
          // this.navCtrl.push(HousingPage)
        });
      }else {
        alert('请选择无效原因')
      }
    }
    console.log(this.form.value)
  }

}
