import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries
} from 'react-jsx-highcharts';
import userDashboard from 'components/manageUser/userDashboard';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';
import moment from 'moment';

class PageEmpHours extends Component {
  constructor (props) {
    super(props);
    this.state = {
      search:     '',
      start_year: '',
      end_year:   ''
    };
  }
  componentsWillMount (props) {
  }

  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
  }
  empYear () {
    console.log('empYear');
    const startYear = moment(this.state.start_year).format('YYYY');
    const endYear = moment(this.state.end_year).format('YYYY');
    this.props.requestEmployeLifeCycle({startYear, endYear});
  }
  render () {
    const pieData = [{
      name: 'Jane',
      y:    13
    }, {
      name: 'John',
      y:    23
    }];

    return (
      <div>
        <div className="row">
          <div className="row no-gutter">
            <div className="col-md-3 p-r" >
              <div className="form-group" style={{marginLeft: '4%'}}>
                <label style={{'fontSize': 15}}>Filter:</label>
                  <DateField
                    className="form-control"
                    dateFormat="YYYY-MM-DD"
                    onChange={(date) => {
                      this.setState({
                        start_year: date
                      });
                    }} />
              </div>
            </div>
            <div className="col-md-3 p-r">
              <div className="form-group">
                  <label style={{marginTop: '12.4%'}}> </label>
                    <DateField
                      className="form-control"
                      dateFormat="YYYY-MM-DD"
                      onChange={(date) => {
                        this.setState({
                          end_year: date
                        });
                      }} />
              </div>
            </div>
            <button type="button" style={{marginTop: '2%'}} onClick={() => this.empYear()} className="btn btn-info btn-sm">Get Attendance</button>
              </div>
            </div>

        <div className="team">
        <HighchartsChart>
          <Chart />
          <Title>{'Employee Time Table'}</Title>
          <Legend />
          <XAxis id="x" categories={['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} />
          <YAxis id="number">
            <ColumnSeries id="jane" name="emp1" data={[3, 2, 1, 3, 14]} />
            <ColumnSeries id="john" name="emp2" data={[2, 3, 5, 7, 6]} />
            <SplineSeries id="average" name="Average" data={[3, 2.67, 3, 6.33, 3.33]} />
            <PieSeries id="total-consumption" name="Total consumption" data={pieData} center={[100, 80]} size={100} showInLegend={false} />
          </YAxis>
        </HighchartsChart>
      </div>
    </div>
    );
  }
}

export default PageEmpHours;
