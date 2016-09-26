import React from 'react';
import * as _ from 'lodash'
import ListWorkingHours from './ListWorkingHours'


class ListUserWorkingHours extends React.Component {
    constructor( props ){
        super( props );
    }
    render(){

      let WorkingHoursList =  _.map( this.props.manageUserWorkingHours.displayData , ( row, keyval ) => {

        return (
          <ListWorkingHours row={row} key={keyval} keyval={keyval} {...this.props}/>
        )
      })
      return (

        <div className = "row box">
          <div className="col-12">
            <div className="box-body">
                <div className="streamline b-l m-l">
                  {WorkingHoursList}
                </div>
            </div>
          </div>
        </div>
      )
    }
}

export default ListUserWorkingHours


