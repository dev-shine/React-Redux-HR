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

        let f_char = s.charAt(0)

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

            <div key={keyval} className={`list-item b-l b-l-2x b-${leaveStatusColor}`}>
            <div className="list-left">
              <span className={`w-40 avatar ${leaveStatusColor}`}>
                {f_char}
              </span>
            </div>
            <div className="list-body">
              <div className="pull-right text-muted text-xs">
                
              </div>

              <div>
                <span className="_500">Status : {leave.status}</span>
              </div>

              <div>
                <span className="_500">Apply on : {leave.applied_on}</span>
              </div>
              <div>
                <span className="_500">From {leave.from_date} to {leave.to_date }</span>
                &nbsp;&nbsp;&nbsp;<span className="label cyan">{ leave.no_of_days} Day</span>
              </div>
              <div className="text-ellipsis text-muted text-sm">Reason : { leave.reason }</div>
            </div>
          </div>
            
          )
      })

    }
    render(){
      let leavesList = this._getLeavesList( this.props.userLeaves.leaves )
       return (
        <div className = "row">
          
            <div className="row-col">
              <div className="list white">
                {leavesList}
              </div>
            </div>
          
        </div>
      )
    }
}

export default UserLeavesList


