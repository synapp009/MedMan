import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Item } from '../../models/item';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
    "text": "Lore Ipsum blabla"
  };


  constructor(public http: Http) {
    let items = [
      {
        "name": "Die Führungslandkarte",
        "profilePic": "assets/img/speakers/fuehrungslandkarte.png",
        "about": "Spannungsfeld der Führung in Organisationen",
            "text": "Überprüfen Sie, wo derzeit Ihre meiste Energie und der Fokus Ihrer Aufmerksamkeit hingehen hingehen sollte Überprüfen Sie, wo derzeit Ihre meiste Energie und der Fokus Ihrer Aufmerksamkeit hingehen hingehen sollte Überprüfen Sie, wo derzeit Ihre meiste Energie und der Fokus Ihrer Aufmerksamkeit hingehen hingehen sollteÜberprüfen Sie, wo derzeit Ihre meiste Energie und der Fokus Ihrer Aufmerksamkeit hingehen hingehen sollteÜberprüfen Sie, wo derzeit Ihre meiste Energie und der Fokus Ihrer Aufmerksamkeit hingehen hingehen sollteÜberprüfen Sie, wo derzeit Ihre meiste Energie und der Fokus Ihrer Aufmerksamkeit hingehen hingehen sollteÜberprüfen Sie, wo derzeit Ihre meiste Energie und der Fokus Ihrer Aufmerksamkeit hingehen hingehen sollte"
      },
      {
        "name": "Charlie Cheetah",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "Charlie is a Cheetah.",
            "text": "Lore Ipsum blabla"
      },
      {
        "name": "Donald Duck",
        "profilePic": "assets/img/speakers/duck.jpg",
        "about": "Donald is a Duck.",
            "text": "Lore Ipsum blabla"
      },
      {
        "name": "Eva Eagle",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "Eva is an Eagle.",
            "text": "Lore Ipsum blabla"
      },
      {
        "name": "Ellie Elephant",
        "profilePic": "assets/img/speakers/elephant.jpg",
        "about": "Ellie is an Elephant.",
            "text": "Lore Ipsum blabla"
      },
      {
        "name": "Molly Mouse",
        "profilePic": "assets/img/speakers/mouse.jpg",
        "about": "Molly is a Mouse.",
            "text": "Lore Ipsum blabla"
      },
      {
        "name": "Paul Puppy",
        "profilePic": "assets/img/speakers/puppy.jpg",
        "about": "Paul is a Puppy.",
            "text": "Lore Ipsum blabla"
      }
    ];

    for (let item of items) {
      this.items.push(new Item(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
