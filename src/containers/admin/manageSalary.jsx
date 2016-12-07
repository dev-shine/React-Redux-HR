import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import ReactDOM from 'react-dom'

import * as _ from 'lodash'
import {notify} from '../../services/index'
import { CONFIG } from '../../config/index'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'

//-----------------------------------------
import * as actions_login from '../../actions/login/index'
import * as actions_usersList from '../../actions/user/usersList'
import * as actions_manageSalary from '../../actions/admin/manageSalary'

import UsersList from '../../components/attendance/UsersList'
import UserSalaryHistory from '../../components/manageSalary/UserSalaryHistory'
import FormAddSalary from '../../components/manageSalary/FormAddSalary'
import UserHoldingHistory from '../../components/manageSalary/UserHoldingHistory'
import FormAddHolding from '../../components/manageSalary/FormAddHolding'


class ManageSalary extends React.Component {
    constructor( props ){
        super( props );

        this.props.onIsAlreadyLogin()

        this.state = {
            "selected_user_name" : "",
            "selected_user_image" : "",
            "selected_user_jobtitle" : "",
            "selected_user_id" : "",
            "defaultUserDisplay" : "",
            "salary_history" : [],
            "holding_history" : [],
            "user_latest_salary_details": {},
            "user_latest_holding_details": {},
        }

        this.onUserClick = this.onUserClick.bind( this )
        this.callAddUserSalary = this.callAddUserSalary.bind( this )
        this.callAddUserHolding = this.callAddUserHolding.bind( this )
        this.viewSalarySummary = this.viewSalarySummary.bind( this )
        this.callDeleteUserSalary = this.callDeleteUserSalary.bind( this )
    }
    componentWillMount(){
      this.props.onUsersList()
    }
    componentWillReceiveProps( props ){

      //window.scrollTo(0, 0);

      if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            if( props.logged_user.role == CONFIG.ADMIN){
                //this.props.onUsersList( )
            }else{
                this.props.router.push('/home');
            }
        }

      //////////////////
      let s_salary_history = []
      let s_user_latest_salary_details = {}
      let s_holding_history = []
      let s_user_latest_holding_details = {}

      if( typeof props.manageSalary.salary_structure.salary_details != 'undefined' && props.manageSalary.salary_structure.salary_details.length >  0 ){
        s_salary_history = props.manageSalary.salary_structure.salary_details.reverse()
        s_user_latest_salary_details = s_salary_history[0]
      }
      if( typeof props.manageSalary.salary_structure.holding_details != 'undefined' && props.manageSalary.salary_structure.holding_details.length > 0 ){
        s_holding_history = props.manageSalary.salary_structure.holding_details.reverse()
        s_user_latest_holding_details = s_holding_history[0]
        this.setState({

        })
      }


      this.setState({
        salary_history : s_salary_history,
        user_latest_salary_details : s_user_latest_salary_details,
        holding_history : s_holding_history,
        user_latest_holding_details : s_user_latest_holding_details
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
        this.props.onUserSalaryDetails( userid )
    }


    callAddUserSalary( new_salary_details  ){
      this.props.onAddNewSalary( new_salary_details ).then(
        (data) => {

        },(error) => {
            notify( error );
        })
    }
    callAddUserHolding( new_holding_details ){
      this.props.onAddNewHolding( new_holding_details ).then(
        (data) => {

        },(error) => {
            notify( error );
        })
    }
    viewSalarySummary( id ){
      let new_details = this.state.salary_details
      _.forEach( this.state.salary_history, ( d, k )=> {
        if( d.test.id == id ){
          new_details = d
        }
      })
      this.setState({
        'user_latest_salary_details' : new_details
      })
    }
    callDeleteUserSalary( user_id, salary_id ){
      this.props.onDeleteUserSalary( user_id, salary_id ).then(
        (data) => {
          this.onUserClick( user_id )
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

            <div className="col-md-2">
                <UsersList users = { this.props.usersList.users } selectedUserId={this.state.selected_user_id} onUserClick = { this.onUserClick } {...this.props } />
            </div>



            <div className="col-md-10">




            <div className="box">
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


					      <UserSalaryHistory
                  data={this.state.salary_history}
                  viewSalarySummary={this.viewSalarySummary}
                  callDeleteUserSalary={this.callDeleteUserSalary}
                />



					    </div>
					  </div>
					  <div className="col-xs-6 b-r box">
					    <div className="p-a block" >
					      <h6 className="text-center">Add New</h6>
					      <hr/>
					      <FormAddSalary {...this.props} userid={this.state.selected_user_id} callAddUserSalary={this.callAddUserSalary} user_latest_salary_details={this.state.user_latest_salary_details}/>
					    </div>
					  </div>


            <div className="col-xs-3 b-r box">
              <div className="p-a block " >
                <h6 className="text-center">Holding Revision</h6>
                <hr/>
                <UserHoldingHistory data={this.state.holding_history}/>

                <h6 className="text-center">Add Holding</h6>
                <hr/>

                <FormAddHolding {...this.props} userid={this.state.selected_user_id} callAddUserHolding={this.callAddUserHolding} user_latest_salary_details={this.state.user_latest_salary_details}/>


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
                <div className="row no-gutter">
                  <div className="col-12">
                    <LoadingIcon {...this.props}/>
                  </div>
                </div>
    				  </div>

					    <div className="app-body" id="view">
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
        },
        onAddNewHolding : ( new_holding_data ) => {
          return dispatch( actions_manageSalary.add_user_new_holding( new_holding_data  ))
        },
        onDeleteUserSalary : ( user_id, salary_id ) => {
          return dispatch( actions_manageSalary.delete_user_salary( user_id, salary_id  ))
        }
    }
}

const VisibleManageSalary = connect(
  mapStateToProps,
  mapDispatchToProps
)( ManageSalary )

const RouterVisibleManageSalary= withRouter( VisibleManageSalary )

export default RouterVisibleManageSalary
