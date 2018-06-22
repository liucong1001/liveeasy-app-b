import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeclardetailPage } from './declardetail/declardetail';
import  {HomeProvider} from  '../../../providers/home/home';
/**
 * Generated class for the DeclarationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-declaration',
  templateUrl: 'declaration.html',
})
export class DeclarationPage {
  show=false;
  houseType=false;
  pop=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public homeProvider:HomeProvider) {
    this.homeProvider.successOrder(1,{}).then(res => {
      console.log(res);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeclarationPage');
  }
  //menu
  showMenu1(){
    if(this.show==false || this.houseType == true ){
      this.show=true;
      this.pop=true;
      this.houseType = false;
    }else{
      this.show=false;
      this.pop=false;
    }
  }
  showMenu2(){
    if(this.houseType==false || this.show == true ){
      this.houseType=true;
      this.show=false;
      this.pop=true;
    }else{
      this.houseType = false;
      this.pop=false;
    }
  }
  pops(){
    if(this.show == true || this.houseType == true){
      this.show=false;
      this.pop=false;
      this.houseType = false;
    }
  }
  declarationDetail(){
    this.navCtrl.push(DeclardetailPage)
  }

}
