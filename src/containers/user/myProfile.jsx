import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import FormProfileDetails from '../../components/myProfile/FormProfileDetails'

import * as actions_login from '../../actions/login/index'
import * as actions_myProfile from '../../actions/user/myProfile'

class MyProfile extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            user_profile_detail : {},
            user_bank_detail : []
        }
        this.props.onIsAlreadyLogin()
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
    render(){
            
        let mainDivs = <div className="row">
            <div className="col-md-12">
                <FormProfileDetails  user_profile_detail={this.state.user_profile_detail}/>
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
        }
    }
}

const VisibleMyProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)( MyProfile )

const RouterVisibleMyProfile = withRouter( VisibleMyProfile )

export default RouterVisibleMyProfile