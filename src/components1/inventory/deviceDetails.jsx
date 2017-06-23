import React from 'react';
import _ from 'lodash';
import 'react-date-picker/index.css';

const DeviceDetails = ({user_assign_machine}) => {
  let machineList = _.map(user_assign_machine, (val, i) => {
    return (<tr key={i}>
      <td>{val.machine_type}</td>
      <td>{val.machine_name}</td>
      <td>{val.mac_address}</td>
      <td>{val.serial_number}</td>
      <td>{val.assign_date}</td>
    </tr>);
  });
  if (_.isEmpty(machineList)) {
    machineList = <h6>{'Device Not Asssigned'}</h6>;
  }

  return (
    <div>
      <h6 className="text-center">Asssigned Device Details</h6>
      <br />
      <ul className="list-group m-b">
        <li className="list-group-item">
          <div className="clear">
            <table key='' className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Device Type</th>
                  <th>Name</th>
                  <th>Mac Address</th>
                  <th>Serial Number</th>
                  <th>Assign Date</th>
                </tr>
              </thead>
              <tbody>
                {machineList}
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default DeviceDetails;
