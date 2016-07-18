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


import VisibleUsersList from '../../containers/generic/usersList'
import VisibleUserMonthlyAttendance from '../../containers/generic/userMonthlyAttendance'

class Home extends React.Component {
    constructor( props ){
        super( props );
        console.log( 'A1 :: '+ this.props.params.userid )
        {this.props.children}
    }
    componentWillMount(){
    	console.log( 'A :: '+ this.props.params.userid )
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
    	console.log( 'B :: '+ this.props.params.userid )
    	//this.props.onMonthAttendance( userid, year, month )
    }
  	render(){
		console.log( 'C :: '+ this.props.params.userid )

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
							<div className="row">
	            				<div className="col-md-2">
	            					<VisibleUsersList users = { this.props.usersList.users }/>
	            				</div>
	            				<div className="col-md-10">
	            					<VisibleUserMonthlyAttendance/>
	            				</div>
	            			</div>
							
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
        usersList : state.usersList.toJS()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onUsersList : () => {
        	return dispatch( actions_usersList.get_users_list(  ))	
        }
    }
}

const VisibleHome = connect(
  mapStateToProps,
  mapDispatchToProps
)( Home )

const RouterVisibleHome= withRouter( VisibleHome )

export default RouterVisibleHome