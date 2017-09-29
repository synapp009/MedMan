import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class ItemProvider {
  public userProfileRef:firebase.database.Reference;

  constructor() {

        this.userProfileRef = firebase.database()
          .ref(`itemList/`);
      }
    
  

  createItem(itemName: string, itemAbout: string, itemDetail: string, itemCat:string):
   firebase.Promise<any> {
  return this.userProfileRef.push({
    name: itemName,
    about: itemAbout,
    detail: itemDetail,
    parent: itemCat
  });
}

getItemList(): firebase.database.Reference {
  return this.userProfileRef.child('');
}

getItemDetail(itemId:string): firebase.database.Reference {
  return this.userProfileRef.child('').child(itemId);
}


}



