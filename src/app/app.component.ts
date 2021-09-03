import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {  OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { IDayCalendarConfig, DatePickerComponent } from "ng2-date-picker";

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as saveAs from 'file-saver';
import { DatePipe } from '@angular/common';
import { MAT_DATE_RANGE_INPUT_PARENT } from '@angular/material/datepicker/date-range-input-parts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MDModality';
  data: any;
  planData: any;
  MDKeySelected: number;
  dateRangeStart: string;
  dateRangeEnd: string;
  MDName: string;
  date:any

  
  constructor(private http: HttpClient, public datePipe: DatePipe) {
    console.log(" const ");
   // this.getMDs().subscribe(res =>{
    //  this.setData(res);
   // })
   }
 


}
