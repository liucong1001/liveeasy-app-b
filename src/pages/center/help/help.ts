import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {UpdatepwdProvider} from '../../../providers/updatepwd/updatepwd'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  @ViewChild(Navbar) navBar: Navbar;
  appVersion:any;
  appId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,
              public  updprovider: UpdatepwdProvider,public nativePageTransitions: NativePageTransitions) {

      this.updprovider.version({}).then(res=>{
        console.log(res)
        this.appVersion=res.data.appVersion;
        this.appId=res.data.applicationId;
      })
  }
  save(){
    this.updprovider.helps({
      content:this.form.value.content,
      appVersion:this.appVersion,
      appId:this.appId,
    }).then(res => {
      console.log(res)
    })
  }
  form:FormGroup =this.fb.group({
    content:['',Validators.required],
  });
  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
    this.navBar.backButtonClick = this.backButtonClick;
  }

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

}
