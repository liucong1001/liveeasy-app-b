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
  standardAddress:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              public http: HttpClient,
              public  followProvider: FollowProvider,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,) {

    this.propertyid = navParams.get('propertyid');
    this.estatename = navParams.get('estatename');
    this.convid = navParams.get('convid');
    this.standardAddress = navParams.get('standardAddress');
    this.followuptime=new Date().getTime();
    console.log('跟进',navParams);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowPage');

  }
  form:FormGroup =this.fb.group({
    followupCode:['1',Validators.required], //类型
    content:['',Validators.required],//内容
  });

  subFollow(){
      // alert('222');
      this.followProvider.getfollow({
        agentId:this.localStorageProvider.get('loginInfo').id,
        followup_code:this.form.value.followupCode,
        content:this.form.value.content,
        propertyId:this.propertyid,
        followupTime:this.followuptime
      }).then(res => {
        console.log(res);
        alert('跟进成功！')
        this.navCtrl.push(HousingPage)
      });
  console.log(this.form.value)
}

}
