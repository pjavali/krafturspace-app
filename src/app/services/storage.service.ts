import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  id: number;
  user: string;
  inpect_title: String;
  Description: string;
  photourl: any;
  timestamp: any;
  hight_in_mm: any;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(public storage: Storage) {
    console.log('Your storage provider is working here !');
  }
  // set a key/value
  async set(key: string, value: any): Promise<any> {
    try {
      const result = await this.storage.set(key, value);
      console.log('set string in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }
  // to get a key/value pair
  async get(key: string): Promise<any> {
    try {
      const result = await this.storage.get(key);
      console.log('storageGET: ' + key + ': ' + result);
      if (result != null) {
        return result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }
  // set a key/value object
  async setObject(key: string, object: Object) {
    try {
      const result = await this.storage.set(key, JSON.stringify(object));
      console.log('set Object in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }
  // get a key/value object
  async getObject(key: string): Promise<any> {
    try {
      const result = await this.storage.get(key);
      if (result != null) {
        console.log('get Object in storage: ' + result);
        return JSON.parse(result);
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }
  // remove a single key value:
  remove(key: string) {
    this.storage.remove(key);
  }
  //  delete all data from your application:
  clear() {
    this.storage.clear();
  }
  ITEMS_KEY = 'my-items';
  ITEMS_KEY1 = 'my-items1';

  //create
  addItem(item: Item): Promise<any> {
    return this.storage.get(this.ITEMS_KEY).then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(this.ITEMS_KEY, items);
      } else {
        return this.storage.set(this.ITEMS_KEY, [item]);
      }
    });
  }
  //read
  getItem(): Promise<Item[]> {
    return this.storage.get(this.ITEMS_KEY);
  }

  addItem1(item: Item): Promise<any> {
    return this.storage.get(this.ITEMS_KEY1).then((items: Item[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(this.ITEMS_KEY1, items);
      } else {
        return this.storage.set(this.ITEMS_KEY1, [item]);
      }
    });
  }
  //read
  getItem1(): Promise<Item[]> {
    return this.storage.get(this.ITEMS_KEY1);
  }
}
