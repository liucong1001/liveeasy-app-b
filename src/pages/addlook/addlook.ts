import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the AddlookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addlook',
  templateUrl: 'addlook.html',
})
export class AddlookPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private camera: Camera,public actionSheetCtrl: ActionSheetController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddlookPage');
  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: '更多',
      buttons: [
        {
          text: '选择图片',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.takePhoto(0);
          }
        },{
          text: '拍照',
          handler: () => {
            console.log('Archive clicked');
            this.takePhoto(1);
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

    //take Photo
    takePhoto(sourceType:number) {
      console.log('手机调试',sourceType);
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType:sourceType,
        }

        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }

}
