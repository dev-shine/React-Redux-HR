import React, { Component } from "react";
import InputText from 'components/generic/input/InputText';
import { confirm } from "src/services/notify";
import moment from 'moment';
import Chip from 'material-ui/Chip';

export default class AttendanceUploadSetting extends React.Component {
    constructor() {
        super();
        this.state={
          userKey: '',
          dateTimeKey: ''
      };
    }
    handleChange = (e) => {
      console.log('qqqqqqqqqqqqqe.', e.target.name, e.target.value);
      
        this.setState({ [e.target.name]: e.target.value });
    }
    handleAddClick = () => {
        this.props.healthStatsAddKeyRequest(this.state.appName);
    }
    render() {
      console.log('ssssssssssss', this.state);
      let data = [];
      this.props.attendanceUploadSetting.data.map((setting, i)=>{
        let keys = [];
        setting.keys.map((label, j) => {
          keys.push(<span className="key-chips">
          <span className="text">{label}</span>
          <span className="delete">x</span>
        </span>)
        })
        data.push(<tr>
          <td>{setting.field}</td>
          <td>
            <div className="keys-wrapper">
              {keys}
            </div>
          </td>
          <td>
          <div className="stats-add-icon-div">
              <i
                  className="material-icons stats-add-icon"
                  onClick={() => this.handleAddClick()}
              >
                  add_box
                  </i>
          </div>
          <div className="app-name-input-div">
              <InputText className="app-name-input" name={setting.field} placeHolder="Date Time Key" value={this.state[setting.field]} onchange={this.handleChange} />
          </div>
          </td>
      </tr>)
      })
        return (
            <div className="attendance-upload-setting">
                <h5>Attendance Upload Setting</h5>
                <table className="table table-responsive secret-key-table">
                    <thead>
                        <tr>
                            <th className="field-column">Field</th>
                            <th className="allowed-keys-column">Allowed Keys</th>
                            <th className="add-new-key-column" >Add New Key</th>
                        </tr>
                    </thead>
                    <tbody>
                      {data}
                    {/* <tr>
                        <td>User Id</td>
                        <td>keys</td>
                        <td>
                        <div className="stats-add-icon-div">
                            <i
                                className="material-icons stats-add-icon"
                                onClick={() => this.handleAddClick()}
                            >
                                add_box
                                </i>
                        </div>
                        <div className="app-name-input-div">
                            <InputText className="app-name-input" name="userKey" placeHolder="User Key" value={this.state.userKey} onchange={this.handleChange} />
                        </div>
                        </td>
                    </tr> */}
                    {/* <tr>
                        <td>Date Time</td>
                        <td>
                          <div className="keys-wrapper">
                            <span className="key-chips">
                              <span className="text">keydksjdhfksfhkjsdahfkahkas</span>
                              <span className="delete">x</span>
                            </span>
                          </div>
                        </td>
                        <td>
                        <div className="stats-add-icon-div">
                            <i
                                className="material-icons stats-add-icon"
                                onClick={() => this.handleAddClick()}
                            >
                                add_box
                                </i>
                        </div>
                        <div className="app-name-input-div">
                            <InputText className="app-name-input" name="dateTimeKey" placeHolder="Date Time Key" value={this.state.dateTimeKey} onchange={this.handleChange} />
                        </div>
                        </td>
                    </tr> */}
                    </tbody>
                </table>
            </div>
        )
    }
}
