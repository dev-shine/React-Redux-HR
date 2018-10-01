import React, { Component } from "react";
import Menu from "components/generic/Menu";
import Header from "components/generic/Header";
import { connect } from "react-redux";
import * as actions from "appRedux/actions";
import HealthStats from "modules/healthStats/component/HealthStats";
import HealthStatsSecretKey from "modules/healthStats/component/HealthStatsSecretKey";
import * as actionsUsersList from "appRedux/generic/actions/usersList";
import {notify} from 'src/services/notify';


class ContainerHealthStats extends React.Component {
    componentWillMount() {
        this.props.onIsAlreadyLogin();
        this.props.healthStatsRequest();
        this.props.healthStatsKeyListRequest();
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
    render() {
        return (
            <div>
                <Menu {...this.props} />
                <div id="content" className="app-content box-shadow-z0" role="main">
                    <Header
                        pageTitle={"App Health & Stats"}
                        showLoading={this.props.frontend.show_loading}
                    />
                    <div className="app-body" id="view">
                        <div className="padding">
                        <div className="row m-0">
                            <div className="col-sm-2 bg-white">
                                <HealthStats {...this.props} />
                            </div>
                            <div className="col-sm-5 secret-key-block">
                                <HealthStatsSecretKey {...this.props} />
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
    healthKeyData: state.healthstats.healthStatsSecretKeyList.data,
    deleteHealthData: state.healthstats.deleteHealthStats,
    addSecretKeyData: state.healthstats.healthStatsAddSecretKey,
    deleteSecretKeyData: state.healthstats.healthStatsDeleteSecretKey,
    regenerateSecretKeyData: state.healthstats.healthStatsRegenerateSecretKey

});

const mapDispatchToProps = dispatch => ({
    onIsAlreadyLogin: () => dispatch(actions.isAlreadyLogin()),
    healthStatsRequest: () => dispatch(actions.requestHealthStats()),
    healthStatsKeyListRequest: () => dispatch(actions.requestHealthStatsSecretKeyList()),
    healthStatsAddKeyRequest: (appname) => dispatch(actions.requestHealthStatsAddSecretKey(appname)),
    healthStatsDeleteKeyRequest: (appid) => dispatch(actions.requestHealthStatsDeleteSecretKey(appid)),
    healthStatsRegenerateKeyRequest: (appid) => dispatch(actions.requestHealthStatsRegenerateSecretKey(appid)),
    deleteHealthStats: (year) => dispatch(actions.requestDeleteHealthStats(year))
    
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerHealthStats);