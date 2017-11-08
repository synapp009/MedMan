import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
 import { IonicStorageModule } from '@ionic/storage';

 import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

 
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import * as ts from 'typescript';

import { MyApp } from './app.component';



//ionic 3 file transfer for offline storage
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {File} from '@ionic-native/file';

import { AccordionComponent } from '../components/accordion/accordion';


import { AuthProvider } from '../providers/auth/auth';
import { ItemProvider } from '../providers/event/event';



import { AboutPage } from '../pages/about/about';
import { SearchPage } from '../pages/search/search';



import { ContactPage } from '../pages/contact/contact';
import { Api } from '../providers/api';
import { Items } from '../mocks/providers/items';

// Importing AF2 Module

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireOfflineModule } from 'angularfire2-offline';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ImageProvider } from '../providers/image/image';




// AF2 Settings
export const firebaseConfig = {
 apiKey: "AIzaSyBSyPjqmZ4onwOb5rNYixFKVfh5rPyEnFA",
    authDomain: "medman-ed6f6.firebaseapp.com",
    databaseURL: "https://medman-ed6f6.firebaseio.com",
    projectId: "medman-ed6f6",
    storageBucket: "medman-ed6f6.appspot.com",
    messagingSenderId: "873364850814"
    
};



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    SearchPage,
    AccordionComponent

  
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''},
    ),
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireOfflineModule,
    HttpModule
    

    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,

    SearchPage
  ],
  providers: [
    Api,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ItemProvider,
    Items,
    ImageProvider,
    File,
    Transfer,
    TransferObject
  ]
  
})
export class AppModule {}
