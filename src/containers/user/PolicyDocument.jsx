import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'

import * as _ from 'lodash'
import Menu from '../../components/generic/Menu'
import LoadingIcon from '../../components/generic/LoadingIcon'
import * as actions_login from '../../actions/login/index'
import * as actions_policy from '../../actions/policyDocuments/index'
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
      console.log('this.props.policy_documents',props.policy_documents);
      if (props.logged_user.logged_in == -1) {
        this.props.router.push('/logout');
      } else {
        let unread = _.find(props.policy_documents.policyDocuments, function(o) { return o.read == 0; });
        console.log('unread',unread);
        //_.map(props.policy_documents.policyDocuments,(doc)=>{
          if(unread.length > 0){
            //this.props.router.push('/policy_documents');
          }
        //});
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
        onUpdateReadStatus: (doc_id)=>{
          return dispatch(actions_policy.updateReadStatus())
        }
    }
}

const VisiblePolicyDocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)( PolicyDocumentContainer )

const RouterVisiblePolicyDocumentContainer = withRouter( VisiblePolicyDocumentContainer )

export default RouterVisiblePolicyDocumentContainer
