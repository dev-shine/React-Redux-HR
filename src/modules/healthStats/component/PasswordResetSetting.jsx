import React, { Component } from "react";
import Select from "react-select";
import ToggleButton from "react-toggle-button";

const durationDays = () => {
  let options = [];
  let i = 1;
  while (i <= 100) {
     options.push( {value:i,label:i+" Days"});
    i++;
  }  
 return options
};

export default class PasswordResetSetting extends Component {
  state = { toggleActive: false, selectedOption: null };
  onToggle = () => {
    this.setState({ toggleActive: !this.state.toggleActive });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    //   console.log(options,'optionsoptions');
      
    return (
      <div className="attendance-upload-setting">
        <h5>Password Reset Setting</h5>
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
