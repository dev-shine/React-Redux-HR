import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import Header from 'components/generic/Header';
import FormMyDocuments from 'modules/myDocuments/components/FormMyDocuments';
import * as actions from 'appRedux/actions';
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
    this.props.onGetMydocuments();
  }
  componentWillReceiveProps (props) {
    window.scrollTo(0, 0);
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
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
                  <FormMyDocuments my_documents={this.state.my_document} user_id={this.props.loggedUser.data.id} callUpdateDocuments={this.props.onUpdatedocuments} {...this.props} />
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
    frontend:    state.frontend.toJS(),
    loggedUser:  state.logged_user.userLogin,
    myProfile:   state.myProfile.toJS(),
    myDocuments: state.myDocument.toJS()
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onGetMydocuments: () => {
      return dispatch(actionsMyDocument.getMyDocument());
    },
    onDeleteDocument: (docId) => {
      return dispatch(actionsMyDocument.deleteDocument(docId));
    }
  };
};

const VisibleMyDoduments = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDoduments);

const RouterVisibleMyDoduments = withRouter(VisibleMyDoduments);

export default RouterVisibleMyDoduments;
