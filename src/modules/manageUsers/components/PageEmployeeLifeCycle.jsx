import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {HighchartsChart, Chart, XAxis, YAxis, Title, Legend, ColumnSeries} from 'react-jsx-highcharts';

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
  componentsWillMount (props) {
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
    this.props.requestEmployeLifeCycle({
      'start_year': this.state.start_year,
      'end_year':   this.state.end_year
    });
  }
  render () {
    let yearS = [];
    let yearOptions = [];
    let noOfMonths = [];
    let countJoinees = [];
    let countTerminations = [];
    let EmpLife = this.state.empLifeCycle;
    let EmpGraphData = _.map(EmpLife, (memberData, k) => {
      yearS[k] = memberData.Year;
      yearOptions.push(<option key={k} value={memberData.Year}>{memberData.Year}</option>);
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
            <Chart />
            <Title >{'Employee Life Cycle in'}{memberData.Year}</Title>
            <Legend />
            <XAxis id="j" key={noOfMonths} categories={noOfMonths} />
            <YAxis id="number">
              <ColumnSeries id="countJoinees" name="Total Joining" data={countJoinees} />
              <ColumnSeries id="countTerminations" name="Total Terminations" data={countTerminations} />
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
            <select className="form-control" id="sel1"
              onChange={(evt) => { this.setState({start_year: evt.target.value}); }}>
              <option>Select Start Year</option>
              {yearOptions}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="sel1">End Year:</label>
            <select className="form-control" id="sel12"
              onChange={(evt) => { this.setState({end_year: evt.target.value}); }}>
              <option>Select End Year</option>
              {yearOptions}
            </select>
          </div>
          <div className="form-group col-md-4">
            <button type="button"
              style={{marginTop: '6%'}}
              onClick={(evt) => this.getByYearData()}
              className="btn btn-primary form-group">Get Details
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PageEmployeeLifeCycle;
