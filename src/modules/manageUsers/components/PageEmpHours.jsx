import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
// import _ from 'lodash';
import * as actions from 'appRedux/actions';
import {HighchartsChart, Chart, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries} from 'react-jsx-highcharts';
import 'react-date-picker/index.css';
// import {DateField} from 'react-date-picker';
// import 'react-date-picker/index.css';
// var moment = require('moment');

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
    this.onChangeMonthData = this.onChangeMonthData.bind(this);
  }
  componentsWillMount () {

  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
  }
  onChangeMonthData (check) {
    if (check === 'previous') {

    } else if (check === 'next') {

    }
  }
  render () {
    console.log(this.props);
    return (
      <div>
        <div className="row">
          <div className="fullcalendar fc fc-ltr fc-unthemed">
            <div className="fc-toolbar">
              <div className="fc-left">
                <button type="button" className="fc-prev-button fc-button fc-state-default fc-corner-left fc-corner-right"
                  onClick={() => this.onChangeMonthData('previous')}>
                  <span className="fc-icon fc-icon-left-single-arrow"></span>
                </button>
              </div>
              <div className="fc-right">
                <button type="button" className="fc-next-button fc-button fc-state-default fc-corner-left fc-corner-right"
                  onClick={() => this.onChangeMonthData('next')}>
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
              <SplineSeries id="average" name="Average" data={[3, 2.67, 3, 6.33, 3.33]} />
              <PieSeries id="total-consumption" name="Total consumption" center={[100, 80]} size={100} showInLegend={false} />
            </YAxis>
          </HighchartsChart>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:     state.frontend.toJS(),
    loggedUser:   state.logged_user.userLogin,
    usersList:    state.usersList.toJS(),
    teamStats:    state.teamStats,
    empLifeCycle: state.teamStats.empLifeCycle,
    empHours:     state.teamStats.empHours
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageEmpHours));
