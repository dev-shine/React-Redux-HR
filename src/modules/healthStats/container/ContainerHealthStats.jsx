import React, { Component } from "react";
import Menu from "components/generic/Menu";
import Header from "components/generic/Header";
import { connect } from "react-redux";
import * as actions from "appRedux/actions";
import HealthStats from "modules/healthStats/component/HealthStats";

class ContainerHealthStats extends React.Component {
    componentWillMount(){
        this.props.onIsAlreadyLogin();
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
                            <div style={{ overflow: "auto", backgroundColor: "white" }}>
                                <HealthStats />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
        frontend: state.frontend.toJS()
});

const mapDispatchToProps = dispatch => ({
    onIsAlreadyLogin: () => dispatch(actions.isAlreadyLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerHealthStats);