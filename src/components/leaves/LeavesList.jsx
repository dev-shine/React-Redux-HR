import React from 'react';
import * as _ from 'lodash'
import LeavesListLeave from './LeavesListLeave'


class LeavesList extends React.Component {
    constructor( props ){
        super( props );
    }
    render(){
      let holidaysList =  _.map( this.props.listLeaves.leaves , ( leave, keyval ) => {

        return (
          <LeavesListLeave leave={leave} key={keyval} keyval={keyval} {...this.props}/>
        )
      })
      return (




      
            <div className="box">

            <div className="box">
        <div className="box-divider m-a-0"></div>
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>User Details</th>
              <th>Applied on</th>
              <th>From</th>
              <th>To</th>
              <th>No Of Days</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            
            {holidaysList}
          </tbody>
        </table>
      </div>

              
            </div>
          

          
        
      )
    }
}

export default LeavesList


