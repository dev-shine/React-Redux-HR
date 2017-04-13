import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import Header from '../../components/generic/header'

import { CONFIG } from '../../config/index'
import ListLeaves from '../../components/manageLeaves/ListLeaves'
import ViewLeave from '../../components/manageLeaves/ViewLeave'
import LeaveColorReference from '../../components/manageLeaves/LeaveColorReference'

import * as actions_login from '../../actions/login/index'

import * as actions_monthlyAttendance from '../../actions/user/monthlyAttendance'
import * as actions_userDaySummary from '../../actions/user/userDaySummary'
import * as actions_policy from '../../actions/policyDocuments/index'
import * as actions_listLeaves from '../../actions/leave/listLeaves'
import * as actions_manageLeave from '../../actions/leave/manageLeave'


class ManageLeaves extends React.Component {
    constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        this.doLeaveStatusChange = this.doLeaveStatusChange.bind(this)

    }
    componentDidMount(){
      this.props.onFetchUserPolicyDocument();
      this.props.onListLeaves();
    }
    componentWillMount(){
        //this.props.onListLeaves( )
    }
    componentWillReceiveProps( props ){
      //  window.scrollTo(0, 0);
        if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
          if( props.logged_user.role == CONFIG.ADMIN ||  props.logged_user.role == CONFIG.GUEST ){

          } else if (props.logged_user.role == CONFIG.HR){
            let unread = _.filter(props.policy_documents.policyDocuments, function(o) { return o.read == 0; }) || [];
            if(unread.length > 0){
              this.props.router.push('/policy_documents');
            }
          }else{
                this.props.router.push('/monthly_attendance');
            }
        }
    }
    doLeaveStatusChange( id, newstatus, messagetouser ){
      this.props.onChangeLeaveStatus( id, newstatus, messagetouser ).then(
        (data) => {

        },(error) => {
            //notify( error );
        })

    }
  	render(){

        let status_message = ""
      if( this.props.manageLeave.status_message != '' ){
        status_message = <span className="label label-lg primary pos-rlt m-r-xs">
          <b className="arrow left b-primary"></b>{this.props.manageLeave.status_message}</span>
      }

		return(
    		<div>
    			<Menu {...this.props }/>
            <div id="content" className="app-content box-shadow-z0" role="main">
            <Header pageTitle={"Manage Leaves"+status_message} {...this.props} />
    				<div className="app-body" id="view">
  						<div className="padding">
                <div className="row">
                  <div className="col-12">
                    <LeaveColorReference {...this.props}/>
                  </div>
                </div>
                <div className="row-col row-col-xs b-b">
                  <div className="col-sm-3 light bg b-r">
                    <ListLeaves {...this.props}/>
                  </div>
                  <div className="col-sm-9 light bg b-r">
                    <ViewLeave {...this.props} doLeaveStatusChange={this.doLeaveStatusChange} />
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
        listLeaves : state.listLeaves.toJS(),
        manageLeave : state.manageLeave.toJS(),
        policy_documents: state.policyDocuments.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onListLeaves : ( ) => {
            return dispatch( actions_listLeaves.getAllLeaves( ))
        },
        onApplyFilter : ( filter ) => {
            return dispatch( actions_listLeaves.onApplyFilter( filter ))
        },
        onSelectLeave : ( leaveid ) => {
            return dispatch( actions_listLeaves.onSelectLeave( leaveid ))
        },
        onAddExtraDay : ( leaveid,token,data ) => {
            return dispatch( actions_manageLeave.onAddExtraDay( leaveid ,token , data ))
        },
        onChangeLeaveStatus : ( leaveid, newstatus , messagetouser ) => {
            return dispatch( actions_manageLeave.changeLeaveStatus( leaveid, newstatus, messagetouser ) )
        },
        onDocRequired : ( leaveid,data,comment ) => {
            return dispatch( actions_manageLeave.docRequired(leaveid,data,comment ) )
        },
        onFetchUserPolicyDocument: ()=>{
          return dispatch(actions_policy.fetchUserPolicyDocument());
        },
    }
}

const VisibleManageLeaves = connect(
  mapStateToProps,
  mapDispatchToProps
)( ManageLeaves )

const RouterVisibleManageLeaves= withRouter( VisibleManageLeaves )

export default RouterVisibleManageLeaves
