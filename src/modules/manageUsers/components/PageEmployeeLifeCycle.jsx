import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {HighchartsChart, LineSeries, Chart, XAxis, YAxis, Title, Tooltip, Subtitle, Legend, ColumnSeries} from 'react-jsx-highcharts';

class PageEmployeeLifeCycle extends Component {
  constructor (props) {
    super(props);
    this.state = {
      start_year:   '',
      end_year:     '',
      empLifeCycle: ''
    };
    this.getByYearData = this.getByYearData.bind(this);
  }
  componentWillMount (props) {
    window.scrollTo(0, 0);
    const d = new Date();
    const start_year = d.getFullYear();
    const end_year = d.getFullYear();
    const userId = localStorage.getItem('userid');
    this.setState({
      empLifeCycle: this.props.empLifeCycle
    });
    this.props.requestEmployeLifeCycle();
  }

  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    this.setState({
      empLifeCycle: this.props.empLifeCycle.data
    });
  }
  getByYearData (evt) {
    const userId = localStorage.getItem('userid');
    let start_year = this.state.start_year !== '' ? this.state.start_year : this.props.currentYear;
    let end_year = this.state.end_year !== '' ? this.state.end_year : this.props.currentYear;
    this.props.requestEmployeLifeCycle({
      'start_year': start_year,
      'end_year':   end_year
    });
  }
  render () {
    let yearS = [];
    let yearOptions = [];
    let endYearOptions = [];
    let noOfMonths = [];
    let countJoinees = [];
    let countTerminations = [];
    let EmpLife = this.state.empLifeCycle;
    let startYearOptions = _.map(this.props.year, (data, i) => {
      return (
      yearOptions.push(<option key={i} value={data}>{data}</option>)
      );
    });
    let endYearOption = _.map(this.props.year, (data, i) => {
      return (
      endYearOptions.push(<option key={i} value={data}>{data}</option>)
      );
    });
    let EmpGraphData = _.map(EmpLife, (memberData, k) => {
      yearS[k] = memberData.Year;
      let dataStatus = _.map(memberData.Stats, (empData, j) => {
        noOfMonths.push(empData.Month);
        countJoinees.push(empData.details[0].count_joinees);
        countTerminations.push(empData.details[0].count_terminations);
        return (
          <YAxis key={j} id="number">
            <ColumnSeries id="countJoinees" name="emp1" data={countJoinees} />
            <ColumnSeries id="countTerminations" name="emp2" data={countTerminations} />
          </YAxis>
        );
      });
      return (
        <div key={k} className="team">
          <HighchartsChart>
            <Chart backgroundColor={null} style={{'fontFamily': 'Dosis, sans-serif'}} />
            <Title style={{'fontSize': '16px', 'fontWeight': 'bold', 'textTransform': 'uppercase'}}>{'Employee Life Cycle in'}{memberData.Year}</Title>
            <Subtitle>{'Employee Recruit and Leave'}</Subtitle>
            <Legend itemStyle={{'fontWeight': 'bold', 'fontSize': '13px'}} />
            <Tooltip backgroundColor={'rgba(219,219,216,0.8)'} shadow={false} borderWidth={0} />
            <XAxis id="j" key={noOfMonths} categories={noOfMonths} title={{'style': {'textTransform': 'uppercase'}}} gridLineWidth={1} labels={{'style': {'fontSize': '12px'}}}>
              <XAxis.Title>Month</XAxis.Title>
            </XAxis>
            <YAxis id="number" title={{'style': {'textTransform': 'uppercase'}}} labels={{'style': {'fontSize': '12px'}}} >
              <YAxis.Title >No. of employee</YAxis.Title>
              <LineSeries id="countJoinees" name="Total Joining" data={countJoinees} />
              <LineSeries id="countTerminations" name="Total Terminations" data={countTerminations} />
            </YAxis>
          </HighchartsChart>
        </div>
      );
    });
    return (
      <div>
        <div className="padding">
          {EmpGraphData}
        </div>
        <div className="col-md-12 row">
          <div className="form-group col-md-4">
            <label htmlFor="sel1">Start Year:</label>
            <select className="form-control" id="sel1" defaultValue={this.props.currentYear}
              onChange={(evt) => { this.setState({start_year: evt.target.value}); this.getByYearData();}}>
              <option >Select Start Year</option>
              {yearOptions}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="sel1">End Year:</label>
            <select className="form-control" id="sel12" defaultValue={this.props.currentYear}
              onChange={(evt) => { this.setState({end_year: evt.target.value}); this.getByYearData();}}>
              <option>Select End Year</option>
              {endYearOptions}
            </select>
          </div>
          <div className="form-group col-md-4">
            <button type="button"
              onClick={(evt) => this.getByYearData()}
            className="btn btn-primary form-group m-t-md">Get Details
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PageEmployeeLifeCycle;
