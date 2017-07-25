import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Menu from 'components/generic/Menu';
import {bindActionCreators} from 'redux';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import Message from 'components/generic/Message';
import FormUploadPolicyDocument from 'modules/policyDocuments/components/formUploadPolicyDocument';
import ListAllPolicyDocument from 'components/policyDocuments/ListAllPolicyDocument';
import * as actions from 'appRedux/actions';

class UploadPolicyDocumentContainer extends React.Component {
  constructor (props) {
    super(props);
    this.props.isAlreadyLogin();
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
    this.props.requestUserPolicyDocument();
  }
  componentWillReceiveProps (props) {
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
    this.setState({
      docs: props.policyDocuments.data
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
    this.props.requestSubmitDocs(newList);
  }
  submitDocs (docs) {
    this.props.requestSubmitDocs(docs);
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
                <Message className={this.state.errClass} style={{'width': '100%'}} message={this.state.errMsg} onClick={this.hideError} />
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
    frontend:        state.frontend.toJS(),
    loggedUser:      state.logged_user.userLogin,
    policyDocuments: state.policyDocuments.policyDocument
  };
}
const mapDispatchToProps = (dispatch) => { return bindActionCreators(actions, dispatch); };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadPolicyDocumentContainer));
