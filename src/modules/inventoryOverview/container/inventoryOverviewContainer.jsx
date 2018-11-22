import React from 'react';
import Menu from '../../../components/generic/Menu';
import Header from '../../../components/generic/Header';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import ViewUserDevice from '../../../components/inventory/ViewUser';
import DeviceCounterTab from '../../../components/inventory/DeviceCounterTab';
import * as actionsManageDevice from '../../../redux/inventory/actions/inventory';
import * as actions from '../../../redux/actions';
import * as actionsUsersList from '../../../redux/generic/actions/usersList';
import * as actionsManageUsers from '../../../redux/manageUsers/actions/manageUsers';

class InventoryOverviewContainer extends React.Component{

    constructor(props){
        super(props);
        this.props.onIsAlreadyLogin();
        this.state={
          
        }
    }

    componentWillMount(){
        this.props.onFetchDeviceStatus();
        this.props.onFetchDeviceCount();
    }
    render(){ 
          return(
            <div>
                <Menu {...this.props} />
                 <div id="content" className="app-content box-shadow-z0" role="main">
                    <Header pageTitle={'Inventory Overview'}  />
                    <div className="col-md-2">
                </div>
                <div className="padding">
                <div className={this.state.viewUserNew}>
                  <DeviceCounterTab statusList={this.props.manageDevice.statusList} deviceCountList={this.props.manageDevice.deviceCountList} router={this.props.router}/>
                </div>
              </div>
                 </div>
             </div>    
        )
    }
}


function mapStateToProps (state) {
    return {
      loggedUser:   state.logged_user.userLogin,
      manageDevice: state.manageDevice.toJS()
    };
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      onIsAlreadyLogin: () => {
        return dispatch(actions.isAlreadyLogin());
      },
      onFetchDeviceStatus: () => {
        return dispatch(actionsManageDevice.getDeviceStatus());
      },
      onFetchDeviceCount: () => {
        return dispatch(actionsManageDevice.deviceCount());
      },
    };
  };
  

  const InventoryOverviewContainerData = connect(mapStateToProps,mapDispatchToProps)(InventoryOverviewContainer);

const RouterVisibleInventoryOverview = withRouter(InventoryOverviewContainerData,mapDispatchToProps);

export default RouterVisibleInventoryOverview;