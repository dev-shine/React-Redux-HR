import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import UsersList from '../../components/attendance/UsersList'

import * as actions_login from '../../actions/login/index'
import * as actions_usersList from '../../actions/user/usersList'
import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as actions_userDaySummary from '../../actions/user/userDaySummary'



import UserMonthlyAttendance from '../../components/attendance/UserMonthlyAttendance'

import UserDaySummary from '../../components/attendance/UserDaySummary'

class Home extends React.Component {
    constructor( props ){
        super( props );
        
        this.state = {
            "defaultUserDisplay" : "",
            "daysummary_userid" : "",
            "daysummary_date" : "",
        }

        this.onUserClick = this.onUserClick.bind( this )
        this.onShowDaySummary = this.onShowDaySummary.bind( this )
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

        if( props.userDaySummary.status_message != ''){
            notify( props.userDaySummary.status_message );    
        }

        if( this.state.defaultUserDisplay  == '' ){
            if( props.usersList.users.length > 0 ){
                let firstUser = props.usersList.users[0]
                let defaultUserId = firstUser.user_Id
                this.onUserClick( defaultUserId )
            }
        }

    }
    onUserClick( userid ){
        this.setState({
            "defaultUserDisplay" : userid
        })
        let d = new Date();
        let year = d.getFullYear()
        let month = d.getMonth() + 1  // +1 since getMonth starts from 0
        this.props.onMonthAttendance( userid, year, month )
    }
    onShowDaySummary( userid, date ){
        this.setState({
            daysummary_userid : userid,
            daysummary_date : date,
        })
        this.props.onUserDaySummary( userid, date  )
    }

    doUpdateDaySummary( userid, date, entry_time, exit_time ){

        console.log( 'A ' + userid )
        console.log( 'B ' + date )
        console.log( 'C ' + entry_time )
        console.log( 'D ' + exit_time )

        evt.preventDefault();
        this.props.onUpdateDaySummary( userid, date, entry_time, exit_time ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })
    }



  	render(){
		
        

       
       
            
        let mainDivs = <div className="row">

            <div className="col-md-2">
                                    <UsersList users = { this.props.usersList.users } onUserClick = { this.onUserClick } {...this.props } />
                                </div>
                                <div className="col-md-10">
                                    <UserMonthlyAttendance {...this.props}  onShowDaySummary = { this.onShowDaySummary }/>
                                </div>
                                </div>
       

		return(
    		<div>
    			<Menu {...this.props }/>

                <UserDaySummary userid={this.state.daysummary_userid} date={this.state.daysummary_date} {...this.props}/>

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
            					<LoadingIcon {...this.props}/>
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
        monthlyAttendance : state.monthlyAttendance.toJS(),
        userDaySummary : state.userDaySummary.toJS(),
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
        },
        onUserDaySummary : ( userid, date ) => {
            return dispatch( actions_userDaySummary.getUserDaySummary( userid, date ))
        },
        onUpdateDaySummary : ( userid, date, entry_time, exit_time ) => {
            return dispatch( actions_userDaySummary.updateUserDaySummary( userid, date, entry_time, exit_time ) )
        }
    }
}

const VisibleHome = connect(
  mapStateToProps,
  mapDispatchToProps
)( Home )

const RouterVisibleHome= withRouter( VisibleHome )

export default RouterVisibleHome