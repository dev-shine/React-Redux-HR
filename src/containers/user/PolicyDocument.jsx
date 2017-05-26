import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import Header from '../../components/generic/header'

import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_policy from 'appRedux/policyDocuments/actions/index';
import * as actions_myProfile from '../../actions/user/myProfile'
import DocumentsList from '../../components/policyDocuments/documentsList'
import { CONFIG } from '../../config/index'


class PolicyDocumentContainer extends React.Component {
     constructor( props ){
        super( props );
        this.props.onIsAlreadyLogin();
        this.state = {
          docs:[],
        }
    }
    componentWillMount(){
      this.props.onFetchUserPolicyDocument();
    }
    componentWillReceiveProps( props ){
      //window.scrollTo(0, 0);
      if (props.logged_user.logged_in == -1) {
        this.props.router.push('/logout');
      } else {

      }
      this.setState({
        docs:props.policy_documents.policyDocuments,
      });
    }
    componentDidUpdate(){
    }
    render(){

    	return(
    		<div>
          <Menu {...this.props }/>
      		<div id="content" className="app-content box-shadow-z0" role="main">
            <Header pageTitle={"Policy Documents"} {...this.props} />
    				<DocumentsList policyDocuments={this.state.docs} {...this.props} />
      		</div>
    		</div>
    	)
    }
}
function mapStateToProps( state ){
    return {
    	frontend : state.frontend.toJS(),
      logged_user : state.logged_user.toJS(),
      policy_documents: state.policyDocuments.toJS(),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    	  onIsAlreadyLogin: () => {
            return dispatch( actions_login.isAlreadyLogin())
        },
        onFetchUserPolicyDocument: ()=>{
          return dispatch(actions_policy.fetchUserPolicyDocument());
        },
        onUpdateReadStatus: (updateDoc)=>{
          return dispatch(actions_policy.updateReadStatus(updateDoc))
        }
    }
}

const VisiblePolicyDocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( PolicyDocumentContainer )

const RouterVisiblePolicyDocumentContainer = withRouter( VisiblePolicyDocumentContainer )

export default RouterVisiblePolicyDocumentContainer
