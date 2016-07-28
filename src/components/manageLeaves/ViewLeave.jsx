import React from 'react';
import * as _ from 'lodash'

class ViewLeave extends React.Component {
    constructor( props ){
		  super( props );
      
    }
    _leaveStatusSelectBoxOptions( status ){
      let statusList = [ "Approved", "Pending", "Rejected" , "Cancelled" ]
      
      let soptions = _.map( statusList, ( s, k  ) => {
        let selected = ""
        if(  s == status ){
          selected  = "selected"
        }
        return <option value={s} key={k}  >{s}</option>
      })

      return soptions

    }

    _getChangeStatusButtons( leaveid, status ){
      let statusList = [ "Approved", "Pending", "Rejected" , "Cancelled" ]
      
      let soptions = _.map( statusList, ( s, k  ) => {

        let leaveStatusColor = ""

        if( s == 'Approved'){
          leaveStatusColor = "green-A200"
        }else if(s == 'Pending'){
          leaveStatusColor = "blue"
        }else if( s == 'Rejected'){
          leaveStatusColor = "red-500"
        }else if( s == 'Cancelled'){
          leaveStatusColor = "red-100"
        }

        if(  s == status ){
          
        }else{
          return <button  key={k}className={`md-btn md-raised ${leaveStatusColor}`} onClick={ () => this.props.doLeaveStatusChange( leaveid, s ) } >Mark {s}</button> 
        }
        
      })

      return soptions

    }


    _getLastAppliedLeaves( dd ){

      let prev_leaves = _.map( dd, ( d, k  ) => {
          
          return( 
               <div className="sl-item b-info"  key={k}>
                  <div className="sl-content">
                    <div className="sl-date text-muted">  Applied On  : {d.applied_on}</div>
                    <div className="sl-date text-muted">  {d.from_date} to {d.to_date} / No of Days : {d.no_of_days}</div>
                    <div>
                      {d.status} - {d.reason}
                    </div>
                  </div>
                </div>
          )
        })

      return (

             <div className="box-body">
            <div className="streamline b-l m-l">
                {prev_leaves}
                
            </div>
        </div>

        )
    }
    
    render(){


      let styles = _.cloneDeep(this.constructor.styles);

      let leaveStatusColor = ""
      if( this.props.listLeaves.selectedLeave.status == 'Approved'){
        leaveStatusColor = "green-A200"
      }else if( this.props.listLeaves.selectedLeave.status == 'Pending'){
        leaveStatusColor = "blue"
      }else if( this.props.listLeaves.selectedLeave.status == 'Rejected'){
        leaveStatusColor = "red-500"
      }else if( this.props.listLeaves.selectedLeave.status == 'Cancelled'){
        leaveStatusColor = "red-100"
      }

      let changeStatusButton = this._getChangeStatusButtons(  this.props.listLeaves.selectedLeave.id, this.props.listLeaves.selectedLeave.status )

      let status_select_box_options = this._leaveStatusSelectBoxOptions( this.props.listLeaves.selectedLeave.status )


      let sel_box = <select defaultValue={this.props.listLeaves.selectedLeave.status} ref="leavestatus" onChange={ () => this.props.doLeaveStatusChange( this.props.listLeaves.selectedLeave.id, this.refs.leavestatus.value ) }>{status_select_box_options}</select>


      let key = parseInt( this.props.keyval )


      //previoud leaves
      let last_applied_leaves = this.props.listLeaves.selectedLeave.last_applied_leaves
      let last_applied_leaves_html = ""
      if( typeof last_applied_leaves != 'undefined' && last_applied_leaves.length > 0 ){
        let aa  = this._getLastAppliedLeaves( this.props.listLeaves.selectedLeave.last_applied_leaves )
        last_applied_leaves_html = <div><hr/><h5>Previous Leaves</h5>{aa}</div>

          
      }

      

      return (
          <div className="item">
    <div className="item-bg">
      
    </div>
    <div className="p-a-md">
      <div className="row m-t">
        <div className="col-sm-4">
          <a href="" className="pull-left m-r-md">
            <span className="avatar w-96">
              <img src={this.props.listLeaves.selectedLeave.user_profile_image}/>
            </span>
          </a>
          <div className="clear m-b">
            <h3 className="m-a-0 m-b-xs">{this.props.listLeaves.selectedLeave.user_profile_name}</h3>
            <p className="text-muted"><span className="m-r">{this.props.listLeaves.selectedLeave.user_profile_jobtitle}</span></p>
          </div>
        </div>
        <div className="col-sm-8">
            <h5>Status - {this.props.listLeaves.selectedLeave.status}</h5>
            <p className="text-md profile-status" >Applied On {this.props.listLeaves.selectedLeave.applied_on}</p>
            <p className="text-md profile-status" >{this.props.listLeaves.selectedLeave.from_date} To {this.props.listLeaves.selectedLeave.to_date}</p>
            <p className="text-md profile-status" >No. of Days - {this.props.listLeaves.selectedLeave.no_of_days}</p>
            <p className="text-md profile-status" >Reason - {this.props.listLeaves.selectedLeave.reason}</p>
            {changeStatusButton}
            {last_applied_leaves_html}
        </div>
      </div>
    </div>
  </div>
         
	    )
    }
}

ViewLeave.styles = {
  leaveDiv: {
    'marginBottom' : '10px'
  }
};



export default ViewLeave


