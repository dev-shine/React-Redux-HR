import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'

import ApplyLeaveForm from '../../components/leaves/ApplyLeaveForm'

import * as actions_login from '../../actions/login/index'
import * as actions_apply_leave from '../../actions/leave/applyLeave'


import UserMonthlyAttendance from '../../components/attendance/UserMonthlyAttendance'

class ApplyLeave extends React.Component {
    constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        
    }
    componentDidMount(){
      
    }
    componentWillMount(){
    }
    componentWillReceiveProps( props ){
        if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == 'Admin' || props.logged_user.role == 'Guest' ){
                this.props.router.push('/home');    
            }
        }
    }
    
    render(){

      let status_message = ""
      if( this.props.applyLeave.status_message != '' ){
        status_message = <span className="label label-lg primary pos-rlt m-r-xs">
          <b className="arrow left b-primary"></b>{this.props.applyLeave.status_message}</span>
      }

        return(
        	<div >
				<Menu {...this.props}/>

        

  				<div id="content" className="app-content box-shadow-z0" role="main">
    				<div className="app-header white box-shadow">
						<div className="navbar">
    						<a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      							<i className="material-icons">&#xe5d2;</i>
    						</a>
    						<div className="navbar-item pull-left h5" id="pageTitle">Apply For Leaves &nbsp;&nbsp;&nbsp; {status_message} </div>
						</div>
    				</div>
					<div className="app-footer">
  						<div></div>
					</div>
    				<div className="app-body" id="view">

            <div className="row"><div className="col-12"><LoadingIcon {...this.props}/></div></div>


              <div className="padding">
                  <div className="box">
        <div className="box-divider m-a-0"></div>
        <div className="box-body">

        <ApplyLeaveForm {...this.props}/>
          



        </div>
      </div>
                  </div>

              </div>

          </div>

    </div>

        )
    }
}


ApplyLeave.styles = {
  height100per: {
    'minHeight' : '150px'
  }
};

function mapStateToProps( state ){
	return {
        frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS(),
        applyLeave : state.applyLeave.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onApplyLeave : ( from_date, to_date, no_of_days, reason ) => {
            return dispatch( actions_apply_leave.apply_leave( from_date, to_date, no_of_days, reason  ))
        },
        onDaysBetweenLeaves : ( startDate, endDate ) => {
          return dispatch( actions_apply_leave.getDaysBetweenLeaves( startDate, endDate  ))
        }
    }
}

const VisibleApplyLeave = connect(
  mapStateToProps,
  mapDispatchToProps
)( ApplyLeave )

const RouterVisibleApplyLeave = withRouter( VisibleApplyLeave )

export default RouterVisibleApplyLeave