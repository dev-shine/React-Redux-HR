import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import _ from 'lodash';
import {isNotUserValid} from 'src/services/generic';
import Menu from 'src/components/generic/Menu';
import Header from 'components/generic/Header';
import FormMyDocuments from 'modules/myDocuments/components/FormMyDocuments';
import * as actionsLogin from 'appRedux/auth/actions/index';
import * as actionsPolicy from 'appRedux/policyDocuments/actions/index';
import * as actionsMyDocument from 'appRedux/myDocuments/actions/myDocument';

class MyDoduments extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      my_document: [],
      message:     ''
    };
  }
  componentWillMount () {
    this.props.onFetchUserPolicyDocument();
    this.props.onGetMydocuments();
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    let isNotValid = isNotUserValid(this.props.route.path, props.logged_user.logged_in, props.policy_documents.policyDocuments);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    this.setState({
      my_document: props.myDocuments.my_document,
      message:     props.myDocuments.status_message
    });
  }

  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'My Document'} {...this.props} />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row no-gutter">
                <div className="col-xs-12 p-t p-l">
                  <FormMyDocuments my_documents={this.state.my_document} user_id={this.props.logged_user.userid} callUpdateDocuments={this.props.onUpdatedocuments} {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    frontend:         state.frontend.toJS(),
    logged_user:      state.logged_user.toJS(),
    myProfile:        state.myProfile.toJS(),
    myDocuments:      state.myDocument.toJS(),
    policy_documents: state.policyDocuments.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actionsLogin.isAlreadyLogin());
    },
    onGetMydocuments: () => {
      return dispatch(actionsMyDocument.getMyDocument());
    },
    onDeleteDocument: (docId) => {
      return dispatch(actionsMyDocument.deleteDocument(docId));
    },
    onFetchUserPolicyDocument: () => {
      return dispatch(actionsPolicy.fetchUserPolicyDocument());
    }
  };
};

const VisibleMyDoduments = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDoduments);

const RouterVisibleMyDoduments = withRouter(VisibleMyDoduments);

export default RouterVisibleMyDoduments;
