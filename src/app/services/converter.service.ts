import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Convert } from '../model/convert'
import { saveAs } from 'file-saver';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  url = 'https://v6.exchangerate-api.com/v6/7e8a74d1ea24d8ea5179702c/latest/';

  allOption: BehaviorSubject<string[] | undefined> = new BehaviorSubject<string[] | undefined>(undefined);
  historyList: Convert[] = [];
  oldHistoryList = [] = [];

  constructor(private _http: HttpClient) { }

  getexchangeratesapi(base_code: string) {
    return this._http.get<any>(this.url + base_code);
  }
  initOnStart() {
    this.getexchangeratesapi('USD').subscribe(data => {
      const keys = Object.keys(data.conversion_rates);
      this.allOption.next(keys);
    })
    this.getSavedHistory();
  }
  getAllOptions(): Observable<string[] | undefined> {
    console.log(this.allOption);

    return this.allOption.asObservable()
  }
  covert(value: number, f: string, t: string) {
    // debugger
    this.getexchangeratesapi(f).subscribe(data => {
      const converted = (data.conversion_rates[t]) * value;
      this.historyList?.push({
        sum: value,
        from: f,
        to: t,
        converted_sum: converted
      })
      debugger
      return converted;
    })
  }

  pushToHistory(value: number, f: string, t: string, con: number) {
    this.historyList?.push({
      sum: value,
      from: f,
      to: t,
      converted_sum: con
    })
  }
  getSavedHistory() {
    this._http.get('./assets/history.txt', { responseType: "blob", headers: { 'Accept': 'application/pdf' } })
      .subscribe(blob => {
        blob.text().then(text => {
          let blobText = text
          this.oldHistoryList = JSON.parse(blobText);
        })

      });
  }
  saveHistroy() {
    var file = new File([JSON.stringify(this.oldHistoryList) + JSON.stringify(this.historyList)], "history.txt", { type: "text/plain;charset=utf-8" });
    saveAs(file);
  }
}
