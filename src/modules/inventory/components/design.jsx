import * as _ from 'lodash';
import {notify, confirm} from 'src/services/notify';
import {getLowerCase , getLoggedUser} from 'src/services/generic';
import AddDeviceDialoge from 'modules/inventory/components/AddDeviceDialoge';
import AddDeviceStatus from 'modules/inventory/components/AddDeviceStatus';
import {CONFIG} from 'config'
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';    
import Menu from 'components/generic/Menu';
import {isNotUserValid} from 'src/services/generic';
import LoadingIcon from 'components/generic/LoadingIcon';
import Header from 'components/generic/Header';
import AlertNotification from 'components/generic/AlertNotification';
import UsersList from 'components/generic/UsersList';
import FormAddNewInventory from 'modules/inventory/components/AddInventory';
import ViewUserDevice from 'components/inventory/ViewUser';
import InventoryList from 'modules/inventory/components/InventoryList';
import DeviceCounterTab from 'components/inventory/DeviceCounterTab';
import * as actionsManageDevice from 'appRedux/inventory/actions/inventory';
import * as actions from 'appRedux/actions';
import * as actionsUsersList from 'appRedux/generic/actions/usersList';
import * as actionsManageUsers from 'appRedux/manageUsers/actions/manageUsers';

class InventoryItem1 extends React.Component {
  render () {
    return (
      <div>
        <Menu/>
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={'Inventory Management'}  />
          <div className="app-body" id="view" >
            <div className="row">
              <div className="col-12">
              <div className="app-body" id="view">
          <div className="col-xs-12 col-sm-12" >
                <div className="col-md-5 p-r" >
                  <div className="form-group" style={{marginLeft:"8%", marginTop:"4%"}}>
                    <label style={{'fontSize': 15}}>Users:</label>
                    <select className="form-control"
                      ref="device_type"
                      value="">
                      <option value="">--Select User--</option>
                      
                    </select>
                    <div className='row m-1'>
                    <div className='col-sm-15 p-8 pt-8' style={{marginTop:"4%"}} >
                    <label style={{'fontSize': 15}}>Comment:</label>
                    <textarea placeholder="Your comment"  className="form-control resize-y"
                       value="">
                        </textarea>
                        </div>
                        </div>
                        <div className='row m-2'>
                    <div className='col-sm-15 p-8 pt-8'style={{ marginTop:"4%"}}>
                    <div className="streamline b-l m-l" >
                    <div className="sl-item b-info" >
                        <div className="sl-content">
                            <div className="sl-date text-muted">  <b>History--1</b></div>
                            <div className="sl-date text-muted">  <b>History--2</b></div>
                    </div>
                    </div>
                            <div className="sl-item b-info" >
                        <div className="sl-content"> 
                            <div className="sl-date text-muted">  <b>History--3</b></div>
                            <div className="sl-date text-muted">  <b>History--4</b></div>
                            </div>
                            </div>
                            <div className="sl-item b-info" >
                        <div className="sl-content"> 
                            <div className="sl-date text-muted">  <b>History--5</b></div>
                            <div className="sl-date text-muted">  <b>History--6</b></div>
                            <div className="sl-date text-muted">  <b>History--7</b></div>
                            </div>
                    </div>
                    </div>
                    </div>
                  </div>
                
              </div>
            </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
}


export default InventoryItem1;

