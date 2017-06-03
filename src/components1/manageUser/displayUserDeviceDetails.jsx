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
  return (
    <div>
      <h6 className="text-center">Asssigned Device Details</h6>
      <br />
      <ul className="list-group m-b">
        <li className="list-group-item">
          <div className="clear">
            {
              machine.length > 0
              ? <table key='' style={{fontSize: '9px'}} className="table table-striped table-hover">
                <thead>
                  <tr>
                  </tr>
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
              </table>
              : <h6>Device Not Asssigned</h6>
            }
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DisplayUserDeviceDetails;
