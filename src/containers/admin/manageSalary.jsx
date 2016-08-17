import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'

//-----------------------------------------
import * as actions_login from '../../actions/login/index'
import * as actions_usersList from '../../actions/user/usersList'
import * as actions_manageSalary from '../../actions/admin/manageSalary'

import UsersList from '../../components/attendance/UsersList'
import UserSalaryHistory from '../../components/manageSalary/UserSalaryHistory'
import FormAddSalary from '../../components/manageSalary/FormAddSalary'


class ManageSalary extends React.Component {
    constructor( props ){
        super( props );

        this.props.onIsAlreadyLogin()

        this.state = {
            "selected_user_name" : "",
            "selected_user_image" : "",
            "selected_user_jobtitle" : "",
            "selected_user_id" : "",

            "defaultUserDisplay" : ""
        }

        this.onUserClick = this.onUserClick.bind( this )
        this.callAddUserSalary = this.callAddUserSalary.bind( this )
    }
    componentWillMount(){
        this.props.onUsersList()
    }
    componentWillReceiveProps( props ){
      if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == 'Admin' || props.logged_user.role == 'Guest' ){
                //this.props.onUsersList( )
            }else{
                this.props.router.push('/monthly_attendance');    
            }
        }
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
        this.props.onUserSalaryDetails( userid )
    }
    

    callAddUserSalary( new_salary_details  ){
      this.props.onAddNewSalary( new_salary_details ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })
    }

  	render(){

      
      let status_message = ""
      if( this.props.manageSalary.status_message != '' ){
        status_message = <span className="label label-lg primary pos-rlt m-r-xs">
          <b className="arrow left b-primary"></b>{this.props.manageSalary.status_message}</span>
      }

      let selectedUserId = ""
  		      
        let mainDivs = <div className="row">

            <div className="col-md-3">
                <UsersList users = { this.props.usersList.users } onUserClick = { this.onUserClick } {...this.props } />
            </div>



            <div className="col-md-9">




                  <div className="box">
              <div className="item">
                <div className="item-bg">
                  <img src={this.state.selected_user_image} className="blur"/>
                </div>
                <div className="p-a-lg pos-rlt text-center">
                  <img src={this.state.selected_user_image} className="img-circle w-56" />
                </div>
            </div>
              <div className="p-a text-center">
                <a href="" className="text-md m-t block">{this.state.selected_user_name}</a>
                <p><small>{this.state.selected_user_jobtitle}</small></p>
              </div>
          </div>



          			<div className="row no-gutter b-t box">
					  <div className="col-xs-3 b-r box">
					    <div className="p-a block " >
					      <h6 className="text-center">Salary Revision</h6>
					      <hr/>


					      <UserSalaryHistory data={this.props.manageSalary.salary_history}/>



					    </div>
					  </div>
					  <div className="col-xs-9 b-r box">
					    <div className="p-a block" >
					      <h6 className="text-center">Add New</h6>
					      <hr/>
					      <FormAddSalary {...this.props} userid={this.state.selected_user_id} callAddUserSalary={this.callAddUserSalary}/>
					    </div>
					  </div>
					  
					 </div>



            </div>
            
          </div>
       

		return(
    		<div>
    			<Menu {...this.props }/>

                <div id="content" className="app-content box-shadow-z0" role="main">
    				<div className="app-header white box-shadow">
						<div className="navbar">
    						<a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      							<i className="material-icons">&#xe5d2;</i>
    						</a>
    						<div className="navbar-item pull-left h5" id="pageTitle">Manage Salaries &nbsp;&nbsp;&nbsp; {status_message}</div>
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
        manageSalary : state.manageSalary.toJS()
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
        onUserSalaryDetails : ( userid ) => {
        	return dispatch( actions_manageSalary.get_user_salary_details( userid  ))
        },
        onAddNewSalary : ( new_salary_data ) => {
          return dispatch( actions_manageSalary.add_user_new_salary( new_salary_data  ))
        }
    }
}

const VisibleManageSalary = connect(
  mapStateToProps,
  mapDispatchToProps
)( ManageSalary )

const RouterVisibleManageSalary= withRouter( VisibleManageSalary )

export default RouterVisibleManageSalary