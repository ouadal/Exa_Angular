import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
// @ts-ignore
 import {Chart,registerables} from "chart.js";

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
  //
  // barDataLabel:string[]=['rouge','bleu','vert','noir']
  // barDataChart:number[]=[1,2,4,5]
  // chartBar!:Chart<"bar",number[],unknown>;
  constructor() {
  }


  ngOnInit(): void {
    this.renderChart();
    //   this.chartBar = new Chart(
    //     'myChart',{
    //       type:'bar',
    //       data:{
    //         labels:this.barDataLabel,
    //         datasets:[
    //           {label:'Some chart',
    //           data:[1,2,4,5],
    //           backgroundColor: '#243B55'} ,
    //           {label:'Another chart',
    //           data:[12,7,9,5],
    //           backgroundColor: '#0f9b0f'}
    //         ]
    //       }
    //     }
    //   )
    //   console.log(this.chartBar)
    // }
  }

  renderChart() {
    const myChart = new Chart("CV", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'

          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });



  }
}
