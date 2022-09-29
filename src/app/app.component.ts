import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConverterService } from './services/converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private converter_service:ConverterService) { }
  
  ngOnInit(): void {
    this.converter_service.initOnStart();
  }
  title = 'currency-converter';

}
