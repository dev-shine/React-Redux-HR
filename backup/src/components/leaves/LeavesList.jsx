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
        <div>
        <div className="row p-a">
              <div className="col-md-2">
                  <h6>Status</h6>
              </div>
              <div className="col-md-2">
                  <h6>User Details</h6>
              </div>
              <div className="col-md-1">
                  <h6>Applied On</h6>
              </div>
              <div className="col-md-3">
                <h6>Leave Details</h6>
              </div>

              <div className="col-md-4">
                <h6>Last Applied Leaves</h6>
              </div>

            </div>
            
            <hr/>

            {holidaysList}



      

              
            </div>
          

          
        
      )
    }
}

export default LeavesList


