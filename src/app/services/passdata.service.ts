import { Injectable } from '@angular/core';
  import { map } from "rxjs/operators";
  import { BehaviorSubject } from "rxjs";  
  import {isNullOrUndefined} from 'util'

@Injectable({
  providedIn: 'root'
})

export class PassdataService {
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



  private dataSource = new BehaviorSubject("default message");
    serviceData = this.dataSource.asObservable();

    changeData(data: any) {
      this.dataSource.next(data);
    }

}
