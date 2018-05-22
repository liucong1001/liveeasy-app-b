import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController ,ModalController} from 'ionic-angular';
import { FollowPage } from '../follow/follow';
import { ClosehousePage } from '../closehouse/closehouse';
import { AddlookPage } from '../addlook/addlook';
import { HousedetailPage } from '../housedetail/housedetail';
import { AddhousePage } from '../addhouse/addhouse';
/**
 * Generated class for the HousingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-housing',
  templateUrl: 'housing.html',
})
export class HousingPage {
  show=false;
  houseType=false;
  more=false;
  pop=false;
  housingEstate=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HousingPage');
  }
  //menu
  showMenu1(){
    if(this.show==false || this.houseType == true || this.more == true || this.housingEstate == true){
      this.show=true;
      this.pop=true;
      this.houseType = false;
      this.more=false;
      this.housingEstate=false;
    }else{
      this.show=false;
      this.pop=false;
    }
  }
  showMenu2(){
    if(this.houseType==false || this.show == true || this.more == true || this.housingEstate == true){
      this.houseType=true;
      this.show=false;
      this.pop=true;
      this.more = false;
      this.housingEstate=false;
    }else{
      this.houseType = false;
      this.pop=false;
    }
  }

  showMenu3(){
    if(this.housingEstate==false || this.show == true || this.more == true || this.houseType == true){
      this.housingEstate=true;
      this.show=false;
      this.pop=true;
      this.more = false;
      this.houseType = false;
    }else{
      this.housingEstate = false;
      this.pop=false;
    }
  }

  showMenu4(){
    if(this.more==false || this.show == true || this.houseType == true || this.housingEstate == true){
      this.more=true;
      this.show=false;
      this.pop=true;
      this.houseType = false;
      this.housingEstate=false;
    }else{
      this.more = false;
      this.pop=false;
    }
  }

  goFollow(){
    this.navCtrl.push(FollowPage);
  }

  goAddLook(){
    this.navCtrl.push(AddlookPage);
  }
  goCloseHouse(){
    this.navCtrl.push(ClosehousePage);
  }
  goHouseDetail(){
    this.navCtrl.push(HousedetailPage)
  }
  addHouse(){
    this.navCtrl.push(AddhousePage);
  }


}
