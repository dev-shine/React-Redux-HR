import React from 'react';
class DayWorking extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){
      let d = this.props.dayData
    	let d_date = d.date;

      let date_div  = <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
            <div className="fc-content">
              <span className="fc-time"><h5>{ d_date }</h5></span>
              <span className="fc-title"> { d.day }</span>
            </div>
          </div>;

      let work_time_div =  <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable center">
            <div className="fc-content">
              { d.total_time} - Total Work Time
              
            </div>
          </div>

      

      if( d.admin_alert == 1 ){
        d_date = d_date + ' * '
        date_div  = <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end indigo fc-draggable">
            <div className="fc-content">
              <span className="fc-time"><h5>{ d_date }</h5></span>
              <span className="fc-title"> { d.day }</span>
            </div>
          </div>;



        work_time_div =  <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable center">
            <div className="fc-content">
              {d.admin_alert_message}
              
            </div>
          </div>
      }

      let extraTime = ''
    if( d.extra_time_status == '-' ){
        extraTime = <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end red fc-draggable">
            <div className="fc-content">
              <span className="fc-time">  { d.extra_time }</span>
              <span className="fc-title"></span>
            </div>
          </div>

      }else if( d.extra_time_status == '+' ){
        extraTime = <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end green fc-draggable">
            <div className="fc-content">
              <span className="fc-time">  { d.extra_time }</span>
              <span className="fc-title"></span>
            </div>
          </div>

      }
    	return (
    		 <div  data-toggle="modal" data-target="#modalUserDaySummary"  onClick={ () => this.props.showDaySummary(this.props.userid, this.props.dayData.full_date ) } >
          
          {date_div}
          
          <div className="fc-day-grid-event fc-h-event fc-event fc-start fc-end white fc-draggable">
            <div className="fc-content">
              <span className="fc-time">  { d.in_time } - { d.out_time}  </span>
              <span className="fc-title"> Work Time </span>
            </div>
          </div>

         {work_time_div}

          {extraTime}

          

          
        </div>
	    )
    }
}

export default DayWorking


