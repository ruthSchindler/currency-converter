import { Component, OnInit } from '@angular/core';
import { Convert } from '../model/convert';
import { ConverterService } from '../services/converter.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  historyList: Convert[] =[];
  constructor(private converter_service:ConverterService) { }

  ngOnInit() {
    this.historyList=this.converter_service.historyList;
   }

}
