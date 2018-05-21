import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController  } from 'ionic-angular';
declare var $:any;
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowPage');
  }

  anything(){
    $("#anything").bind('input propertychange', function() {
      if($(this).val() != ""){
        $(this).css('border','1px solid red')
      }else{
        $(this).css('border','1px solid #F0F0F0')
      };
  });
  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '关闭类型',
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

}
