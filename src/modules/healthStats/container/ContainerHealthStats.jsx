import React, { Component } from "react";
import Menu from "components/generic/Menu";
import Header from "components/generic/Header";
import { connect } from "react-redux";
import * as actions from "appRedux/actions";
import HealthStats from "modules/healthStats/component/HealthStats";
import * as actionsUsersList from "appRedux/generic/actions/usersList";
import {notify} from 'src/services/notify';


class ContainerHealthStats extends React.Component {
    componentWillMount() {
        this.props.onIsAlreadyLogin();
        this.props.healthStatsRequest();
    }
    componentWillReceiveProps(props) { 
        let {deleteHealthData} = props;
        if (deleteHealthData.isError) {
            notify('Error !', deleteHealthData.message, 'error');
          }
        if (deleteHealthData.isSuccess) {
            notify('Success !', deleteHealthData.data.message, 'success');
            props.healthStatsRequest();
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
                            <HealthStats {...this.props} />
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
    deleteHealthData: state.healthstats.deleteHealthStats
});

const mapDispatchToProps = dispatch => ({
    onIsAlreadyLogin: () => dispatch(actions.isAlreadyLogin()),
    healthStatsRequest: () => dispatch(actions.requestHealthStats()),
    deleteHealthStats: (year) => dispatch(actions.requestDeleteHealthStats(year))

});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerHealthStats);