import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {
  HighchartsChart, Chart, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries
} from 'react-jsx-highcharts';
import 'react-date-picker/index.css';
var moment = require('moment');
import userDashboard from 'components/manageUser/userDashboard';
import {DateField} from 'react-date-picker';
import 'react-date-picker/index.css';

class PageEmpHours extends Component {
  constructor (props) {
    super(props);
    this.state = {
      search:      '',
      start_year:  '',
      end_year:    '',
      pendingData: '',
      year:        '',
      month:       ''
    };
  }
  componentsWillMount (props) {
  }

  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
  }
  empYear () {
    const startYear = moment(this.state.start_year).format('YYYY');
    const endYear = moment(this.state.end_year).format('YYYY');
    this.props.requestEmployeLifeCycle({startYear, endYear});
  }
  onChangeMonthData (check) {
    if (check === 'previous') {
      if (Object.keys(pendingData).length > 0) {
        year = pendingData.previousMonth.year;
        month = pendingData.previousMonth.month;
      }
      onUserPendingHoursData(year, month);
    } else if (check === 'next') {
      if (Object.keys(pendingData).length > 0) {
        year = pendingData.nextMonth.year;
        month = pendingData.nextMonth.month;
      }
      onUserPendingHoursData(year, month);
    }
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
          <div className="fullcalendar fc fc-ltr fc-unthemed">
            <div className="fc-toolbar">
              <div className="fc-left">
                <button type="button" className="fc-prev-button fc-button fc-state-default fc-corner-left fc-corner-right"
                  onClick={() => onChangeMonthData('previous')}>
                  <span className="fc-icon fc-icon-left-single-arrow"></span>
                </button>
              </div>
              <div className="fc-right">
                <button type="button" className="fc-next-button fc-button fc-state-default fc-corner-left fc-corner-right"
                  onClick={() => onChangeMonthData('next')}>
                  <span className="fc-icon fc-icon-right-single-arrow"></span>
                </button>
              </div>
              <div className="fc-center">
                <h2>{'SEP-2017'}</h2>
              </div>
              <div className="fc-clear"></div>
            </div>
          </div>
            </div>

        <div className="team row">
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
