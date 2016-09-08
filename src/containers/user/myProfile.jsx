import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'



import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import AlertNotification from '../../components/generic/AlertNotification'
import UserHorizontalView from '../../components/generic/UserHorizontalView'
import FormProfileDetails from '../../components/myProfile/FormProfileDetails'
import FormBankDetails from '../../components/myProfile/FormBankDetails'
import FormUpdatePassword from '../../components/myProfile/FormUpdatePassword'

import * as actions_login from '../../actions/login/index'
import * as actions_myProfile from '../../actions/user/myProfile'

class MyProfile extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            status_message : "",
            user_profile_detail : {},
            user_bank_detail : []
        }
        this.props.onIsAlreadyLogin()
        this.callUpdateBankDetails = this.callUpdateBankDetails.bind( this )
        this.callUpdateProfileDetails = this.callUpdateProfileDetails.bind( this )
        this.callUpdatePassword = this.callUpdatePassword.bind( this )
    }
    componentWillMount(){
        this.props.onMyProfileDetails(  )
    }
    componentWillReceiveProps( props ){
        window.scrollTo(0, 0);
        if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            
        }
        
        this.setState({
            user_profile_detail : props.myProfile.user_profile_detail,
            user_bank_detail : props.myProfile.user_bank_detail,
        })
    }
    callUpdateBankDetails( new_bank_details  ){
      this.props.onUpdateBankDetails( new_bank_details ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })
    }
    callUpdateProfileDetails( new_profile_details ){
        this.props.onUpdateProfileDetails( new_profile_details ).then( 
        (data) => {
            
        },(error) => {
            notify( error );
        })   
    }
    callUpdatePassword( new_password ){
        new_password = new_password.trim()
        if( new_password == '' ){
            notify( "Enter Password !!" );
        }else{
            this.props.onUpdatePassword( new_password ).then( 
            (data) => {
                notify( data );    
            },(error) => {
                notify( error );
            }) 
        }
    }
    render(){

        return(
    		<div>

                <AlertNotification alert_message={this.props.myProfile.status_message}/>
                
    			<Menu {...this.props }/>

                <div id="content" className="app-content box-shadow-z0" role="main">

                    <div className="app-header white box-shadow">
                <div className="navbar">
                  <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
                    <i className="material-icons">&#xe5d2;</i>
                  </a>
                  <div className="navbar-item pull-left h5" id="pageTitle">My Profile</div>
                </div>
                <div className="row no-gutter">
                  <div className="col-12">
                    <LoadingIcon {...this.props}/>
                  </div>
                </div>
              </div>


					<div className="app-body" id="view">

            			<div className="padding">


                                <div className="row no-gutter">
                                    <UserHorizontalView 
                                        profileImage={this.props.logged_user.profileImage}
                                        name = { this.state.user_profile_detail.name }
                                        jobtitle = { this.state.user_profile_detail.jobtitle }
                                        dateofjoining = { this.state.user_profile_detail.dateofjoining }
                                        gender = { this.state.user_profile_detail.gender }
                                        dob = { this.state.user_profile_detail.dob }
                                        work_email = { this.state.user_profile_detail.work_email }
                                    />
                                </div>
                                <div className="row no-gutter">
                                    <div className="col-xs-6 p-t p-r b-r">
                                        <FormProfileDetails  user_profile_detail={this.state.user_profile_detail} callUpdateProfileDetails={this.callUpdateProfileDetails}/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <FormUpdatePassword  
                                            callUpdatePassword={this.callUpdatePassword} 
                                        />
                                    </div>
                                    <div className="col-xs-6 p-t p-l">
                                        <FormBankDetails  user_bank_detail={this.state.user_bank_detail} callUpdateBankDetails={this.callUpdateBankDetails}/>
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
        myProfile : state.myProfile.toJS()
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onMyProfileDetails : () => {
        	return dispatch( actions_myProfile.getMyProfileDetails(  ))	
        },
        onUpdateBankDetails : ( new_bank_details ) => {
            return dispatch( actions_myProfile.updateBankDetails( new_bank_details )) 
        },
        onUpdateProfileDetails : ( new_profile_details ) => {
            return dispatch( actions_myProfile.updateProfileDetails( new_profile_details ))   
        },
        onUpdatePassword : ( new_password ) =>{
            return dispatch( actions_myProfile.updatePassword( new_password ))     
        }
    }
}

const VisibleMyProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)( MyProfile )

const RouterVisibleMyProfile = withRouter( VisibleMyProfile )

export default RouterVisibleMyProfile