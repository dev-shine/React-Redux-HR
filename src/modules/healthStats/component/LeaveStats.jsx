import React, { Component } from "react";
import Highcharts from "highcharts";
import * as _ from "lodash";
export default class LeaveStats extends React.Component {
  componentWillUpdate(nextProps) {
    if(nextProps.flag){
      if (nextProps && nextProps.data && nextProps.data.stats) {
        this.highChartRender(nextProps.data.stats);
        nextProps.handleFlag();
      }
    }
  }
  componentDidMount(){
    this.highChartRender();
  }
  highChartRender = (data) => {
    Highcharts.chart({
      chart: {
        type: "column",
        height:  50 + '%', 
        renderTo: "chart-container-leave"
      },
      title: {
        text: ""
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: _.map(_.filter(data, function(o) {{return o.type==="working"}}), o => `${o.date} ${o.day}`)
      },
      yAxis: {
        min: 0,
        title: {
          text: "Total Employment %"
        }
      },
      tooltip: {
        pointFormat:
          '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
      },
      plotOptions: {
        column: {
          stacking: "percent"
        }
      },
      series: [
        {
            name: "Approved",
            color:"#69f0ae",
            data: _.map(_.filter(data, function(o) {{return o.type==="working"}}),"approved")
        },
        {
            name: "Pending",
            color:"#ffff00",
            data: _.map(_.filter(data, function(o) {{return o.type==="working"}}),"pending")
        },
        {
            name: "Rejected",
            color:"#f44336",
            data: _.map(_.filter(data, function(o) {{return o.type==="working"}}),"rejected")
        }
      ]
    });
  };
  render() {
    return <div id="chart-container-leave"></div>;
  }
}