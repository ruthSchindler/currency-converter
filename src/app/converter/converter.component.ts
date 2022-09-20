import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ConverterService } from '../services/converter.service';
import { debounceTime,distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
show=false;
  allOptions:Observable<string[] | undefined> | undefined;
  
  converter: FormGroup = new FormGroup({
    sum: new FormControl(),
    from: new FormControl(),
    to: new FormControl(),
    converted_sum: new FormControl(),
  })
  constructor(private converter_service:ConverterService) { }

  ngOnInit() {
    this.allOptions= this.converter_service.getAllOptions();
   this.converter.controls['sum'].valueChanges.pipe(
    debounceTime(1000),
     distinctUntilChanged(),
     ).subscribe(x=>
      {
        
        debugger
       // this.convert()
      })
   
  }
  
convert(){
  let s=this.converter.controls['sum'].value;
  let f=this.converter.controls['from'].value;
  let t=this.converter.controls['to'].value;
if(s!=undefined && f!=undefined  && t!=undefined ){
  this.show=true;
  this.converter.controls['converted_sum'].setValue(this.converter_service.covert(s,f,t));
  }
}
}