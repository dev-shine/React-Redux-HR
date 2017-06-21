import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { Button } from 'components/generic/buttons/';
import _ from 'lodash';

const DisplayRolesList = ({displayData, handleChangeActions, handleChangePages, handleChangeNotification, handleDelete}) => {
  let rolesData = displayData.roles;
  if(typeof rolesData !== undefined || rolesData !== null ){
    let rolesList = _.map(rolesData, (value, key) => {
      let rolesId = value.id;
      let roleActions = _.map(value.role_actions, (v, k) => {
        let actionId = v.id;
        return(
          <div key={k}>
            <input
              type="checkbox"
              value={v.name}
              checked={v.is_assigned}
              onChange={() => { handleChangeActions(actionId, rolesId); }} key={actionId}
            /> {v.name}
            <br />
          </div>
        );
      });
      let rolePages = _.map(value.role_pages, (v, k) => {
        let pageId = v.id;
        return(
          <div key={k}>
            <input
              type="checkbox"
              value={v.name}
              checked={v.is_assigned}
              onChange={() => { handleChangePages(pageId, rolesId); }} key={pageId}
            /> {v.name}
            <br />
          </div>
        );
      });
      let roleNotification = _.map(value.role_notifications, (v, k) => {
        let notificationId = v.id;
        return(
          <div key={k}>
            <input
              type="checkbox"
              value={v.name}
              checked={v.is_assigned}
              onChange={() => { handleChangeNotification(notificationId, rolesId); }} key={notificationId}
            /> {v.name}
            <br />
          </div>
        );
      });
      return (
        <div key={key}>
          <div className="col-xs-12">
            <h4 className="m-a-0 text-lg"><span className="col-sm-6">{value.name}</span> <span onClick={() => {handleDelete(value.id)}} className="text-sm">Delete Role</span></h4>
            <span className="text-sm">{value.description}</span>
            <div className="table-responsive p-t p-r p-b p-l">
              <table className="table table-condensed">
                <thead><tr><th>Pages</th><th>Actions</th><th>Notification</th></tr></thead>
                <tbody><tr><td>{rolePages}</td><td>{roleActions}</td><td>{roleNotification}</td></tr></tbody>
              </table>
            </div>
          </div>
          <hr style={{'size': '1px'}}/>
        </div>
      );
    });
    return(
      <div className="row p-t">
        <div className="col-xs-12">
          {rolesList}
        </div>
      </div>
    );
  }
}

export default DisplayRolesList;
