import React from 'react';
import * as _ from 'lodash'
import Holiday from '../../components/holidaysList/Holiday'

class HolidaysList extends React.Component {
    constructor( props ){
        super( props );
    }
    render(){
      let holidaysList =  _.map( this.props.holidaysList.holidays , ( holiday, keyval ) => {
        return (
          <Holiday holiday={holiday} key={keyval}/>
        )
      })
      return (
        <div className = "row">
          <div className="col-12">
            <div className="box">

            <div className="box">
        <div className="box-divider m-a-0"></div>
        <table className="table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Date</th>
              <th>Holiday</th>
            </tr>
          </thead>
          <tbody>
            
            {holidaysList}
          </tbody>
        </table>
      </div>

              
            </div>
          </div>
        </div>
      )
    }
}

export default HolidaysList


