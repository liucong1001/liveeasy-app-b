import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlookrecordPage } from '../../passengerdetail/plookrecord/plookrecord';
import { PfollowrecordPage } from '../../passengerdetail/pfollowrecord/pfollowrecord';
import { AddpublicguestPage } from './addpublicguest/addpublicguest';

/**
 * Generated class for the PublicpdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicpdetail',
  templateUrl: 'publicpdetail.html',
})
export class PublicpdetailPage {
  showIntention=false;
  right=true;
  down=false;
  customerid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.customerid=navParams.get('item');
    console.log(this.customerid)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicpdetailPage');
  }
  clickIntention(){
    if(this.showIntention==false ){
      this.showIntention=true;
      this.right=false;
      this.down=true;
    }else{
      this.showIntention=false;
      this.right=true;
      this.down=false;
    }
  }
  addPublicGuest(){
    this.navCtrl.push(AddpublicguestPage)
  }
  passengerLook(){
    this.navCtrl.push(PlookrecordPage,{
      id:this.customerid,
    })
  }
  passengerFollow(){
    this.navCtrl.push(PfollowrecordPage,{
      id:this.customerid,
    })
  }

}
