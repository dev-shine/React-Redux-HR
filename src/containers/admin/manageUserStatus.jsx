import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import ReactDOM from 'react-dom'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

import { CONFIG } from '../../config/index'
import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import AlertNotification from '../../components/generic/AlertNotification'

//-----------------------------------------
import * as actions_login from '../../actions/login/index'
import * as actions_usersList from '../../actions/user/usersList'
import * as actions_manageUsers from '../../actions/admin/manageUsers'


import UsersList from '../../components/manageUserStatus/usersList'



class ManageUserStatus extends React.Component {
    constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        this.state = {
        }
        this.changeEmployeeStatus = this.changeEmployeeStatus.bind( this )
    }
    componentWillMount(){
      this.props.onDisabledUsersList()
    }
    componentWillReceiveProps( props ){

      //window.scrollTo(0, 0);

      if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == 'Admin' || props.logged_user.role == 'HR'){
                //this.props.onUsersList( )
            }else{
                this.props.router.push('/home');
            }
        }
    }
    componentDidUpdate(){
    }

  changeEmployeeStatus( userid, status ){
      this.props.onChangeEmployeeStatus( userid, status ).then(()=>{
        this.props.onDisabledUsersList()
      })
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
    						  <div className="navbar-item pull-left h5" id="pageTitle">Manage Employees Status</div>
						    </div>
                <div className="row no-gutter">
                  <div className="col-12">
                    <LoadingIcon {...this.props}/>
                  </div>
                </div>
    				  </div>

					    <div className="app-body" id="view">
						    <div className="padding">
                    <div className="row">

                      <div className="col-md-12 p-t">
                        <UsersList disabled_users = { this.props.usersList.disabled_users } changeEmployeeStatus={this.changeEmployeeStatus} {...this.props } />
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
        onDisabledUsersList : () => {
        	return dispatch( actions_usersList.getDisabledUsersList())
        },
        onChangeEmployeeStatus : ( userid, status ) => {
          return dispatch( actions_manageUsers.changeEmployeeStatus( userid, status ) )
        },
    }
}

const VisibleManageUserStatus = connect(
  mapStateToProps,
  mapDispatchToProps
)( ManageUserStatus )

const RouterVisibleManageUserStatus = withRouter( VisibleManageUserStatus )

export default RouterVisibleManageUserStatus
