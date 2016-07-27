import React from 'react';
import * as _ from 'lodash'
import LeavesListLeave from './LeavesListLeave'


class UserLeavesList extends React.Component {
    constructor( props ){
        super( props );
    }
    _getLeavesList( d ){
       return _.map( d , ( leave, keyval ) => {
        let s = leave.status
        let leaveStatusColor = ""
        if( s == 'Approved'){
          leaveStatusColor = "green-A200"
        }else if(s == 'Pending'){
          leaveStatusColor = "blue"
        }else if( s == 'Rejected'){
          leaveStatusColor = "red-500"
        }else if( s == 'Cancelled'){
          leaveStatusColor = "red-100"
        }

          return (
            <tr key={keyval} className={leaveStatusColor} >
              <td>{s}</td>
              <td>{leave.applied_on}</td>
              <td>{leave.from_date}</td>
              <td>{leave.to_date}</td>
              <td>{leave.no_of_days}</td>
              <td>{leave.reason}</td>
            </tr>
          )
      })

    }
    render(){
      let leavesList = this._getLeavesList( this.props.userLeaves.leaves )
       return (
        <div className = "row">
          <div className="col-12">
            <div className="box">

            <div className="box">
        <div className="box-divider m-a-0"></div>
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Applied On</th>
              <th>From</th>
              <th>To</th>
              <th>No. Of Days</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            
            {leavesList}
          </tbody>
        </table>
      </div>

              
            </div>
          </div>
        </div>
      )
    }
}

export default UserLeavesList


