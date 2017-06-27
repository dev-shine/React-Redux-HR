import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const DisplayUserDeviceDetails = ({ userAssignMachine }) => {
  let machine = _.map(userAssignMachine, (val, i) => {
    return (
      <tr key={i}>
        <td>{val.machine_type}</td>
        <td>{val.machine_name}</td>
        <td>{val.mac_address}</td>
        <td>{val.assign_date}</td>
      </tr>
    );
  });
  let machineData = <span className="text-muted" style={{marginLeft: '16px'}}>Device Not Asssigned</span>;
  if (!_.isEmpty(machine)) {
    machineData = <table style={{fontSize: '9px'}} className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Device Type</th>
          <th>Name</th>
          <th>Mac Address</th>
          <th>Assign Date</th>
        </tr>
      </thead>
      <tbody>
        {machine}
      </tbody>
    </table>;
  }
  return (
    <div>
      <h6 className="text-center">Asssigned Device Details</h6>
      <br />
      <div className="clear">
        {machineData}
      </div>
    </div>
  );
};

DisplayUserDeviceDetails.PropTypes = {
  userAssignMachine: PropTypes.array.isRequired
};

export default DisplayUserDeviceDetails;
