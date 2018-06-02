import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import {PropertyProvider} from "../../providers/property/property";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
/**
 * Generated class for the KeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-key',
  templateUrl: 'key.html',
})
export class KeyPage {
  propertyid:any;
  attorneys:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public propertyProvider: PropertyProvider,
              private fb:FormBuilder,
              public localStorageProvider:LocalStorageProvider,public actionSheetCtrl: ActionSheetController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeyPage');
    this.attorneys=new Date().getTime();
    this.propertyid=this.localStorageProvider.get('propertyid');
    this.propertyProvider.keydetail({}).then(res => {
      console.log(res);

    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '更多',
      buttons: [
        {
          text: '内容',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: '内容',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: '关闭',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  form:FormGroup =this.fb.group({
    keySn:['',Validators.required], //委托书编号
    keyAddress:['',Validators.required],//起始时间
    keyDlgtFilePics:[''],//结束时间
  });

  goYc(){
    this.propertyid=this.localStorageProvider.get('propertyid');
    this.propertyProvider.key({
      loginFlag:1,
      status:1,
      propertyId:this.propertyid,
      createTime:this.attorneys,
      keySn:this.form.value.keySn,
      keyAddress:this.form.value.keyAddress,
      keyDlgtFilePics:"[{\"imageId\":\"1527840041338\",\"bucketId\":\"liveeasydev\",\"imagePath\":\"liveeasy-erp/oss/a7d09309ee4542dba8601458c0c1604b/001f8754849f44b4bffee7799e4e21a7/1527840041338.jpg\",\"thumbnail\":\"liveeasy-erp/oss/a7d09309ee4542dba8601458c0c1604b/001f8754849f44b4bffee7799e4e21a7/1527840041338.jpg?x-oss-process=image/resize,m_lfit,h_110,w_110\",\"size\":\"476884\",\"position\":\"\",\"desc\":\"\"}]"
    }).then(res => {
      console.log(res);
      // alert('跟进成功！')
      // this.navCtrl.push(HousingPage)
    });
    console.log(this.form.value);
  }
}
