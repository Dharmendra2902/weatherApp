import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() { }
  chart = new Chart({
  chart:{
    type: 'solidgauge'
  },
  title:{
    text:'Chart'
  },
  credits:{
    enabled:false
  },series:[

  ]
});
add(){
  this.chart.addPoint(Math.floor(Math.random()*10))
}




ngOnInit(): void {
  this.add()
}

}
