import React from 'react';
class DayFutureWorking extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){
      let d = this.props.dayData

    	return (
    		 <div >
          <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
            <div className="fc-content">
              <span className="fc-time"><h5>{ d.date }</h5></span>
              <span className="fc-title"> { d.day }</span>
            </div>
          </div>
        </div>
	    )
    }
}

const VisibleDayFutureWorking = DayFutureWorking

export default VisibleDayFutureWorking


