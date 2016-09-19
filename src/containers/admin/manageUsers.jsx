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

import UsersList from '../../components/attendance/UsersList'

import FormUserProfileDetails from '../../components/manageUsers/FormUserProfileDetails'
import FormUserBankDetails from '../../components/manageUsers/FormUserBankDetails'
import FormAddNewEmployee from '../../components/manageUsers/FormAddNewEmployee'
import UpdateEmployeeDocument from '../../components/manageUsers/UpdateEmployeeDocument'


class ManageUsers extends React.Component {
    constructor( props ){
        super( props );

        this.props.onIsAlreadyLogin()

        this.state = {
            status_message : "",
            "defaultUserDisplay" : "",
            user_profile_detail : {},
            user_bank_detail : [],
            user_documents : {},
            'openIframe': false,
        }

        this.onUserClick = this.onUserClick.bind( this )
        this.callUpdateUserBankDetails = this.callUpdateUserBankDetails.bind( this )
        this.callUpdateUserProfileDetails = this.callUpdateUserProfileDetails.bind( this )
        this.callAddNewEmployee = this.callAddNewEmployee.bind( this )
        this.handleOpenIframe = this.handleOpenIframe.bind( this )
        this.handleCloseIframe = this.handleCloseIframe.bind( this )
        this.changeEmployeeStatus = this.changeEmployeeStatus.bind( this )
    }    
    componentWillMount(){
      this.props.onUsersList()
    }
    componentWillReceiveProps( props ){

      window.scrollTo(0, 0);

      if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == 'Admin' || props.logged_user.role == 'HR' ){
                //this.props.onUsersList( )
            }else{
                this.props.router.push('/home');    
            }
        }
        this.setState({
            user_profile_detail : props.manageUsers.user_profile_detail,
            user_bank_detail : props.manageUsers.user_bank_detail,
            user_documents : props.manageUsers.user_documents,
        })
     
    }
    componentDidUpdate(){


      if( this.state.defaultUserDisplay  == '' ){
          if( this.props.usersList.users.length > 0 ){
              let firstUser = this.props.usersList.users[0]
              let defaultUserId = firstUser.user_Id
              this.onUserClick( defaultUserId )
          }
      }
    }
    onUserClick( userid ){
      let selected_user_name = ""
      let selected_user_image = ""
      let selected_user_jobtitle = ""
      let selected_user_id = ""
      
      if( this.props.usersList.users.length > 0 ){
        let userDetails = _.find( this.props.usersList.users, { 'user_Id' : userid } )
        if( typeof userDetails != 'undefined' ){
          selected_user_name = userDetails.name
          selected_user_image = userDetails.slack_profile.image_192
          selected_user_jobtitle = userDetails.jobtitle
          selected_user_id = userDetails.user_Id
        }
      }
      this.setState({
            "defaultUserDisplay" : userid,
            "selected_user_name" : selected_user_name,
            "selected_user_image" : selected_user_image,
            "selected_user_jobtitle" : selected_user_jobtitle,
            "selected_user_id" : selected_user_id
        })
        this.props.onUserProfileDetails( userid )
        this.props.onGetUserDocument( userid )
    }

    callUpdateUserBankDetails( new_bank_details  ){
      this.props.onUpdateUserBankDetails( new_bank_details ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })
    }
    callUpdateUserProfileDetails( new_profile_details ){
        this.props.onUpdateUserProfileDetails( new_profile_details ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })   
    }
    callAddNewEmployee( new_employee_details ){
      this.props.onAddNewEmployee( new_employee_details ).then( 
        (data) => {
          //on success of adding a new client referch list
          notify( data );
          this.props.onUsersList()
        },(error) => {
          notify( error );
        }
      )
    }
    changeEmployeeStatus( userid, status ){
      this.props.onChangeEmployeeStatus( userid, status ).then(()=>{
        this.props.onUsersList().then(()=>{
          if( this.props.usersList.users.length > 0 ){
              let firstUser = this.props.usersList.users[0]
              let defaultUserId = firstUser.user_Id
              this.onUserClick( defaultUserId )
          }
        })
      })
    }
  handleOpenIframe(){
    this.setState({openIframe: true});
  };

  handleCloseIframe(){
    this.setState({openIframe: false});
  };
  	render(){
		return(
    		<div>

          <AlertNotification alert_message={this.props.manageUsers.status_message}/>

    			<Menu {...this.props }/>
            <div id="content" className="app-content box-shadow-z0" role="main">
    				  
              <div className="app-header white box-shadow">
                <div className="navbar">
    						  <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      						  <i className="material-icons">&#xe5d2;</i>
    						  </a>
    						  <div className="navbar-item pull-left h5" id="pageTitle">Manage Employees Profile</div>
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
                      <div className="col-md-4 p-b">
                        <FormAddNewEmployee 
                          callAddNewEmployee={this.callAddNewEmployee}
                        />
                      </div>
                      <div className="col-md-4 text-center">
                      
          
                      </div>
                      <div className="col-md-4 text-right">
                        <button className="btn btn-fw btn-danger" onTouchTap={()=>this.changeEmployeeStatus( this.state.selected_user_id, 'Disabled' )} >Disable Selected User</button>
                      </div>
                    </div>
                    <div className="row">

                      <div className="col-md-2">
                          <UsersList users = { this.props.usersList.users } selectedUserId={this.state.selected_user_id} onUserClick = { this.onUserClick } {...this.props } />
                      </div>

                      <div className="col-md-10 p">
                          <div className="row box">
                            <div className="col-md-7 p-t p-b p-r b-r">
                              <FormUserProfileDetails  user_profile_detail={this.state.user_profile_detail} callUpdateUserProfileDetails={this.callUpdateUserProfileDetails}/>
                            </div>
                            <div className="col-md-5 p-t p-b">
                              <div className="col-md-12">
                                <FormUserBankDetails  user_bank_detail={this.state.user_bank_detail} callUpdateUserBankDetails={this.callUpdateUserBankDetails}/>
                              </div>
                              <div className="col-md-12">
                                <UpdateEmployeeDocument user_documents={this.state.user_documents} user_id={this.state.selected_user_id} onUpdatedocuments={this.props.onUpdatedocuments} {...this.props}/>
                              </div>
                            </div>
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

function mapStateToProps( state ){
    return {
        frontend : state.frontend.toJS(),
        logged_user : state.logged_user.toJS(),
        usersList : state.usersList.toJS(),
        manageUsers : state.manageUsers.toJS()
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
        onUserProfileDetails : ( userid ) => {
          return dispatch( actions_manageUsers.getUserProfileDetails( userid )) 
        },
        onUpdateUserBankDetails : ( new_bank_details ) => {
            return dispatch( actions_manageUsers.updateUserBankDetails( new_bank_details )) 
        },
        onUpdateUserProfileDetails : ( new_profile_details ) => {
            return dispatch( actions_manageUsers.updateUserProfileDetails( new_profile_details ))   
        },
        onAddNewEmployee : ( new_employee_details ) => {
            return dispatch( actions_manageUsers.addNewEmployee( new_employee_details ))   
        },
        onUpdatedocuments : ( document_link ) => {
            return dispatch( actions_manageUsers.updateDocument( document_link ))
        },
        onChangeEmployeeStatus : ( userid, status ) => {
          return dispatch( actions_manageUsers.changeEmployeeStatus( userid, status ) )
        },
        onGetUserDocument : ( userid ) => {
          return dispatch ( actions_manageUsers.getUserDocument( userid ) )
        }

    }
}

const VisibleManageUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)( ManageUsers )

const RouterVisibleManageUsers = withRouter( VisibleManageUsers )

export default RouterVisibleManageUsers