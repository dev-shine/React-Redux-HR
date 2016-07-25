import React from 'react';
class Holiday extends React.Component {
    constructor( props ){
		super( props );
    }
    render(){
      let holiday_text = this.props.holiday.name
      let holiday_date = this.props.holiday.date
    	return (

        <tr>
              <td>{this.props.holiday.month}</td>
              <td>{holiday_date}</td>
              <td>{holiday_text}</td>
              
            </tr>
	     	
	    )
    }
}



export default Holiday


