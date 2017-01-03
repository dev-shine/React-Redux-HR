import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import * as actions_login from '../../actions/login/index'
import * as actions_salary from '../../actions/salary/index'
import * as actions_variable from '../../actions/variable'
import Variables from '../../components/attendance/Variable'
import { CONFIG } from '../../config/index'


class PolicyDocumentContainer extends React.Component {
     constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin()
        this.state = {
        }
    }
    componentWillMount(){
      this.props.onIsUserAcceptedDocumentPolicy()
    }
    componentWillReceiveProps( props ){

      //window.scrollTo(0, 0);
      if (props.logged_user.logged_in == -1) {
        this.props.router.push('/logout');
      } else {}
    }
    componentDidUpdate(){
    }
    render(){
      console.log('-------------------');
    	return(
    		<div>
            <Menu {...this.props }/>
    		<div id="content" className="app-content box-shadow-z0" role="main">
    		  <div className="app-header white box-shadow">
                <div className="navbar">
    			    <a data-toggle="modal" data-target="#aside" className="navbar-item pull-left hidden-lg-up">
      				   <i className="material-icons">&#xe5d2;</i>
    				</a>
    			    <div className="navbar-item pull-left h5" id="pageTitle">
    			       Policy Documents
    			    </div>
			    </div>
				</div>
				gfhfghfg
    		</div>
    		</div>
    		)
    }
}
function mapStateToProps( state ){
    return {
    	frontend : state.frontend.toJS(),
      logged_user : state.logged_user.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    	  onIsAlreadyLogin: () => {
            return dispatch( actions_login.isAlreadyLogin())
        },
        onIsUserAcceptedDocumentPolicy: () => {
          return dispatch(actions_login.isUserAcceptedDocumentPolicy())
        }
    }
}

const VisiblePolicyDocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( PolicyDocumentContainer )

const RouterVisiblePolicyDocumentContainer = withRouter( VisiblePolicyDocumentContainer )

export default RouterVisiblePolicyDocumentContainer
