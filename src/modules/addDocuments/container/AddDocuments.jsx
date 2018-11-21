import React, { Component } from "react";
import Menu from "src/components/generic/Menu";
import { isNotUserValid } from "src/services/generic";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "src/redux/actions";
import UsersList from "../../../components/generic/UsersList";
import Header from "src/components/generic/Header";
import FormAddDocuments from "../components/FormAddDocuments";

class AddDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: ""
    };
    this.props.onIsAlreadyLogin();
    this.onUserClick = this.onUserClick.bind(this);
  }
  componentWillReceiveProps(props) {
    window.scrollTo(0, 0);
    let isNotValid = isNotUserValid(this.props.route.path, props.loggedUser);
    if (isNotValid.status) {
      this.props.router.push(isNotValid.redirectTo);
    }
  }
  componentDidMount() {
    this.props.requestUsersList();
  }
  onUserClick(userid) {
    this.props.history.push(`/add_documents/${userid}`);
  }
  render() {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header
            pageTitle={"Add Documents"}
            showLoading={this.props.frontend.show_loading}
          />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-sm-12" id="fixedScroll">
                  <UsersList
                    users={this.props.usersList.users}
                    onUserClick={this.onUserClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    frontend: state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    usersList: state.usersList.toJS()
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    requestUsersList: () => {
      return dispatch(actions.requestUsersList());
    }
  };
};
const VisibleAddDocuments = connect(mapStateToProps, mapDispatchToProps)(
  AddDocuments
);

const RouterVisibleAddDocuments = withRouter(VisibleAddDocuments);

export default RouterVisibleAddDocuments;
