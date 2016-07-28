import React from 'react';
import * as _ from 'lodash'
import ListLeavesLeave from './ListLeavesLeave'


class ListLeaves extends React.Component {
    constructor( props ){
        super( props );
    }
    render(){
      let LeavesList =  _.map( this.props.listLeaves.leaves , ( leave, keyval ) => {

        return (
          <ListLeavesLeave leave={leave} key={keyval} keyval={keyval} {...this.props}/>
        )
      })
      return (
        <div className="row-col">
          
            <div className="list inset">
              {LeavesList}
            </div>
          
        </div>
      )
    }
}

export default ListLeaves


