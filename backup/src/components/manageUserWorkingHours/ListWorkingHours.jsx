import React from 'react';
import * as _ from 'lodash'

class ListWorkingHour extends React.Component {
    constructor( props ){
		  super( props );
      
    }
    render(){

      return (
        <div className="sl-item b-success">
          <div className="sl-icon">
            <i className="fa fa-check"></i>
          </div>
          <div className="sl-content">
            <div >{this.props.row.working_hours} Hours</div>
            <div >{this.props.row.date}</div>
            <div className="sl-date text-muted">
              Reason : {this.props.row.reason}
              
            </div>
          </div>
        </div>

	    )
    }
}

ListWorkingHour.styles = {
  leaveDiv: {
    'marginBottom' : '10px'
  }
};



export default ListWorkingHour


