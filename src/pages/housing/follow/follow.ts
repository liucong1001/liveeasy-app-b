import {Component, Renderer, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, Navbar,Searchbar} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import {FollowProvider} from '../../../providers/follow/follow'
import {LocalStorageProvider} from "../../../providers/local-storage/local-storage";
import {HousingPage} from "../housing";
import {ToastComponent} from "../../../components/toast/toast";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {ErrorMessage} from "../../../components/valid-error/valid-error";
import {HousedetailPage} from "../housedetail/housedetail";
/**
   房源带看页面
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
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('searchBar') searchBar:Searchbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              public http: HttpClient,private renderer:Renderer,
              public toast:ToastComponent,
              public  followProvider: FollowProvider,public nativePageTransitions: NativePageTransitions,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,) {

    this.propertyid = navParams.get('item').propertyId;
    this.estatename = navParams.get('item').estateName;
    this.convid = navParams.get('item').convId;
    this.standardAddress = navParams.get('item').standardAddress;
    this.followuptime=new Date().getTime();
    console.log('跟进',navParams);
    console.log(this.propertyid)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowPage');
    this.navBar.backButtonClick = this.backButtonClick;

  }
  form:FormGroup =this.fb.group({
    followupCode:['1',Validators.required],//内容
    content:['',[Validators.required]], //委托书编号
  });

  selectTitle(data){
    var title = {title:data};
    return title;
  }


  subFollow(){
      // alert('222');
      this.followProvider.getfollow({
        agentId:this.localStorageProvider.get('loginInfo').user.id,
        followupCode:this.form.value.followupCode,
        content:this.form.value.content,
        propertyId:this.propertyid,
        followupTime:this.followuptime
      }).then(res => {
        console.log(res);
        if(res.success){
          this.toast.msg('跟进成功!');
          // this.navCtrl.pop()
          setTimeout(()=>{
            this.navCtrl.pop();
          },200);
        }else{
          this.toast.error('跟进失败！');
        }
        // alert('跟进成功！')
        // this.navCtrl.pop()
      });
  console.log(this.form.value)
}
//禁用调出键盘
//   ionViewDidEnter(){
//     // let input = this.searchBar.getElementRef().nativeElement.querySelector('input');
//     // this.renderer.setElementAttribute(input, 'disabled', 'true');
//     this.navBar.backButtonClick = () => {
//       this.navCtrl.popToRoot();
//     };
//   }

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

}
