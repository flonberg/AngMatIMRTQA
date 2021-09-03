import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  [x: string]: any;
  panelOpenState: boolean;
  data: any;


  ngOnInit(): void {

  }
  
  constructor(private http: HttpClient) {
    console.log(" const ");
    this.getData().subscribe(res =>{
      this.setData(res);
    })
   }
  mainQA(event: MatTabChangeEvent){
    console.log("hellow %o", event);
  }

  getData(){
    var url = 'https://ion.mgh.harvard.edu/cgi-bin/imrtqa/getForQA.php';
   // var url = 'https://whiteboard.partners.org/esb/FLwbe/proxy.php?MDKey=test';
    return this .http.get(url)
    }
  setData(res ) {
      console.log("1113333")
      this.data = res;
      console.log(this.data)
    }
}
