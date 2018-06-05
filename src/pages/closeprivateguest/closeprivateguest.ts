import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var $:any;
/**
 * Generated class for the CloseprivateguestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-closeprivateguest',
  templateUrl: 'closeprivateguest.html',
})
export class CloseprivateguestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CloseprivateguestPage');
  }
  anything() {
    $("#anything").bind('input propertychange', function () {
      if ($(this).val() != "") {
        $(this).css('border', '1px solid red')
      } else {
        $(this).css('border', '1px solid #F0F0F0')
      };
    });
  }

}