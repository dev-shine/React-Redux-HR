import React, { Component } from "react";
import InputText from 'components/generic/input/InputText';
import { confirm } from "src/services/notify";

export default class HealthStatsSecretKey extends React.Component {
    constructor() {
        super();
        this.state = { appName: "" };
    }
    handleChange = (e) => {
        this.setState({ appName: e.target.value });
    }
    handleAddClick = () => {
        this.props.healthStatsAddKeyRequest(this.state.appName);
        this.setState({ appName: "" });
    }
    render() {
        let data;
        if (this.props.healthKeyData.app_info) {
            data = this.props.healthKeyData.app_info.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.app_name}</td>
                        <td>{item.secret_key}</td>
                        <td>
                            <i
                                className="material-icons stats-delete-icon"
                                onClick={e => {
                                    confirm(
                                        "Are you sure ?",
                                        "Do you want to delete this key ?",
                                        "warning"
                                    ).then(res => {
                                        if (res) {
                                            this.props.healthStatsDeleteKeyRequest(item.id);
                                        }
                                    });
                                }}
                                aria-hidden="true"
                            >
                                delete
                            </i>
                        </td>
                        <td>
                            <i
                                className="material-icons stats-refresh-icon"
                                onClick={e => {
                                    confirm(
                                        "Are you sure ?",
                                        "Do you want to Regenerate the key ?",
                                        "warning"
                                    ).then(res => {
                                        if (res) {
                                            this.props.healthStatsRegenerateKeyRequest(item.id);
                                        }
                                    });
                                }}
                                aria-hidden="true"
                            >
                                autorenew
                            </i>
                        </td>
                    </tr>
                );
            });
        }
        return (
            <div>
                <h5>Third Party Api Key</h5>
                <div className="stats-add-icon-div">
                    <i
                        className="material-icons stats-add-icon"
                        onClick={() => this.handleAddClick()}
                    >
                        add_box
                        </i>
                </div>
                <div className="app-name-input-div">
                    <InputText className="app-name-input" placeHolder="App Name" value={this.state.appName} onchange={this.handleChange} />
                </div>
                <table className="table table-responsive secret-key-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>App</th>
                            <th>Secret Key</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </div>
        )
    }
}
