import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import {notify} from '../../services/index'

import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import UserLeavesList from '../../components/leaves/UserLeavesList'

import * as actions_login from '../../actions/login/index'
import * as actions_myLeaves from '../../actions/leave/myLeaves'

class MyLeaves extends React.Component {
    constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
    }
    componentWillMount(){
        this.props.onMyLeavesList(  )
    }
    componentWillReceiveProps( props ){
        window.scrollTo(0, 0);
        if( props.logged_user.logged_in == -1 ){
            this.props.router.push('/logout');
        }else{
            
        }
    }
    render(){
            
        let mainDivs = <div className="row">
            <div className="col-md-12">
                <UserLeavesList {...this.props}/>
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
                  <div className="navbar-item pull-left h5" id="pageTitle">My Leaves</div>
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
        holidaysList : state.holidaysList.toJS(),
        userLeaves : state.userLeaves.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIsAlreadyLogin : () => {
            return dispatch( actions_login.isAlreadyLogin(  ))
        },
        onMyLeavesList : () => {
        	return dispatch( actions_myLeaves.getMyLeaves(  ))	
        }
    }
}

const VisibleMyLeaves = connect(
  mapStateToProps,
  mapDispatchToProps
)( MyLeaves )

const RouterVisibleMyLeaves = withRouter( VisibleMyLeaves )

export default RouterVisibleMyLeaves