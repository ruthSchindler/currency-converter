import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {Convert} from '../model/convert'

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

url='http://api.exchangeratesapi.io/v1/latest?access_key=050beeaad0ad5cda72460c6758d5a11e&format=1';

allOption: BehaviorSubject<string[] | undefined>=new BehaviorSubject<string[] | undefined>(undefined);
historyList:Convert[]=[];

constructor(private _http:HttpClient) { }

getexchangeratesapi() {
  return this._http.get<any>(this.url);
}
initAllOption(){
  // debugger
  this.getexchangeratesapi().subscribe(data =>  {
    const keys = Object.keys(data.rates);
    this.allOption.next(keys);
  })
}
getAllOptions():Observable<string[]|undefined>{
    console.log(this.allOption);
  
  return this.allOption.asObservable()
}
covert(value:number,f:string,t:string){
  // debugger
  this.getexchangeratesapi().subscribe(data =>  {
    const converted=data.rates[f];
    this.historyList?.push({
      sum:value,
      from:f,
      to:t,
      converted_sum:converted
    })
    debugger
    return converted;
  })
  

}
}
