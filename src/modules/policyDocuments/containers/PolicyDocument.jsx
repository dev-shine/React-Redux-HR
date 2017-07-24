import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import Menu from 'components/generic/Menu';
import Header from 'components/generic/Header';
import {isNotUserValid} from 'src/services/generic';
import DocumentsList from 'modules/policyDocuments/components/DocumentsList';
import * as actions from 'appRedux/actions';

class PolicyDocumentContainer extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
    this.state = {
      docs: []
    };
  }
  componentWillMount () {
    this.props.requestfetchUserPolicyDocument();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status && isNotValid.redirectTo !== '/policy_documents') {
      this.props.router.push(isNotValid.redirectTo);
    }
    this.setState({
      docs: props.policyDocuments
    });
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Policy Documents'} showLoading={this.props.frontend.show_loading} />
          <DocumentsList policyDocuments={this.state.docs} onUpdateReadStatus={this.props.requestUpdateReadStatus} />
        </div>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    frontend:        state.frontend.toJS(),
    loggedUser:      state.logged_user.userLogin,
    policyDocuments: state.policyDocuments.policyDocument
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const VisiblePolicyDocumentContainer = connect(mapStateToProps, mapDispatchToProps)(PolicyDocumentContainer);

const RouterVisiblePolicyDocumentContainer = withRouter(VisiblePolicyDocumentContainer);

export default RouterVisiblePolicyDocumentContainer;
