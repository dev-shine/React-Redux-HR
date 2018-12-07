import React, { Component } from "react";
import Menu from "../../../components/generic/Menu";
import Header from "../../../components/generic/Header";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions';
import AttendanceUploadSetting from "../../../modules/healthStats/component/AttendanceUploadSetting";
import PasswordResetSetting from "../../../modules/healthStats/component/PasswordResetSetting";

class ContainerHealthStats extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.onIsAlreadyLogin();
    this.props.getAttendanceUploadSettings();
    this.props.resetPasswordStatus();
  }
  render() {
    return (
      <div>
        <Menu {...this.props} />
        <div
          id="content"
          className="app-content box-shadow-z0 content-health-stats"
          role="main"
        >
          <Header
            pageTitle={"Settings"}
            showLoading={this.props.frontend.show_loading}
          />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row m-10">
                <div className="col-sm-6 setting-section1">
                  <div className="setting1 bg-white">
                    <AttendanceUploadSetting {...this.props} />
                  </div>
                </div>
                <div className="col-sm-6 setting-section2">
                  <div className="setting2 bg-white">
                    <PasswordResetSetting
                      resetPasswordData={this.props.requestResetPasswordSetting}
                      resetPasswordStatusData={
                        this.props.resetPasswordStatusData
                      }
                      clearData={this.props.clearData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    frontend: state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    attendanceUploadSetting: state.settings.attendanceUploadSetting,
    resetPasswordStatusData: state.settings.resetPasswordStatus
  };
};
const mapDispatchToProps = dispatch => ({
  onIsAlreadyLogin: () => dispatch(actions.isAlreadyLogin()),
  getAttendanceUploadSettings: () =>
    dispatch(actions.requestGetAttendanceUploadSetting()),
  requestAddAttendanceUploadSetting: params =>
    dispatch(actions.requestAddAttendanceUploadSetting(params)),
  requestDeleteAttendanceUploadSetting: params =>
    dispatch(actions.requestDeleteAttendanceUploadSetting(params)),
  requestResetPasswordSetting: params =>
    dispatch(actions.requestResetPasswordSetting(params)),
  resetPasswordStatus: () => dispatch(actions.requestResetPasswordStatus()),
  clearData: () => dispatch(actions.requestClearResetPasswordData()),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerHealthStats);
