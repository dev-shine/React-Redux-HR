import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Menu from "../generic/Menu.jsx";


class Load extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <Menu {...this.props} />
        <div className="loader">
          <i className="fa fa-spinner fa-spin" />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    frontend: state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin
  };
}

export default withRouter(connect(mapStateToProps)(Load));
