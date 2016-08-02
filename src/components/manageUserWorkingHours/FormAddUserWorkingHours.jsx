import React from 'react';
import * as _ from 'lodash'
import { Calendar } from 'react-date-range';

class FormAddUserWorkingHours extends React.Component {
    constructor( props ){
      super( props );
      this.state = {
        userid : "",
        date : "",
        working_hours : "",
        reason : "",
      }
      this.handleDateChange = this.handleDateChange.bind( this )
    }

    componentDidMount(){
      $('.timepickerInput').timepicker({
        'minTime': '5:00',
        'maxTime': '12:00',
        'timeFormat': 'h:i',
        'step': 15
      });
    }

    handleDateChange(date){
      let selectedDate = date.format('YYYY-MM-DD')
      this.setState({
        date : selectedDate
      })
    }
    
    componentWillReceiveProps( props ){
      this.setState({
        userid : props.userid
      })
    }
    
    render(){
      let styles = _.cloneDeep(this.constructor.styles);

      return (

            <div className="row no-gutter">
            <div className="col-xs-6 b-r">
              <div className="p-a block text-center" >
                <h6 className="">Select Date</h6>
                <Calendar onInit={this.handleDateChange}  onChange={this.handleDateChange}/>
              </div>
            </div>
            <div className="col-xs-6 b-r">
              <div className="p-a block" >
                  <h6>Selected Date </h6>
                  {this.state.date}
                  <br/>
                  <br/>

                  <h6>Select Time</h6>
                  <input type="text" className="timepickerInput" ref="workingtime"  onBlur={ () => this.setState({ working_hours : this.refs.workingtime.value }) } value={this.state.working_hours } />
<br/>
                  <br/>
                  <h6>Enter Reason</h6>
                  <input type="text" className="md-input" ref="reason" onChange={ () => this.setState({ reason : this.refs.reason.value }) } value={ this.state.reason }/>
<br/>
                  <br/>

                  <button  className="md-btn md-raised indigo" onClick={ () => this.props.callAddUserWorkingHours( this.state.userid, this.state.date, this.state.working_hours, this.state.reason ) } >Add</button>
                
              </div>
            </div>
            
           </div>


         
      )
    }
}

FormAddUserWorkingHours.styles = {
  leaveDiv: {
    'marginBottom' : '10px'
  }
};



export default FormAddUserWorkingHours


