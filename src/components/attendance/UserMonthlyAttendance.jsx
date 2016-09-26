import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as _ from 'lodash'

import * as actions_login from '../../actions/login/index'

import DayWorking from './DayWorking'
import DayFutureWorking from './DayFutureWorking'
import DayNonWorking from './DayNonWorking'
import DayLeave from './DayLeave'
import DayHalfDay from './DayHalfDay'


import UserDetails from './UserDetails'
import MonthSummary from './MonthSummary'




class UserMonthlyAttendance extends React.Component {
    constructor( props ){
        super( props );
    }
    componentDidMount(){
        
    }
    componentWillMount(){
    }
    componentWillReceiveProps( props ){
    }
  
    _getWeekHtml( userid, w ){
      return _.map( w, ( dayData, key ) => {
        let dayHtml = ''
        if( dayData.day_type == 'NON_WORKING_DAY' ){
          //dayHtml = <DayNonWorking dayData={dayData}/>
          dayHtml = <DayWorking dayData={dayData} showDaySummary={this.props.onShowDaySummary} userid={userid} />
        }else if( dayData.day_type == 'LEAVE_DAY' ){
          dayHtml = <DayLeave dayData={dayData}/>
        }else if( dayData.day_type == 'HALF_DAY' ){
          dayHtml = <DayHalfDay dayData={dayData}/>
        }else if( dayData.day_type == 'FUTURE_WORKING_DAY' ){
          dayHtml = <DayFutureWorking dayData={dayData} />
        }else{
          dayHtml = <DayWorking dayData={dayData} showDaySummary={this.props.onShowDaySummary} userid={userid} />
        }
        
        return (
          <td key={key}  className="fc-event-container">
            { dayHtml }
          </td>
        )
      })
    }

    _getMonthHtml( styles, userid, m ){
      let weekWise = _.chunk(m, 7)
      return _.map( weekWise, ( week, key ) => {
        let weekHtml = this._getWeekHtml( userid, week )
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
    if( check == 'previous' ){
        this.props.onMonthAttendance( this.props.monthlyAttendance.userid, this.props.monthlyAttendance.previousMonth.year, this.props.monthlyAttendance.previousMonth.month )
      }else if( check == 'next' ){
        this.props.onMonthAttendance( this.props.monthlyAttendance.userid, this.props.monthlyAttendance.nextMonth.year, this.props.monthlyAttendance.nextMonth.month )
      }
      
    }





    


    render(){
      
      let user_id = this.props.monthlyAttendance.userid ;
      let styles = _.cloneDeep(this.constructor.styles);
      let calendarStructure = this._getMonthHtml( styles, user_id, this.props.monthlyAttendance.attendance )

      
        return(
        	<div >
				
          
        

  				<div id="content" className="app-content box-shadow-z0" role="main">
    				
    				<div className="app-body" id="view">

            


<div>
    
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


      


  
      <UserDetails {...this.props } />

  <MonthSummary {...this.props }/>
  
  



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

UserMonthlyAttendance.styles = {
  height100per: {
    'minHeight' : '150px'
  }
};

export default UserMonthlyAttendance