import React from 'react';
import _ from 'lodash';

const DisplayUserDeviceDetails = ({ userAssignMachine }) => {
  let machine = _.map(userAssignMachine, (val, i) => {
    return (
      <tr key={i}>
        <td>{val.machineType}</td>
        <td>{val.machineName}</td>
        <td>{val.macAddress}</td>
        <td>{val.assignDate}</td>
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

export default DisplayUserDeviceDetails;
