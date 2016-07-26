import React from 'react';
import * as _ from 'lodash'

class LeavesListLeave extends React.Component {
    constructor( props ){
		super( props );
    }
    _leaveStatusSelectBox( status ){
      let statusList = [ "Approved", "Pending", "Rejected" , "Cancelled" ]
      
      let soptions = _.map( statusList, ( s  ) => {
        let selected = ""
        if(  s == status ){
          selected  = "selected"
        }
        return <option value={s}  >{s}</option>
      })

      let sbox =<select defaultValue={status} >{soptions}</select>

      return sbox

    }
    render(){

      let leaveStatusColor = ""
      if( this.props.leave.status == 'Approved'){
        leaveStatusColor = "primary"
      }else if( this.props.leave.status == 'Pending'){
        leaveStatusColor = "blue"
      }else if( this.props.leave.status == 'Rejected'){
        leaveStatusColor = "red-500"
      }else if( this.props.leave.status == 'Cancelled'){
        leaveStatusColor = "red-100"
      }

      let status_select_box = this._leaveStatusSelectBox( this.props.leave.status )


      return (

        <tr>
              <td >{status_select_box}</td>
              <td className={leaveStatusColor}>{this.props.leave.username}</td>
              <td className={leaveStatusColor}>{this.props.leave.applied_on}</td>
              <td className={leaveStatusColor}>{this.props.leave.from_date}</td>
              <td className={leaveStatusColor}>{this.props.leave.to_date}</td>
              <td className={leaveStatusColor}>{this.props.leave.no_of_days}</td>
              <td className={leaveStatusColor}>{this.props.leave.reason}</td>
              
            </tr>
	     	
	    )
    }
}



export default LeavesListLeave


