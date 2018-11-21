import React, { Component } from "react";
import Menu from "src/components/generic/Menu";
import Header from "src/components/generic/Header";
import { connect } from "react-redux";
import * as actions from 'src/redux/actions';
import HealthStats from "src/modules/healthStats/component/HealthStats";
import HealthStatsSecretKey from "src/modules/healthStats/component/HealthStatsSecretKey";
import * as actionsUsersList from "src/redux/generic/actions/usersList";
import {notify} from 'src/services/notify';
import EmployeeJoiningTerminationStats from "src/modules/healthStats/component/EmployeeJoiningTerminationStats";
import LeaveStats from "src/modules/healthStats/component/LeaveStats";
import { getYearArray } from 'src/services/generic';
import { dateFormatter } from "src/helper/helper";


class ContainerHealthStats extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            month:new Date().getMonth() + 1, 
            year: new Date().getYear() + 1900,
        };
        this.year=[];
      }
    componentWillMount() {
        this.props.onIsAlreadyLogin();
        this.props.healthStatsRequest();
        this.props.requestStatsHistory();
        this.props.healthStatsKeyListRequest();
        this.year = getYearArray();
        this.props.requestStatsLeaveHistory({year:this.state.year,month:this.state.month});
    }
    componentWillReceiveProps(props) {        
        const {deleteHealthData, addSecretKeyData, deleteSecretKeyData, regenerateSecretKeyData} = props;
        if (deleteHealthData.isError) {    
            notify('Error !', deleteHealthData.message, 'error');
          }
        if (deleteHealthData.isSuccess) {
            notify('Success !', deleteHealthData.message, 'success');
          }
        if (addSecretKeyData.isError) {    
            notify('Error !', addSecretKeyData.message, 'error');
          }
        if (addSecretKeyData.isSuccess) {
            notify('Success !', addSecretKeyData.message, 'success');
          }
        if (deleteSecretKeyData.isError) {    
            notify('Error !', deleteSecretKeyData.message, 'error');
          }
        if (deleteSecretKeyData.isSuccess) {
            notify('Success !', deleteSecretKeyData.message, 'success');
          }
        if (regenerateSecretKeyData.isError) {    
            notify('Error !', regenerateSecretKeyData.message, 'error');
          }
        if (regenerateSecretKeyData.isSuccess) {
            notify('Success !', regenerateSecretKeyData.message, 'success');
          }
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
                    <Header
                        pageTitle={"App Health & Stats"}
                        showLoading={this.props.frontend.show_loading}
                    />
                    <div className="app-body" id="view">
                        <div className="padding">
                        <div className="row m-10">
                            <div className="col-sm-12 bg-white">
                                <HealthStats {...this.props} />
                            </div>
                        </div>
                        <div className="row m-10">
                            <div className="col-sm-12 secret-key-block">
                                <HealthStatsSecretKey {...this.props} />
                            </div>
                        </div>
                        <div className="row m-10">
                            <div className="col-sm-6 b-health-stats bg-white">
                            <h5>Recruitment Stats</h5>
                            <EmployeeJoiningTerminationStats data={this.props.statsHistory}/>
                            </div>
                            <div className="col-sm-6 b2-health-stats bg-white">
                                <div className="row leave_stats">
                                    <div className="col-sm-6">
                                        <h5>Leave Stats</h5>
                                    </div>
                                    <div className="col-sm-3">
                                        <select className="form-control" onChange={this.onChange} value={this.state.year} name="year">
                                        {this.year.map((data,index)=><option key={index} value={data}>{data}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-sm-3">
                                        <select className="form-control" onChange={this.onChange} value={this.state.month} name="month">
                                           {dateFormatter().months.map((item, index)=><option key={index} value={index + 1}>{item}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <LeaveStats data={this.props.statsLeaveHistory.data} flag={this.props.statsLeaveHistory.flag} handleFlag={this.props.updateFlag}/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    frontend: state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    healthData: state.healthstats.healthStats.data,
    deleteHealthData: state.healthstats.deleteHealthStats,
    statsHistory: state.healthstats.statsHistory,
    healthKeyData: state.healthstats.healthStatsSecretKeyList.data,
    addSecretKeyData: state.healthstats.healthStatsAddSecretKey,
    deleteSecretKeyData: state.healthstats.healthStatsDeleteSecretKey,
    regenerateSecretKeyData: state.healthstats.healthStatsRegenerateSecretKey,
    statsLeaveHistory: state.healthstats.statsLeaveHistory

});

const mapDispatchToProps = dispatch => ({
    onIsAlreadyLogin: () => dispatch(actions.isAlreadyLogin()),
    healthStatsRequest: () => dispatch(actions.requestHealthStats()),
    deleteHealthStats: (year) => dispatch(actions.requestDeleteHealthStats(year)),
    requestStatsHistory: () => dispatch(actions.requestStatsHistory()),
    healthStatsKeyListRequest: () => dispatch(actions.requestHealthStatsSecretKeyList()),
    healthStatsAddKeyRequest: (appname) => dispatch(actions.requestHealthStatsAddSecretKey(appname)),
    healthStatsDeleteKeyRequest: (appid) => dispatch(actions.requestHealthStatsDeleteSecretKey(appid)),
    healthStatsRegenerateKeyRequest: (appid) => dispatch(actions.requestHealthStatsRegenerateSecretKey(appid)),
    requestStatsLeaveHistory: (payload) => dispatch(actions.requestStatsLeaveHistory(payload)),
    updateFlag: () => dispatch(actions.updateFlag()) 

});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerHealthStats);