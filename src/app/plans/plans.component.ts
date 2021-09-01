import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  panelOpenState: boolean;
  constructor() { }

  ngOnInit(): void {

  }

  mainQA(event: MatTabChangeEvent){
    console.log("hellow %o", event);
  }

}
