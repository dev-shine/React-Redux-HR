import React, { Component } from "react";
import Select from "react-select";
import ToggleButton from "react-toggle-button";
import lodash from "lodash";

const durationDays = () => {
  let options = [];
  let i = 1;
  while (i <= 100) {
    options.push({ value: i, label: i + " Days" });
    i++;
  }
  return options;
};

export default class PasswordResetSetting extends Component {
  state = { toggleActive: false, selectedOption: null };

  onToggle = () => {
    this.setState({ toggleActive: !this.state.toggleActive });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption, isDisabled: "" });
  };

  onSaveChangesClick = () => {
    this.props.resetPasswordData(this.state);
  };
  componentWillReceiveProps(props) {
    const { value } = props.resetPasswordStatusData.data;
    if (
      !_.isEqual(
        this.props.resetPasswordStatusData.data,
        props.resetPasswordStatusData.data
      )
    ) {
      this.setState({
        toggleActive: value && value.status,
        selectedOption: value
          ? {
              value: parseInt(value.days),
              label: parseInt(value.days) + " days"
            }
          : null
      });
    }
  }
  render() {
    let isDisabled = this.state.selectedOption === null ? "disabled" : "";
    return (
      <div className="attendance-upload-setting">
        <div className="reset-password-save">
          <div className="col-sm-6 col-xs-6">
            <h5>Password Reset Setting</h5>
          </div>
          <div className="col-sm-6 col-xs-6 save-btn">
            <button
              type="button"
              className={`btn btn-primary ${isDisabled}`}
              onClick={this.onSaveChangesClick}
              disabled={isDisabled}
            >
              Save Changes
            </button>
          </div>
        </div>
        <table className="table table-responsive secret-key-table">
          <tbody>
            <tr>
              <td>Reset Password</td>
              <td>
                <div className="app-name-input-div">
                  <ToggleButton
                    value={this.state.toggleActive}
                    onToggle={() => {
                      this.onToggle();
                    }}
                  />{" "}
                </div>
              </td>
            </tr>
            <tr>
              <td>Reset Password Duration</td>
              <td>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={durationDays()}
                  placeholder="Select Duration"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
