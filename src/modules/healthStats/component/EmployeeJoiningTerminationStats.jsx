import React, { Component } from "react";
import Highcharts from "highcharts";
import * as _ from "lodash";
export default class EmployeeJoiningTerminationStats extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      flag: false
    }
  }
  componentWillUpdate(nextProps) {
    if(!this.state.flag){
      if (nextProps && nextProps.data && nextProps.data.data && nextProps.data.data.stats) {
        this.highChartRender(nextProps);
        this.setState({flag:true});
      }
    }
  }
  highChartRender = props => {
    Highcharts.chart({
      chart: {
        height:  50 + '%', 
        type: "column",
        renderTo: "chart-container"
      },
      title: {
        text: ""
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: Object.keys(
          props.data.data.stats.joining_termination_stats
        )
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
          name: "Joining",
          color:"#82E0AA",
          data: _.map(
            props.data.data.stats.joining_termination_stats,
            "joining"
          )
        },
        {
          name: "Termination",
          color:"#F5B7B1",
          data: _.map(
            props.data.data.stats.joining_termination_stats,
            "termination"
          )
        }
      ]
    });
  };
  render() {
    return <div id="chart-container"></div>;
  }
}
