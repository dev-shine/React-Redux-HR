import React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import LoadingIcon from '../../components/generic/LoadingIcon';
import Paper from 'material-ui/Paper';
var moment = require('moment');
import { CONFIG } from '../../config/index';

export default class ViewUserDevice extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let rows = [];
    _.map(this.props.manageUsers.user_assign_machine, (device, i) => {
      rows.push(<tr key={i}>
            <td style={{marginRight: '0%'}}>{i + 1}</td>
            <td>{device.machine_type}</td>
            <td>{device.machine_name}</td>
            <td>{device.mac_address}</td>
            <td>{device.assign_date}</td>
          </tr>
        );
    });
    return (
      <div>
        <div className="col-md-9">
          <h6 className="text-center">Asssigned Device Details</h6>
          <hr />
          <br />

          <div className='row'>
              <div className='col-xs-12'>
                <div style={{'marginTop': '2%'}}>
                  {
                    rows.length > 0
                  ? <Paper zDepth={3} style={{marginBottom: '10px'}} >
                        <table key='' className="table table-striped table-hover">
                         <thead>
                           <tr>
                           </tr>
                           <tr>
                             <th>Sr. No</th>
                             <th>Device Type</th>
                             <th>Name</th>
                             <th>Mac Address</th>
                             <th>Assign Date</th>
                           </tr>
                         </thead>
                         <tbody>
                           {rows}
                         </tbody>
                       </table>
                    </Paper>
                    : <div className="col-xs-6 col-xs-offset-3 well">
                    <i className="fa fa-exclamation-triangle fa-2x"
                      style={{marginLeft: '45%', opacity: '0.56'}} aria-hidden="true"></i>
                    <h5 style={{marginLeft: '33%', opacity: '0.56'}}>
                    {'Device not Asssigned !'}
                  </h5>
                </div>
                  }
                  </div>
                </div>
              </div>

    </div>
      </div>
    );
  }
}
