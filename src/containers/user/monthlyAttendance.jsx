import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'


import * as actions_login from '../../actions/login/index'


import UserMonthlyAttendance from '../../components/attendance/UserMonthlyAttendance'

class MonthlyAttendance extends React.Component {
    constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
    }
    componentWillMount(){
        let user_id =  this.props.logged_user.userid;
        let d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth() + 1  // +1 since getMonth starts from 0
        this.props.onMonthAttendance( user_id, year, month )
    }
    componentWillReceiveProps( props ){
      window.scrollTo(0, 0);
        if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == 'Admin' || props.logged_user.role == 'Guest' ){
                this.props.router.push('/home');    
            }
        }
    }
    render(){
        return(
        	<div >
				<Menu {...this.props}/>

        

  				<div id="content" className="app-content box-shadow-z0" role="main">
    				


            <div className="app-header white box-shadow">
                <div className="navbar">
                  <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                    <i className="material-icons">&#xe5d2;</i>
                  </a>
                  <div className="navbar-item pull-left h5" id="pageTitle">My Calendar</div>
                </div>
                <div className="row no-gutter">
                  <div className="col-12">
                    <LoadingIcon {...this.props}/>
                  </div>
                </div>
              </div>


					
    				<div className="app-body" id="view">
            


              <div className="padding">
                  <UserMonthlyAttendance {...this.props} />
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