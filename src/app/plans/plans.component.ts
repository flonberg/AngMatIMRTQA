import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {

  //panelOpenState: boolean;
  dataArray: any[];
  tabIndex: number;
  plansDisplayed: any[];
  allPlans: any[];
  count: number;
  

  constructor(private http: HttpClient) {
    this. tabIndex = 0;                     // set to show MainPage data
    this .allPlans = Array();
    this.getData().subscribe(res =>{
      this.setData(res);
    })
   }
  setPlansShown(event: MatTabChangeEvent){
    console.log("hellow %o", event.index);
    this. tabIndex = event.index;               // set to determine shown plans according to tab selected

  }
  getData(){
    var url = 'https://ion.mgh.harvard.edu/cgi-bin/imrtqa/getForQA.php';
    return this .http.get(url)
    }
  setData(res ) {
      this.dataArray = res;
      var todayDate = new Date().toISOString().slice(0, 10);
      this .plansDisplayed = this.dataArray[todayDate]

      console.log( this .dataArray);
      var index = 0;
      Object.keys(this.dataArray).forEach(key => {
        console.log(this.dataArray[key])
        this. allPlans[index++] = this.dataArray[key]
      })
    }
}
