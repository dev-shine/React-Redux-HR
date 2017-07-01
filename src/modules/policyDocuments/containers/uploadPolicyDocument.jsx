import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import Message from 'components/generic/Message';
import FormUploadPolicyDocument from 'modules/policyDocuments/components/formUploadPolicyDocument';
import ListAllPolicyDocument from 'components/policyDocuments/ListAllPolicyDocument';
import * as actions_login from 'appRedux/auth/actions/index';
import * as actions_policy from 'appRedux/policyDocuments/actions/index';

const styles = {
  errorAlert: {
    'width': '100%'
  }
};

class UploadPolicyDocumentContainer extends React.Component {
  constructor (props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      docs:     [],
      errClass: 'hidden',
      errMsg:   ''
    };
    this.submitDocs = this.submitDocs.bind(this);
    this.hideError = this.hideError.bind(this);
    this.submitNewListofDocs = this.submitNewListofDocs.bind(this);
  }
  componentWillMount () {
    this.props.onFetchPolicyDocument();
  }

  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.logged_user.logged_in, props.policy_documents.policyDocuments);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    this.setState({
      docs: props.policy_documents.policyDocuments
    });
  }
  hideError (e) {
    e.preventDefault();
    this.setState({
      errClass: 'hidden',
      errMsg:   ''
    });
  }
  submitNewListofDocs (newList) {
    this.props.onSubmitDocs(newList).then(() => {
      this.setState({
        errClass: 'alert-success pull-left',
        errMsg:   'Documents deleted successfully'
      });
    })
    .catch(() => {
      this.setState({
        errClass: 'alert-danger pull-left',
        errMsg:   'Documents not deleted'
      });
    });
  }
  submitDocs (docs) {
    this.props.onSubmitDocs(docs).then(() => {
      this.setState({
        errClass: 'alert-success pull-left',
        errMsg:   'Documents submitted successfully'
      });
    }).catch(() => {
      this.setState({
        errClass: 'alert-danger pull-left',
        errMsg:   'Documents submition faild'
      });
    });
  }
  render () {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Upload Policy Documents'} showLoading={this.props.frontend.show_loading} />
          <div className="app-body" style={{'marginTop': 10}}>
            <div className="row" style={{margin: '10px 4px 0px'}}>
              <div className='col-xs-12' style={{padding: '10px 24px 0px', textAlign: 'center'}}>
                <Message className={this.state.errClass} style={styles.errorAlert} message={this.state.errMsg} onClick={this.hideError} />
              </div>
              <div className="col-xs-6">
                <FormUploadPolicyDocument submitDocs={this.submitDocs} docs={this.state.docs} {...this.props} />
              </div>
              <div className="col-xs-6">
                <ListAllPolicyDocument policyDocuments={this.state.docs} submitNewListofDocs={this.submitNewListofDocs} />
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
    policy_documents: state.policyDocuments.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions_login.isAlreadyLogin());
    },
    onSubmitDocs: (docs) => {
      return dispatch(actions_policy.submitDocs(docs));
    },
    onFetchPolicyDocument: () => {
      return dispatch(actions_policy.fetchPolicyDocument());
    }
  };
};

const VisibleUploadPolicyDocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadPolicyDocumentContainer);

const RouterVisibleUploadPolicyDocumentContainer = withRouter(VisibleUploadPolicyDocumentContainer);

export default RouterVisibleUploadPolicyDocumentContainer;
