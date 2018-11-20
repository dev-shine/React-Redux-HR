import React, { Component } from "react";
import InputText from 'components/generic/input/InputText';
import {notify} from 'src/services/notify';
import moment from 'moment';

export default class AttendanceUploadSetting extends React.Component {
    constructor() {
        super();
        this.state={
            userKey: '',
            dateTimeKey: ''
        };
    }
    componentWillReceiveProps(props) {    
        const {attendanceUploadSetting} = props;
        const {userKey, dateTimeKey} = this.state;
        if (attendanceUploadSetting.isError) {    
            notify('Error !', attendanceUploadSetting.message, 'error');
        }
        if (attendanceUploadSetting.isSuccess && (userKey !== '' || dateTimeKey !== '')) {    
            this.setState({
                userKey: '',
                dateTimeKey: ''
            });
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleAddClick = (params) => {
        this.props.requestAddAttendanceUploadSetting(params);
    }
    handleRemoveKey = (params) => {
        this.props.requestDeleteAttendanceUploadSetting(params);
    }
    render() {
        let config = this.props.attendanceUploadSetting.data;
        let userKeys = [], dateTimeKeys = [];    
        config.user_id && config.user_id.map((keyText, i)=>{
            userKeys.push(<span key={i} className="key-chips">
            <span className="text">{keyText}</span>
            <span className="delete" onClick={()=>{this.handleRemoveKey({field_name:'user_id', key_text: keyText})}} >x</span>
        </span>)
        })
        config.time && config.time.map((keyText, i)=>{
            dateTimeKeys.push(<span key={i} className="key-chips">
            <span className="text">{keyText}</span>
            <span className="delete" onClick={()=>{this.handleRemoveKey({field_name:'time', key_text: keyText})}}>x</span>
        </span>)
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
                    <tr>
                        <td>User</td>
                        <td><div className="keys-wrapper">{userKeys}</div></td>
                        <td>
                            <div className="stats-add-icon-div">
                                <i className="material-icons stats-add-icon" onClick={() => this.handleAddClick({userid_key:this.state.userKey})}>add_box</i>
                            </div>
                            <div className="app-name-input-div">
                                <InputText className="app-name-input" name="userKey" placeHolder="Date Time Key" value={this.state.userKey} onchange={this.handleChange} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>DateTime</td>
                        <td><div className="keys-wrapper">{dateTimeKeys}</div></td>
                        <td>
                            <div className="stats-add-icon-div">
                                <i className="material-icons stats-add-icon" onClick={() => this.handleAddClick({timing_key: this.state.dateTimeKey})}>add_box</i>
                            </div>
                            <div className="app-name-input-div">
                                <InputText className="app-name-input" name="dateTimeKey" placeHolder="Date Time Key" value={this.state.dateTimeKey} onchange={this.handleChange} />
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
