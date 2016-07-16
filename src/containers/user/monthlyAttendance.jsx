import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import VisibleHeader from '../../containers/generic/header'
import VisibleMenu from '../../containers/generic/menu'

import * as actions_login from '../../actions/login/index'


class MonthlyAttendance extends React.Component {
    constructor( props ){
        super( props );
    }
    componentWillMount(){
        if( this.props.onIsAlreadyLogin() == false ){
          this.props.router.push('/');
        }else{
        }

        let user_id =  this.props.logged_user.userid;
        let d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth() + 1  // +1 since getMonth starts from 0
        this.props.onMonthAttendance( user_id, year, month )
    }
    _getDayHtml( d ){


      let d_date = d.date;

      let date_div  = <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
            <div className="fc-content">
              <span className="fc-time"><h5>{ d_date }</h5></span>
              <span className="fc-title"> { d.day }</span>
            </div>
          </a>;

      let work_time_div =  <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable center">
            <div className="fc-content">
              { d.total_time} - Total Work Time
              
            </div>
          </a>

      

      if( d.admin_alert == 1 ){
        d_date = d_date + ' * '
        date_div  = <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end indigo fc-draggable">
            <div className="fc-content">
              <span className="fc-time"><h5>{ d_date }</h5></span>
              <span className="fc-title"> { d.day }</span>
            </div>
          </a>;



        work_time_div =  <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable center">
            <div className="fc-content">
              {d.admin_alert_message}
              
            </div>
          </a>
      }

      let extraTime = ''
    if( d.extra_time_status == '-' ){
        extraTime = <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
            <div className="fc-content">
              <span className="fc-time">  { d.extra_time }</span>
              <span className="fc-title"></span>
            </div>
          </a>

      }else if( d.extra_time_status == '+' ){
        extraTime = <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end green fc-draggable">
            <div className="fc-content">
              <span className="fc-time">  { d.extra_time }</span>
              <span className="fc-title"></span>
            </div>
          </a>

      }

    return (
        <div >
          
          {date_div}
          
          <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
            <div className="fc-content">
              <span className="fc-time">  { d.in_time } - { d.out_time}  </span>
              <span className="fc-title"> Work Time </span>
            </div>
          </a>

         {work_time_div}

          {extraTime}

          

          
        </div>
      )
    }


    _getFutureWorkingDayHtml( d ){
      return (
        <div >
          <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
            <div className="fc-content">
              <span className="fc-time"><h5>{ d.date }</h5></span>
              <span className="fc-title"> { d.day }</span>
            </div>
          </a>
        </div>
      )

    }

    _getNonWorkingDayHtml( d ){
      return (
        <div >
          
          <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end yellow fc-draggable">
            <div className="fc-content">
              <span className="fc-time"><h5>{ d.date }</h5></span>
              <span className="fc-title"> { d.day }</span>
            </div>
          </a>
          
          <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end yellow fc-draggable">
            <div className="fc-content">
              <span className="fc-time"> Non working day  </span>
              <span className="fc-title"></span>
            </div>
          </a>

          <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end yellow fc-draggable">
            <div className="fc-content">
              <span className="fc-time"> { d.day_text } </span>
              <span className="fc-title"></span>
            </div>
          </a>
          
        </div>
      )

    }
    _getLeaveDayHtml( d ){
      return (
        <div >
          
          <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
            <div className="fc-content">
              <span className="fc-time"><h5>{ d.date }</h5></span>
              <span className="fc-title"> { d.day }</span>
            </div>
          </a>
          
          <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
            <div className="fc-content">
              <span className="fc-time"> On Leave </span>
              <span className="fc-title"></span>
            </div>
          </a>

          <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
            <div className="fc-content">
              <span className="fc-time"> { d.day_text } </span>
              <span className="fc-title"></span>
            </div>
          </a>
          
        </div>
      )

    }
    _getHalfDayHtml( d ){
      return (
        <div >
          
          <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red-100 fc-draggable">
            <div className="fc-content">
              <span className="fc-time"><h5>{ d.date }</h5></span>
              <span className="fc-title"> { d.day }</span>
            </div>
          </a>
          
          <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red-100 fc-draggable">
            <div className="fc-content">
              <span className="fc-time"> Half Day </span>
              <span className="fc-title"> { d.in_time } - { d.out_time}  </span>
            </div>
          </a>

          <a className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red-100 fc-draggable">
            <div className="fc-content">
              <span className="fc-time">{ d.day_text } </span>
              <span className="fc-title">  </span>
            </div>
          </a>
          
        </div>
      )

    }

    _getWeekHtml( w ){
      return _.map( w, ( dayData, key ) => {
        let dayHtml = ''
        if( dayData.day_type == 'NON_WORKING_DAY' ){
          dayHtml = this._getNonWorkingDayHtml( dayData )  
        }else if( dayData.day_type == 'LEAVE_DAY' ){
          dayHtml = this._getLeaveDayHtml( dayData )  
        }else if( dayData.day_type == 'HALF_DAY' ){
          dayHtml = this._getHalfDayHtml( dayData )  
        }else if( dayData.day_type == 'FUTURE_WORKING_DAY' ){
          dayHtml = this._getFutureWorkingDayHtml( dayData )  
        }else{
          dayHtml = this._getDayHtml( dayData )
        }
        
        return (
          <td key={key}  className="fc-event-container">
            { dayHtml }
          </td>
        )
      })
    }

    _getMonthHtml( styles, m ){
      let weekWise = _.chunk(m, 7)
      return _.map( weekWise, ( week, key ) => {
        let weekHtml = this._getWeekHtml( week )
        return (
          <div key={key} className="fc-row fc-week fc-widget-content"  style={styles.height100per} >
            <div className="fc-bg">
              <div className="fc-content-skeleton">
                <table>
                  <tbody>
                    <tr>
                      { weekHtml }
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
          </div>
        )
      })
    }

    _onChangeMonth( check ){

      console.log( this.props.monthlyAttendance.previousMonth )

      if( check == 'previous' ){
        this.props.onMonthAttendance( this.props.monthlyAttendance.userid, this.props.monthlyAttendance.previousMonth.year, this.props.monthlyAttendance.previousMonth.month )
      }else if( check == 'next' ){
        console.log( this.props.monthlyAttendance )
        this.props.onMonthAttendance( this.props.monthlyAttendance.userid, this.props.monthlyAttendance.nextMonth.year, this.props.monthlyAttendance.nextMonth.month )
      }
      
    }


    render(){
      let styles = _.cloneDeep(this.constructor.styles);
      let calendarStructure = this._getMonthHtml( styles, this.props.monthlyAttendance.attendance )

      
        return(
        	<div >
				<VisibleMenu/>

        

  				<div id="content" className="app-content box-shadow-z0" role="main">
    				<div className="app-header white box-shadow">
						<div className="navbar">
    						<a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      							<i className="material-icons">&#xe5d2;</i>
    						</a>
    						<div className="navbar-item pull-left h5" ng-bind="$state.current.data.title" id="pageTitle"> My Calendar</div>
						</div>
    				</div>
					<div className="app-footer" ng-class="{'hide': $state.current.data.hideFooter}">
  						<div ui-include="'../views/blocks/footer.html'"></div>
					</div>
    				<div ui-view className="app-body" id="view">


<div className="padding">
    
    <div className="fullcalendar fc fc-ltr fc-unthemed">
      <div className="fc-toolbar">
      	<div className="fc-left">
      		<button type="button" className="fc-prev-button fc-button fc-state-default fc-corner-left fc-corner-right" onClick={ () => this._onChangeMonth( 'previous' ) } >
            <span className="fc-icon fc-icon-left-single-arrow"></span>
      		</button>
      	</div>
      	<div className="fc-right">
      		<button type="button" className="fc-next-button fc-button fc-state-default fc-corner-left fc-corner-right" onClick={ () => this._onChangeMonth( 'next' ) }>
            <span className="fc-icon fc-icon-right-single-arrow"></span>
      		</button>
      	</div>
      	<div className="fc-center">

      		<h2> { this.props.monthlyAttendance.monthName } { this.props.monthlyAttendance.year }</h2>

      	</div>
      	<div className="fc-clear"></div>
      </div>

      <br/>


      <div className="row">
    <div className="col-xs-12 col-sm-4">
          <div className="box p-a">
            <div className="pull-left m-r">
              <span className="w-48 rounded  accent">
                <i className="material-icons"></i>
              </span>
            </div>
            <div className="clear">
              <h4 className="m-a-0 text-lg _300">
              { this.props.monthlyAttendance.monthSummary.actual_working_hours} <span className="text-sm"> </span></h4>
              <small className="text-muted"> Total Working Hours  </small>
            </div>
          </div>
      </div>
      <div className="col-xs-6 col-sm-4">
          <div className="box p-a">
            <div className="pull-left m-r">
              <span className="w-48 rounded primary">
                <i className="material-icons"></i>
              </span>
            </div>
            <div className="clear">
              <h4 className="m-a-0 text-lg _300">
              { this.props.monthlyAttendance.monthSummary.completed_working_hours} <span className="text-sm"></span></h4>
              <small className="text-muted">Completed</small>
            </div>
          </div>
      </div>
      <div className="col-xs-6 col-sm-4">
          <div className="box p-a">
            <div className="pull-left m-r">
              <span className="w-48 rounded warn">
                <i className="material-icons"></i>
              </span>
            </div>
            <div className="clear">
              <h4 className="m-a-0 text-lg _300">
              { this.props.monthlyAttendance.monthSummary.pending_working_hours} <span className="text-sm"></span></h4>
              <small className="text-muted">Pending</small>
            </div>
          </div>
      </div>
  </div>



  <div className="box">
    <div className="box-header">
      <h3>Day Reference</h3>
      <small></small>
    </div>
    <div className="box-body">
      <div className="row no-gutter m-b text-xs l-h-1x">
       <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1">
          <div className="p-a white">
            <h4>{ this.props.monthlyAttendance.monthSummary.WORKING_DAY}</h4>
            <div className="h-3x text-u-c _600 text-sm">Working Day</div>
          </div>
        </div>
        <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1">
          <div className="p-a yellow">
            <h4>{ this.props.monthlyAttendance.monthSummary.NON_WORKING_DAY}</h4>
            <div className="h-3x text-u-c _600 text-sm"> Non Working Day</div>

          </div>
        </div>
       
        <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1">
          <div className="p-a red">
            <h4>{ this.props.monthlyAttendance.monthSummary.LEAVE_DAY}</h4>
            <div className="h-3x text-u-c _600 text-sm">Leave Day</div>
          </div>
        </div>

        <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1">
          <div className="p-a red-100">
            <h4>{ this.props.monthlyAttendance.monthSummary.HALF_DAY}</h4>
            <div className="h-3x text-u-c _600 text-sm">Half Day</div>
          </div>
        </div>

        <div className="col-xs-4 col-sm-3 col-md-2 col-lg-1">
          <div className="p-a indigo">
            <h4>*</h4>
            <div className="h-3x text-u-c _600 text-sm">Admin Alert</div>
          </div>
        </div>
        
        
        
      </div>
    </div>
  </div>




























      <div className="fc-view-container" >
        <div className="fc-view fc-month-view fc-basic-view">
            <table>
              <tbody className="fc-body">
                <tr>
                  <td className="fc-widget-content">
                    <div className="fc-day-grid-container">
                      <div className="fc-day-grid">

                        { calendarStructure }


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


MonthlyAttendance.styles = {
  height100per: {
    'minHeight' : '150px'
  }
};

function mapStateToProps( state ){
	return {
        frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS(),
        monthlyAttendance : state.monthlyAttendance.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onMonthAttendance : ( userid, year, month ) => {
            return dispatch( actions_monthlyAttendance.get_monthly_attendance( userid, year, month ))
        },
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        }
    }
}

const VisibleMonthlyAttendance = connect(
  mapStateToProps,
  mapDispatchToProps
)( MonthlyAttendance )

const RouterVisibleMonthlyAttendance = withRouter( VisibleMonthlyAttendance )

export default RouterVisibleMonthlyAttendance