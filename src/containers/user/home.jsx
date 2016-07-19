import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as actions_userDaySummary from '../../actions/user/userDaySummary'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import VisibleHeader from '../../containers/generic/header'
import VisibleMenu from '../../containers/generic/menu'
import VisibleLoadingIcon from '../../containers/generic/loadingIcon'

import * as actions_login from '../../actions/login/index'
import * as actions_usersList from '../../actions/user/usersList'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'


import VisibleUsersList from '../../containers/generic/usersList'
import VisibleUserMonthlyAttendance from '../../components/attendance/userMonthlyAttendance'

class Home extends React.Component {
    constructor( props ){
        super( props );
        this.onUserClick = this.onUserClick.bind( this )
        this.state = {
            "showMonthlyAttendance" : "0"
        }
    }
    componentWillMount(){
    	if( this.props.onIsAlreadyLogin() == false ){
          this.props.router.push('/');
        }else{
        	if( this.props.logged_user.role == 'Admin' || this.props.logged_user.role == 'Guest' ){
        		//this.props.router.push('/attendance_summary');	
        		this.props.onUsersList( )
        	}else{
        		this.props.router.push('/monthly_attendance');	
        	}
        }
    }
    componentWillReceiveProps( props ){
        
    }
    onUserClick( userid ){
        this.setState({
            "showMonthlyAttendance" : "1"
        })
        let d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth() + 1  // +1 since getMonth starts from 0
        this.props.onMonthAttendance( userid, year, month )
    }
  	render(){
		
        

        let mainDivs = <div className="row">
                            <div className="col-md-12">
                                <VisibleUsersList users = { this.props.usersList.users } onUserClick = { this.onUserClick } />
                            </div>
                        </div>
        if( this.state.showMonthlyAttendance == '1'){
            
             mainDivs = <div className="row">

            <div className="col-md-2">
                                    <VisibleUsersList users = { this.props.usersList.users } onUserClick = { this.onUserClick } />
                                </div>
                                <div className="col-md-10">
                                    <VisibleUserMonthlyAttendance {...this.props} />
                                </div>
                                </div>
        }

		return(
    		<div>
    			<VisibleMenu/>

  				<div id="content" className="app-content box-shadow-z0" role="main">
    				<div className="app-header white box-shadow">
						<div className="navbar">
    						<a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      							<i className="material-icons">&#xe5d2;</i>
    						</a>
    						<div className="navbar-item pull-left h5" ng-bind="$state.current.data.title" id="pageTitle">Users</div>
						</div>
    				</div>
					<div className="app-footer" ng-class="{'hide': $state.current.data.hideFooter}">
  						<div ui-include="'../views/blocks/footer.html'"></div>
					</div>
    				<div ui-view className="app-body" id="view">

            			<div className="row">
            				<div className="col-12">
            					<VisibleLoadingIcon/>
            				</div>
            			</div>
						<div className="padding">
							
	            				{mainDivs}
	            			</div>
							
						</div>
					</div>
    			
    		</div>
    	)
    }
}

function mapStateToProps( state ){
	return {
        frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS(),
        usersList : state.usersList.toJS(),
        monthlyAttendance : state.monthlyAttendance.toJS()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onUsersList : () => {
        	return dispatch( actions_usersList.get_users_list(  ))	
        },
        onMonthAttendance : ( userid, year, month ) => {
            return dispatch( actions_monthlyAttendance.get_monthly_attendance( userid, year, month ))
        }
    }
}

const VisibleHome = connect(
  mapStateToProps,
  mapDispatchToProps
)( Home )

const RouterVisibleHome= withRouter( VisibleHome )

export default RouterVisibleHome