import React from 'react';

import VisibleDayReference from './dayReference'
import VisibleTimeSummary from './timeSummary'

class MonthSummary extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){
      return (
        <div>
          <VisibleTimeSummary  {...this.props}/>
          <VisibleDayReference  {...this.props}/>
        </div>
	    )
    }
}

const VisibleMonthSummary = MonthSummary

export default VisibleMonthSummary


