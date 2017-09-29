import {
    Component
} from '@angular/core';
import {
    NavController,
    NavParams
} from 'ionic-angular';




import {
    AfoListObservable,
    AngularFireOfflineDatabase
} from 'angularfire2-offline/database';

@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class SearchPage {
    public itemList: AfoListObservable < any[] > ;
    public loadedItemList: AfoListObservable < any[] >;
        currentItems: any = [];
        searchItemList;

    constructor(afoDatabase: AngularFireOfflineDatabase, public navCtrl: NavController, public navParams: NavParams) {

        this.itemList = afoDatabase.list('itemList');
        this.loadedItemList = afoDatabase.list('itemList');
        this.searchItemList = [];


    }
      
    initializeItems(): void {
        this.itemList = this.loadedItemList;
        this.searchItemList = [];
        
    }

    /**
     * Perform a service for the proper items.
     */



    getItems(searchbar) {
        // Reset items back to all of the items
        this.initializeItems();

        // set q to the value of the searchbar
        var q = searchbar.srcElement.value;


        // if the value is an empty string don't filter the items
        if (!q) {
            return;
        }


        this.itemList.subscribe(items => {
            items.filter((v) => {
                if ((v.name && q) || (v.about && q)) {
                    if ((v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) || (v.about.toLowerCase().indexOf(q.toLowerCase()) > -1)) {
                        return this.searchItemList.push(v);
                        
                    }
                    return false;
                }
            });
    });
    }



    goToItemDetail(itemId) {
        
        this.navCtrl.push('item-detail', {
            'itemId': itemId
        });
    }

}