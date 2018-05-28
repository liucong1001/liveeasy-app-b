import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController  } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {FollowProvider} from '../../providers/follow/follow'
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HousingPage} from "../housing/housing";
/**
 * Generated class for the FollowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html',
})
export class FollowPage {
  propertyid:any;
  estatename:any;
  followuptime:any;
  convid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              public http: HttpClient,
              public  followProvider: FollowProvider,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,) {

    this.propertyid = navParams.get('propertyid');
    this.estatename = navParams.get('estatename');
    this.convid = navParams.get('convid');
    this.followuptime=new Date().getTime();
    console.log(this.convid)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowPage');

  }
  form:FormGroup =this.fb.group({
    followupCode:['',Validators.required], //旧密码
    content:['',Validators.required],//新密码

  });

  subFollow(){
      // alert('222');
      this.followProvider.getfollow({followup_code:this.form.value.followupCode,content:this.form.value.content,propertyId:this.propertyid,followupTime:this.followuptime}).then(res => {
        console.log(res);
        this.navCtrl.push(HousingPage)
      });
  console.log(this.form.value)
}
  anything(){
    // if(this.form.valid.xx != ''){
    //   this.xx=true;
    // }else {
    //   this.xx=false;
    // }
  //       var a = bind('input propertychange', function() {
  //     if($(this).val() != ""){
  //       $(this).css('border','1px solid red')
  //     }else{
  //       $(this).css('border','1px solid #F0F0F0')
  //     };
  // });
  }



}
