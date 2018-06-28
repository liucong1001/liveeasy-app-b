import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
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
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController,
              public nativePageTransitions: NativePageTransitions,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyphonePage');
    this.navBar.backButtonClick = this.backButtonClick;
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
