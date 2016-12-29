import React from 'react';
import {connect} from 'react-redux'
import {Router, browserHistory, Link, withRouter} from 'react-router'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as _ from 'lodash'

import * as actions_login from '../../actions/login/index'

import Day from '../../components/generic/Day'
import {CONFIG} from '../../config/index'
import UserDetails from './UserDetails'
import MonthSummary from './MonthSummary'

class WorkingHoursSummary extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}
  componentWillReceiveProps(props) {}

  _getWeekHtml(w) {
    return _.map(w, (dayData, key) => {
      let dayHtml = ''
      if (dayData.day_type == 'NON_WORKING_DAY') {
        //dayHtml = <DayNonWorking dayData={dayData}/>
        dayHtml = <Day forEmployeeHours={true} class="fc-day-grid-event fc-h-event fc-event fc-start fc-end yellow fc-draggable" day="Non Working day" dayData={dayData} {...this.props}/>
      } else if (dayData.day_type == 'FUTURE_WORKING_DAY') {
        dayHtml = <Day forEmployeeHours={false} class="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable" dayData={dayData}/>
      } else {
        dayHtml = <Day forEmployeeHours={true} dayData={dayData} {...this.props}/>
      }

      return (
        <td key={key} className="fc-event-container">
          {dayHtml}
        </td>
      )
    })
  }

  _getMonthHtml(styles, m) {
    let weekWise = _.chunk(m, 7)
    return _.map(weekWise, (week, key) => {

      let weekHtml = this._getWeekHtml(week)
      return (
        <div key={key} className="fc-row fc-week fc-widget-content" style={styles.height100per}>
          <div className="fc-bg">
            <div className="fc-content-skeleton">
              <table>
                <tbody>
                  <tr>
                    {weekHtml}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    })
  }

  _onChangeMonth(check) {
    if (check == 'previous') {
      this.props.onWorkingHoursSummary(this.props.workingHoursSummary.previousMonth.year, this.props.workingHoursSummary.previousMonth.month)
    } else if (check == 'next') {
      this.props.onWorkingHoursSummary(this.props.workingHoursSummary.nextMonth.year, this.props.workingHoursSummary.nextMonth.month)
    }

  }

  render() {

    let styles = _.cloneDeep(this.constructor.styles);
    let calendarStructure = this._getMonthHtml(styles, this.props.workingHoursSummary.monthSummary)

    return (
      <div >

        <div id="content" className="app-content box-shadow-z0" role="main">

          <div className="app-body" id="view">

            <div>

              <div className="fullcalendar fc fc-ltr fc-unthemed">
                <div className="fc-toolbar">
                  <div className="fc-left">
                    <button type="button" className="fc-prev-button fc-button fc-state-default fc-corner-left fc-corner-right" onClick={() => this._onChangeMonth('previous')}>
                      <span className="fc-icon fc-icon-left-single-arrow"></span>
                    </button>
                  </div>
                  <div className="fc-right">
                    <button type="button" className="fc-next-button fc-button fc-state-default fc-corner-left fc-corner-right" onClick={() => this._onChangeMonth('next')}>
                      <span className="fc-icon fc-icon-right-single-arrow"></span>
                    </button>
                  </div>
                  <div className="fc-center">

                    <h2>
                      {this.props.workingHoursSummary.monthName}
                      -{this.props.workingHoursSummary.year}</h2>

                  </div>
                  <div className="fc-clear"></div>
                </div>

                <br/>

                <div className="fc-view-container">
                  <div className="fc-view fc-month-view fc-basic-view">
                    <table>
                      <tbody className="fc-body">
                        <tr>
                          <td className="fc-widget-content">
                            <div className="fc-day-grid-container">
                              <div className="fc-day-grid">

                                {calendarStructure}

                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>

    )
  }
}

WorkingHoursSummary.styles = {
  height100per: {
    'minHeight': '150px'
  }
};

export default WorkingHoursSummary
