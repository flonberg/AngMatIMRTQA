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
  filteredPlans: any[];
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
      var index = 0;
      Object.keys(this.dataArray).forEach(key => {
        this. allPlans[index++] = this.dataArray[key]
      })
      this. filterData(this .allPlans);
  }
  filterData(dArray){
    var index = 0;
    this .filteredPlans= Array();
    Object.keys(dArray).forEach(key => {                    // step thru the plans for each Date
      this .filteredPlans[key] = Array();              // create it
      Object.keys(dArray).forEach(key2 => {                 // step thru each plan
        if (dArray[key][key2]   ){                          // if there IS data
          if (+dArray[key][key2]['flowbit'] !== dArray[key][key2]['flowbitAndWorkbit'] ) { // flowbit == flowbitAndWorkbigt -> QAComplete
            this .filteredPlans[key].push(dArray[key][key2]); // push the plan into the array
          }
        }
      })
    })
    console.log("filteredPlans is %o", this .filteredPlans)
  }
  linacClass(str){
    if (str.indexOf("TrueBeam") !== -1)
      return 'geenClass';
    if (str.indexOf("Agility") !== -1)
      return 'purpleClass';
  }
}
