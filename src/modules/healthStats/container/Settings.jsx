import React, { Component } from "react";
import Menu from "components/generic/Menu";
import Header from "components/generic/Header";
import { connect } from "react-redux";
import * as actions from "appRedux/actions";
import AttendanceUploadSetting from "modules/healthStats/component/AttendanceUploadSetting";
import HealthStatsSecretKey from "modules/healthStats/component/HealthStatsSecretKey";
import * as actionsUsersList from "appRedux/generic/actions/usersList";
import {notify} from 'src/services/notify';
import EmployeeJoiningTerminationStats from "modules/healthStats/component/EmployeeJoiningTerminationStats";
import LeaveStats from "modules/healthStats/component/LeaveStats";
import { getYearArray } from 'src/services/generic';
import { dateFormatter } from "src/helper/helper";


class ContainerHealthStats extends React.Component {
    constructor (props) {
        super(props);
      }
    componentWillMount() {
        this.props.onIsAlreadyLogin();
        this.props.getAttendanceUploadSettings();
        // this.props.requestStatsHistory();
        // this.props.healthStatsKeyListRequest();
        // this.year = getYearArray();
        // this.props.requestStatsLeaveHistory({year:this.state.year,month:this.state.month});
    }
    componentWillReceiveProps(props) {        
        // const {deleteHealthData, addSecretKeyData, deleteSecretKeyData, regenerateSecretKeyData} = props;
        // if (deleteHealthData.isError) {    
        //     notify('Error !', deleteHealthData.message, 'error');
        //   }
        // if (deleteHealthData.isSuccess) {
        //     notify('Success !', deleteHealthData.message, 'success');
        //   }
        // if (addSecretKeyData.isError) {    
        //     notify('Error !', addSecretKeyData.message, 'error');
        //   }
        // if (addSecretKeyData.isSuccess) {
        //     notify('Success !', addSecretKeyData.message, 'success');
        //   }
        // if (deleteSecretKeyData.isError) {    
        //     notify('Error !', deleteSecretKeyData.message, 'error');
        //   }
        // if (deleteSecretKeyData.isSuccess) {
        //     notify('Success !', deleteSecretKeyData.message, 'success');
        //   }
        // if (regenerateSecretKeyData.isError) {    
        //     notify('Error !', regenerateSecretKeyData.message, 'error');
        //   }
        // if (regenerateSecretKeyData.isSuccess) {
        //     notify('Success !', regenerateSecretKeyData.message, 'success');
        //   }
    }
    onChange=(e) => {
        if(e.target.name==="month"){
            this.setState({ month: e.target.value});
            this.props.requestStatsLeaveHistory({month:e.target.value, year:this.state.year}); 
        }
        if(e.target.name==="year"){
            this.setState({ year: e.target.value});
            this.props.requestStatsLeaveHistory({month:this.state.month, year:e.target.value});
        }
    } 
    render() {
        return (
            <div>
                <Menu {...this.props} />
                <div id="content" className="app-content box-shadow-z0 content-health-stats" role="main">
                    <Header pageTitle={"Settings"} showLoading={this.props.frontend.show_loading} />
                    <div className="app-body" id="view">
                        <div className="padding">
                        <div className="row m-10">
                            <div className="col-sm-12 bg-white">
                                <AttendanceUploadSetting {...this.props} />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {

    console.log('state', state);
    
    return{
    frontend: state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    attendanceUploadSetting: state.settings.attendanceUploadSetting
};
}
const mapDispatchToProps = dispatch => ({
    onIsAlreadyLogin: () => dispatch(actions.isAlreadyLogin()),
    getAttendanceUploadSettings: () => dispatch(actions.requestGetAttendanceUploadSetting()),
    // deleteHealthStats: (year) => dispatch(actions.requestDeleteHealthStats(year)),
    // requestStatsHistory: () => dispatch(actions.requestStatsHistory()),
    // healthStatsKeyListRequest: () => dispatch(actions.requestHealthStatsSecretKeyList()),
    // healthStatsAddKeyRequest: (appname) => dispatch(actions.requestHealthStatsAddSecretKey(appname)),
    // healthStatsDeleteKeyRequest: (appid) => dispatch(actions.requestHealthStatsDeleteSecretKey(appid)),
    // healthStatsRegenerateKeyRequest: (appid) => dispatch(actions.requestHealthStatsRegenerateSecretKey(appid)),
    // requestStatsLeaveHistory: (payload) => dispatch(actions.requestStatsLeaveHistory(payload)),
    // updateFlag: () => dispatch(actions.updateFlag()) 

});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerHealthStats);