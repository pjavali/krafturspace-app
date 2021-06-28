import { Injectable } from '@angular/core';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class NavparamService {
navData:any;
  constructor() { }

  setNavData(navobj){
    this.navData=navobj
  }
  getNavData(){
    if(isNullOrUndefined(this.navData))
    return 0
    return this.navData
  }  
}
