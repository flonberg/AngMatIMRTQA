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
  f2Plans: any[];
  f3Plans: any[];
  tabIndex: number;
  plansDisplayed: any[];
  allPlans: any[];
  count: number;
  testData: any[];
  

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
    this. filter2data( this .allPlans)

  }
  getData(){
    var url = 'https://ion.mgh.harvard.edu/cgi-bin/imrtqa/getForQA.php';
    return this .http.get(url)
    }
  setData(res ) {
      this.dataArray = res;
      console.log(this.dataArray)
      var todayDate = new Date().toISOString().slice(0, 10);
      this .plansDisplayed = this.dataArray[todayDate]
      var index = 0;
      Object.keys(this.dataArray).forEach(key => {
        this. allPlans[index++] = this.dataArray[key]
      })

      this. filter2data(this .allPlans)
      this. filterData(this .allPlans);

    console.log("f2Plans is %o", this .f2Plans)
  }

  filter2data(dArray){
    this. f2Plans = Array();                                          // create the array for display
    for (let entry of dArray) {                                       // step thru the data
      if (!this. f2Plans[entry[0]['StartDate']])                      // if there is no array for this date
      this. f2Plans [entry[0]['StartDate']] = Array();                // create the array to this date
        for (let e2 of entry){                                        // go thru the plans for this date  
          {
          if (this. tabIndex == 0){                                   // indicates the 'mainQA' page view. 
            if (+e2['flowbit'] !== e2['flowbitAndWorkbit'] ) {        // find the ones which have NOT completed QA
               this. f2Plans [entry[0]['StartDate']].push(e2)         // push the plan into the array for this date. 
            } 
          }
          else {
            this. f2Plans [entry[0]['StartDate']].push(e2)         // push the plan into the array for this date. ;
          }
        }
      }
    }
  
    // the 'push' creates a 'bad' array ( doesn't appear in html ) so need to copy it to a new one ?????  //
    var theKeys = Object.keys(this .f2Plans);                         // get the keys of the 'bad' array
    var gI = 0;                   
    this. f3Plans = Array();                                          // create the new array
    for ( let k = 0; k < theKeys.length; k++){                        // step thru the date-grouped plans
      if (this .f2Plans[theKeys[k]].length > 0)                       // if this date has planw
        this .f3Plans[gI++] = this .f2Plans[theKeys[k]]                 // copy each plan to the new array
    }
  }
  linacClass(str){
    if (str.indexOf("TrueBeam") !== -1)
      return 'geenClass';
    if (str.indexOf("Agility") !== -1)
      return 'purpleClass';
  }
  filterData(dArray){
    var index = 0;
    console.log("50 %0 ", dArray[4][25])
    this .filteredPlans= Array();
    Object.keys(dArray).forEach(key => {                    // step thru the plans for each Date
      this .filteredPlans[key] = Array();              // create it
      Object.keys(dArray).forEach(key2 => {                 // step thru each plan
        if (dArray[key][key2]   ){                          // if there IS data

          if (dArray[key][key2]['UnitNumber'] == '7055544'){
            console.log("StartDate is "+   dArray[key][key2]['StartDate'] + "  flowbit is "  + dArray[key][key2]['flowbit'] + "flowAndWorkbit" + dArray[key][key2]['flowbitAndWorkbit'] );
          }
          if (+dArray[key][key2]['flowbit'] !== dArray[key][key2]['flowbitAndWorkbit'] ) 
          { // flowbit == flowbitAndWorkbigt -> QAComplete
            
            this .filteredPlans[key].push(dArray[key][key2]); // push the plan into the array
            if (dArray[key][key2]['UnitNumber'] == '7055544'){
              console.log("2222 key is " + key + " StartDate is "+   dArray[key][key2]['planIdx'] + "  flowbit is "  + dArray[key][key2]['flowbit'] + "flowAndWorkbit" + dArray[key][key2]['flowbitAndWorkbit'] );
              console.log(this .filteredPlans[key]);
            }
          }
        }

      })
    })

  }
}
