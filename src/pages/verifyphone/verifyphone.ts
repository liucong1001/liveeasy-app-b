import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var $:any;
/**
 * Generated class for the VerifyphonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verifyphone',
  templateUrl: 'verifyphone.html',
})
export class VerifyphonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyphonePage');
  }
  sendMsg() {
    var validCode = true;
    // $(".sendMsg").click(function () {
      var time = 90;
      var code = $(".sendMsg");
      if (validCode) {
        validCode = false;
        code.addClass("msgs1");
        var t = setInterval(function () {
          time--;
          code.html(time + "秒后再次发送");
          if (time == 0) {
            clearInterval(t);
            code.html("重新获取(90s)");
            validCode = true;
            code.removeClass("msgs1");

          }
        }, 1000)
      }
    // })

  }

}
