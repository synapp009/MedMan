import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ItemProvider } from '../../providers/event/event';


@IonicPage({
  name: 'item-create'
})
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html',
})
export class ItemCreatePage {
public currentItem: any;

  constructor(public navCtrl: NavController, 
    public itemProvider: ItemProvider) {}

    createItem(itemName: string, itemAbout: string, itemDetail: string, itemCat: string) {
  this.itemProvider.createItem(itemName, itemAbout, itemDetail, itemCat)
  .then( newItem => {
    this.navCtrl.pop();
  });
}

}

