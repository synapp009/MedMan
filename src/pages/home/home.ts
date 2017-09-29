import {
    Component
} from '@angular/core';
import {
    IonicPage,
    NavController,
    ModalController
} from 'ionic-angular';
import {
    ItemProvider
} from '../../providers/event/event';

import {
    AngularFireAuth
} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import {
    Storage
} from '@ionic/storage';

import { Http } from '@angular/http';

import {
    AfoListObservable,
    AfoObjectObservable,
    AngularFireOfflineDatabase
} from 'angularfire2-offline/database';


@IonicPage({
    name: 'page-home'
})



@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})


export class HomePage {

    public itemList: AfoListObservable < any[] > ;
    public itemObject: AfoObjectObservable<any>;
    public itemNewOnline: AfoObjectObservable < any > ;

    public parentList: any;
    public parentItems: any;
    public parents:any;
    public itemNew = {};
    public itemItemId = [];
    private userId: any;;
    public arr: any;

    users: any;

    constructor(public http: Http, public afAuth: AngularFireAuth, public storage: Storage, afoDatabase: AngularFireOfflineDatabase, public itemProvider: ItemProvider, public navCtrl: NavController, public modalCtrl: ModalController)
    {
      
     
    //parents categories etc.
        this.itemObject = afoDatabase.object("/itemList");
        this.itemList = afoDatabase.list("/itemList");
        console.log('ref',this.itemList);
        this.parentItems = [];
        this.parents = [];
        this.itemList.forEach(object => {
             
            console.log("object",object);

            
            this.parentList = Array.from(Object.keys(object), k=>object[k]);
            console.log("this.parentList", this.parentList);
            this.parentList.forEach(object2 => {
                
                var itemKey = Array.from(Object.keys(object), k=> object[k]);
                console.log("itemKey",itemKey);
                console.log("parentItems", this.parentItems);
                console.log("parentListobjj",object2.parent);
                this.parentItems.push(object2.parent, object2);
                
                
                
                this.parents.indexOf(object2.parent) == -1 ? this.parents.push(object2.parent) : console.log('ready');
                console.log("parrentsss",this.parents);
                console.log("parentItems",this.parentItems)
            })
            
        });
        
           
            
   
//console.log("thisparentlistparenst",Object.keys(this.parentList).map(k => this.parentList[k]))
       //   this.parents.indexOf(this.parentList.parent) === -1 ? this.parents.push(this.parentList.parent) : console.log("parentexists")

            //this.parentList.indexof(this.parents)
       //     console.log('object',this.parents);
        //this.users = Array.from(Object.keys(parent), k=> parent[k]);;
        
        
        
        this.itemList = afoDatabase.list('/itemList');
        
        this.itemItemId = [];
        this.arr = [];

        this.afAuth.authState.subscribe(res => {
            if (res && res.uid) {
                
                this.itemNewOnline = afoDatabase.object('/userProfile/' + res.uid )
                
                
                this.itemNewOnline.forEach((value) => {

                    this.arr = Array.from(Object.keys(value), k=>value[k]);
                    this.storage.set(value,value);
                    console.log('this.arr', this.arr);
                    console.log('this.storage.set',this.storage)
                });
 
                this.storage.forEach((value) => {
                    console.log('value',value);
                   
                    this.arr.indexOf(value) === -1 ? this.arr.push(value) : console.log("itemexists");
                    console.log('newisdcsdctem', this.arr);
                })
            } else {
               
                console.log('user not logged in');
            }
        });
        





        //what's new online and offline




    }

    /**
     * The view loaded, let's query our items for the list
     */

    /**
     * Prompt the user to add a new item. This shows our ItemCreatePage in a
     * modal and then adds the new item to our data source if the user created one.
     */


    /**
     * Delete an item from the list of items.
     */


    /**
     * Navigate to the detail page for this item.
     */

    ionViewDidEnter() {




    }

 

    goToItemDetail(itemId) {
        console.log("itemID",itemId);
        this.navCtrl.push('item-detail', {
            'itemId': itemId
        });
        // this.itemNew.push(itemId);

        this.storage.set(itemId, itemId);
        this.arr.indexOf(itemId) === -1 ? this.arr.push(itemId) : console.log("itemexists");


        //online viewed items
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                firebase.database().ref('/userProfile').child(user.uid).child(itemId)
                    .set(itemId);



            } else {
                // No user is signed in.
                console.log('logged out')
            }
        });

    }

    goToCreate() {
        this.navCtrl.push('item-create');
    }

}