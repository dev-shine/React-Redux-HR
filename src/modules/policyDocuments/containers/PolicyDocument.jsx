import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as _ from 'lodash';
import Menu from 'src/components/generic/Menu';
import Header from 'components/generic/Header';
import DocumentsList from 'modules/policyDocuments/components/DocumentsList';
import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_policy from 'appRedux/policyDocuments/actions/index';


class PolicyDocumentContainer extends React.Component {
  constructor(props){
      super(props);
      this.props.onIsAlreadyLogin();
      this.state = {
        docs:[],
      }
  }
  componentWillMount(){
    this.props.onFetchUserPolicyDocument();
  }
  componentWillReceiveProps(props){
    //window.scrollTo(0, 0);
    if (props.logged_user.logged_in == -1) {
      this.props.router.push('/logout');
    }
    this.setState({
      docs:props.policy_documents.policyDocuments,
    });
  }
  render(){
    return(
      <div>
        <Menu {...this.props }/>
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={"Policy Documents"} showLoading={this.props.frontend.show_loading} />
          <DocumentsList policyDocuments={this.state.docs} onUpdateReadStatus={this.props.onUpdateReadStatus} />
        </div>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    frontend : state.frontend.toJS(),
    logged_user : state.logged_user.toJS(),
    policy_documents: state.policyDocuments.toJS(),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
	  onIsAlreadyLogin: () => {
      return dispatch( actions_login.isAlreadyLogin());
    },
    onFetchUserPolicyDocument: ()=>{
      return dispatch(actions_policy.fetchUserPolicyDocument());
    },
    onUpdateReadStatus: (updateDoc)=>{
      return dispatch(actions_policy.updateReadStatus(updateDoc));
    }
  }
}

const VisiblePolicyDocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PolicyDocumentContainer)

const RouterVisiblePolicyDocumentContainer = withRouter(VisiblePolicyDocumentContainer)

export default RouterVisiblePolicyDocumentContainer
