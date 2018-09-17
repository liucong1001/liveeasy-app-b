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
import {PropertyProvider} from "../../../providers/property/property";
import {NativeProvider} from "../../../providers/native/native";
/**
   房源空看页面
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
  result=[];
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('searchBar') searchBar:Searchbar;
  @ViewChild('select') select;
  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,
              public http: HttpClient,private renderer:Renderer,
              public toast:ToastComponent,public propertyProvider: PropertyProvider,
              public  followProvider: FollowProvider,public nativePageTransitions: NativePageTransitions,
              private fb:FormBuilder,public localStorageProvider:LocalStorageProvider,public  nativeProvider:NativeProvider,) {

    this.propertyid = navParams.get('item').propertyId;
    // this.estatename = navParams.get('item').estateName;
    this.convid = navParams.get('item').convId;
    this.standardAddress = navParams.get('item').standardAddress;
    this.followuptime=new Date().getTime();
    // console.log('跟进',navParams);
    // console.log(this.propertyid);
    this.propertyProvider.getRecord(this.propertyid).then(res=>{
      this.result=res.data;
      console.log('跟进',this.result);
      if(!this.result['closePropertyShow']){
        this.toast.delayToast('暂无权限操作!');
      }
    });
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.nativeProvider.back(this.navCtrl);
  }

  ionViewWillLeave(){
    this.select.close();
  }

  form:FormGroup =this.fb.group({
    followupCode:['1',Validators.required],//内容
    content:['',[Validators.required]], //委托书编号
  });

  selectTitle(data){
    var title = {title:data};
    return title;
  }


   isDisabled:any;
  subFollow(){
      // alert('222');
      this.isDisabled = true;
      this.followProvider.getfollow({
        agentId:this.localStorageProvider.get('loginInfo').user.id,
        followupCode:this.form.value.followupCode,
        content:this.form.value.content,
        propertyId:this.propertyid,
        followupTime:this.followuptime
      }).then(res => {
        // console.log(res);
        if(res.success){
          this.toast.msg('跟进成功!');
          // this.navCtrl.pop()
          setTimeout(()=>{
            this.navCtrl.pop();
          },200);
        }else{
          this.toast.error('跟进失败！');
          this.isDisabled = false;
        }
        // alert('跟进成功！')
        // this.navCtrl.pop()
      });
  // console.log(this.form.value)
}
//禁用调出键盘
//   ionViewDidEnter(){
//     // let input = this.searchBar.getElementRef().nativeElement.querySelector('input');
//     // this.renderer.setElementAttribute(input, 'disabled', 'true');
//     this.navBar.backButtonClick = () => {
//       this.navCtrl.popToRoot();
//     };
//   }

}
