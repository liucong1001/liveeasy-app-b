import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * ToastController消息提示组件
 */
@Component({
  selector: 'toast',
  templateUrl: 'toast.html'
})
export class ToastComponent {

  text: string;

  constructor(private toastCtrl: ToastController,private alertCtrl: AlertController) {
    this.text = 'Hello World';
  }
  //alert 消息提示
  alert(message){
    let alert = this.alertCtrl.create({
      // title: '',
      subTitle: message,
      buttons: ['确认']
    });

    alert.present();
  }
  // toast 成功消息提示
  msg(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle',
      cssClass:' toast-success',
      dismissOnPageChange:true,
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  defaultMsg(position,message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position,
      cssClass:'toast-default ',
      dismissOnPageChange:true,
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  // toast 失败消息提示
  error(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle',
      cssClass:' toast-error'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  errorBlack(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle',
      cssClass:' toast-black'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

    showToastWithCloseButton(msg) {
      const toast = this.toastCtrl.create({
        message: msg,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
    }

   showLongToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
