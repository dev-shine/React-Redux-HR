import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Menu from "../generic/Menu.jsx";
import "../../styles/generic/loaderMenuDefault.scss";
class Load extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <Menu {...this.props} />
        <div className="loader">
          <i className="fa fa-spinner fa-spin" style={{ fontSize: "75px" }} />
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
