import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import LeavesList from '../../components/leaves/LeavesList'

import * as actions_login from '../../actions/login/index'

import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as actions_userDaySummary from '../../actions/user/userDaySummary'

import * as actions_listLeaves from '../../actions/leave/listLeaves'

class ManageLeaves extends React.Component {
    constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        
    }
    componentWillMount(){
        this.props.onListLeaves( )
    }
    componentWillReceiveProps( props ){
        if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == 'Admin' || props.logged_user.role == 'Guest' ){
                
            }else{
                this.props.router.push('/monthly_attendance');    
            }
        }
    }
  	render(){
		return(
    		<div>
    			<Menu {...this.props }/>

                <div id="content" className="app-content box-shadow-z0" role="main">
    				<div className="app-header white box-shadow">
						<div className="navbar">
    						<a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      							<i className="material-icons">&#xe5d2;</i>
    						</a>
    						<div className="navbar-item pull-left h5" id="pageTitle">Manage Leaves</div>
						</div>
    				</div>
					<div className="app-footer">
  						<div></div>
					</div>
    				<div className="app-body" id="view">

            			<div className="row">
            				<div className="col-12">
            					<LoadingIcon {...this.props}/>
            				</div>
            			</div>
						<div className="padding">
							
                            <div className="row">
                                <div className="col-md-12">
                                    <LeavesList {...this.props} />
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
        listLeaves : state.listLeaves.toJS()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onListLeaves : ( ) => {
            return dispatch( actions_listLeaves.getAllLeaves( ))
        }
    }
}

const VisibleManageLeaves = connect(
  mapStateToProps,
  mapDispatchToProps
)( ManageLeaves )

const RouterVisibleManageLeaves= withRouter( VisibleManageLeaves )

export default RouterVisibleManageLeaves