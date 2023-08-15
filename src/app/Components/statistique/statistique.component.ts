import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
// @ts-ignore
import {Chart} from "chart.js";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  barDataLabel:string[]=['rouge','bleu','vert','noir']
  barDataChart:number[]=[1,2,4,5]
  chartBar!:Chart<"bar",number[],unknown>;
  constructor() { }

  ngOnInit(): void {
    this.chartBar = new Chart(
      'myChart',{
        type:'bar',
        data:{
          labels:this.barDataLabel,
          datasets:[
            {label:'Some chart',
            data:this.barDataChart,
            backgroundColor: '#243B55'}
          ]
        }
      }
    )
    console.log(this.chartBar)
  }

}
