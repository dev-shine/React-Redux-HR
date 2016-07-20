import React from 'react';

import DayReference from './DayReference'
import TimeSummary from './TimeSummary'

class MonthSummary extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){
      return (
        <div>
          <TimeSummary  {...this.props}/>
          <DayReference  {...this.props}/>
        </div>
	    )
    }
}

export default MonthSummary


