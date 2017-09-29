import { Component, Inject } from '@angular/core';
import { Platform, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from '../../providers/event/event';
import { FirebaseApp } from 'angularfire2';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {File} from '@ionic-native/file';


import {
    AfoObjectObservable,
    AngularFireOfflineDatabase
} from 'angularfire2-offline/database';

declare var cordova: any;


@IonicPage({
  name: 'item-detail',
  segment: 'item-detail/:itemId'
})

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
  providers: [Transfer, TransferObject, File]
})
export class ItemDetailPage {
  
  storageDirectory: string = '';

  image: string;
  public currentItem: any;
  public imageId:string;
  detailObject: AfoObjectObservable<any>;
 



  constructor(afoDatabase: AngularFireOfflineDatabase, @Inject(FirebaseApp) firebaseApp: any, public itemProvider: ItemProvider, public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private transfer: Transfer, private file: File, public alertCtrl: AlertController) 
    {
    //angularfire2-offline get details of list
    this.currentItem = this.navParams.get('itemId');
    
    this.detailObject = afoDatabase.object('/itemList/'+ this.currentItem);
    
    this.imageId = this.navParams.get('itemId') + ".jpg";
    const storageRef = firebaseApp.storage().ref().child(this.imageId);
    storageRef.getDownloadURL().then(url => this.image = url);


    //file transfer
 this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if(!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if(this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });

  }

  downloadImage(image) {

    this.platform.ready().then(() => {

      const fileTransfer: TransferObject = this.transfer.create();

      const imageLocation = `${cordova.file.applicationDirectory}www/assets/img/${image}`;

      fileTransfer.download(imageLocation, this.storageDirectory + image).then((entry) => {

        const alertSuccess = this.alertCtrl.create({
          title: `Download Succeeded!`,
          subTitle: `${image} was successfully downloaded to: ${entry.toURL()}`,
          buttons: ['Ok']
        });

        alertSuccess.present();

      }, (error) => {

        const alertFailure = this.alertCtrl.create({
          title: `Download Failed!`,
          subTitle: `${image} was not successfully downloaded. Error code: ${error.code}`,
          buttons: ['Ok']
        });

        alertFailure.present();

      });

    });

  }


  retrieveImage(image) {

    this.file.checkFile(this.storageDirectory, image)
      .then(() => {

        const alertSuccess = this.alertCtrl.create({
          title: `File retrieval Succeeded!`,
          subTitle: `${image} was successfully retrieved from: ${this.storageDirectory}`,
          buttons: ['Ok']
        });

        return alertSuccess.present();

      })
      .catch((err) => {

        const alertFailure = this.alertCtrl.create({
          title: `File retrieval Failed!`,
          subTitle: `${image} was not successfully retrieved. Error Code: ${err.code}`,
          buttons: ['Ok']
        });

        return alertFailure.present();

      });
  }

}
/*
    this.itemProvider.getItemDetail(this.navParams.get('itemId'))
    .on('value', itemSnapshot => {
    this.currentItem = itemSnapshot.val();
    this.currentItem.id = itemSnapshot.key;
    
    this.imageId = this.currentItem.id + ".jpg";
    const storageRef = firebaseApp.storage().ref().child(this.imageId);

    storageRef.getDownloadURL().then(url => this.image = url);
  } 

    )
*/

  



