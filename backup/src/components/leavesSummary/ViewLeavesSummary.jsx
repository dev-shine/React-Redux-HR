import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as _ from 'lodash'

import * as actions_login from '../../actions/login/index'






class ViewLeavesSummary extends React.Component {
    constructor( props ){
        super( props );
    }
    componentDidMount(){
        
    }
    componentWillMount(){
    }
    componentWillReceiveProps( props ){
    }
  
    

    _onChangeMonth( check ){
      if( check == 'previous' ){
        this.props.on_all_leaves_summary( this.props.componentData.previousMonth.year, this.props.componentData.previousMonth.month )
      }else if( check == 'next' ){
        this.props.on_all_leaves_summary( this.props.componentData.nextMonth.year, this.props.componentData.nextMonth.month )
      }
    }

    _getPendingPunchingDays( d ){
      return _.map( d, ( day, key ) => {
        let check_class = "b-success"
        if( day.day_type == 'WORKING_DAY'){
          if( day.in_time == '' || day.out_time == '' ){
            check_class = "b-danger"
          }          
        }

        let show_text = ""

        if( day.day_type == 'HALF_DAY' ){
          check_class = "b-warn"
          show_text = day.day_type + ' / ' + "Timings : " + day.in_time +' - ' + day.out_time + ' / Total Time : ' + day.total_time
        }


        return(

          <div key={key} className={`sl-item ${check_class}`}>
            <div className="sl-icon">
              <i className="fa fa-check"></i>
            </div>
            <div className="sl-content">
              <div className="">{day.display_date}</div>
              <div>{day.day_text}</div>
              <div>{show_text}</div>
            </div>
          </div>

        )
      })
    }


    _leavesSummaryHtml( d ){
      
      
        return _.map( d, ( user, key ) => {

          let pendingPunchingDays = this._getPendingPunchingDays( user.attendance )
          return (

            <div key={key} className="row">
              <div className="col-sm-12 col-md-12">
                <div className="box">
                  <div className="box-header">
                    <h3>{user.name}</h3>
                    <small>{user.jobtitle}</small>
                  </div>
                  <div className="box-body">
                    <div className="streamline b-l m-l">
                      {pendingPunchingDays}
                  </div>
                </div>
          </div>
      </div>
    </div>



          )
        })
    }





    


    render(){

      
      let styles = _.cloneDeep(this.constructor.styles);

      let current_month = ""
      let current_year = ""
      let current_monthName = ""
      if( typeof this.props.componentData.year != 'undefined' ){
        current_year = this.props.componentData.year
      }
      if( typeof this.props.componentData.month != 'undefined' ){
        current_month = this.props.componentData.month
      }
      if( typeof this.props.componentData.monthName != 'undefined' ){
        current_monthName = this.props.componentData.monthName
      }


      let summaryHtml = this._leavesSummaryHtml( this.props.componentData.leavesSummary )



      

      
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

      		<h2> {current_monthName} - { current_year }</h2>

      	</div>
      	<div className="fc-clear"></div>
      </div>

      <br/>


      
        <div className="fc-view fc-month-view fc-basic-view">
            
                        

          {summaryHtml}


          
        </div>
      
      
    </div>




</div>



    </div>
  </div>
  
  </div>


        )
    }
}

ViewLeavesSummary.styles = {
  height100per: {
    'minHeight' : '150px'
  }
};

export default ViewLeavesSummary