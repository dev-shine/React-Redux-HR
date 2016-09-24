import React from 'react';
class DayLeave extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){
      let d = this.props.dayData

    	return (
        <div >
          
          <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
            <div className="fc-content">
              <span className="fc-time"><h5>{ d.date }</h5></span>
              <span className="fc-title"> { d.day }</span>
            </div>
          </div>
          
          <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
            <div className="fc-content">
              <span className="fc-time"> On Leave</span>
              <span className="fc-title"></span>
            </div>
          </div>

          <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
            <div className="fc-content">
              <span className="fc-time"> { d.day_text } </span>
              <span className="fc-title"></span>
            </div>
          </div>
          
        </div>
    		  
	    )
    }
}

export default DayLeave


