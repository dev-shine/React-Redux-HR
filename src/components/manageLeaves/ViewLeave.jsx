import React from 'react';
import * as _ from 'lodash'

class ViewLeave extends React.Component {
    constructor( props ){
		  super( props );
      
    }
   
    _getChangeStatusButtons( leaveid, status ){
      let statusList = [ "Approved", "Pending", "Rejected" ]
      
      let soptions = _.map( statusList, ( s, k  ) => {

        let leaveStatusColor = ""

        if( s == status ){

        }else if( s == 'Approved'){
          return <button key={k} className="md-btn md-raised green-A200" onClick={ () => this.props.doLeaveStatusChange( leaveid, s ) } >Mark Approved</button>
        }else if(s == 'Pending'){
          return <button  key={k} className="md-btn md-raised blue" onClick={ () => this.props.doLeaveStatusChange( leaveid, s ) } >Mark Pending</button>
        }else if( s == 'Rejected'){
          return <button key={k} className="md-btn md-flat m-b-sm text-danger" onClick={ () => this.props.doLeaveStatusChange( leaveid, s ) }>Mark Rejected</button>
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
            <h6 className="m-a-0 m-b-xs">{this.props.listLeaves.selectedLeave.user_profile_name}</h6>
            <div>{this.props.listLeaves.selectedLeave.user_profile_jobtitle}</div>
          </div>
        </div>
        <div className="col-sm-8">
            <div>Status - <i><b>{this.props.listLeaves.selectedLeave.status}</b>                                                                                                                    </i></div>
            <div>Applied On <i><b>{this.props.listLeaves.selectedLeave.applied_on}</b></i></div>
            <div><b>{this.props.listLeaves.selectedLeave.from_date} To {this.props.listLeaves.selectedLeave.to_date}</b></div>
            <div>No. of Days - <i><b>{this.props.listLeaves.selectedLeave.no_of_days}</b></i></div>
            <div>Reason - <i><b>{this.props.listLeaves.selectedLeave.reason}</b></i></div>
            <br/>
            <br/>
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


