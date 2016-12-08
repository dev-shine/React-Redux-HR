import React from 'react';
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as _ from 'lodash'
import moment from 'moment'

const styles = {
};

class DisabledUserDetails extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
        }
    }
    componentWillReceiveProps( props ){
    		let userDetails = props.userDetails
    		this.setState({
    		})

    }
    render(){
      let userDetail = this.props.userDetails
      return (
          <div className="tab-content">
            <div className="tab-pane p-v-sm active">
              <div className="row m-b">
                <div className="col-xs-6">
                  <small className="text-muted">Name</small>
                  <div className="_500">{userDetail.name==null?"":userDetail.name}</div>
                </div>
                <div className="col-xs-6">
                  <small className="text-muted">Job Title</small>
                  <div className="_500">{userDetail.jobtitle==null?"":userDetail.jobtitle}</div>
                </div>
              </div>
              <div className="row m-b">
                <div className="col-xs-6">
                  <small className="text-muted">Date Of Joining</small>
                  <div className="_500">{userDetail.dateofjoining==null?"":userDetail.dateofjoining}</div>
                </div>
                <div className="col-xs-6">
                  <small className="text-muted">Work Email</small>
                  <div className="_500">{userDetail.work_email==null?"":userDetail.work_email}</div>
                </div>
              </div>
              <div className="row m-b">
                <div className="col-xs-6">
                  <small className="text-muted">Other Email</small>
                  <div className="_500">{userDetail.other_email==null?"":userDetail.other_email}</div>
                </div>
                <div className="col-xs-6">
                  <small className="text-muted">Gender</small>
                  <div className="_500">{userDetail.gender==null?"":userDetail.gender}</div>
                </div>
              </div>
              <div className="row m-b">
                <div className="col-xs-6">
                  <small className="text-muted">Date Of Birth</small>
                  <div className="_500">{userDetail.dob==null?"":userDetail.dob}</div>
                </div>
                <div className="col-xs-6">
                  <small className="text-muted">Marital Status</small>
                  <div className="_500">{userDetail.marital_status==null?"":userDetail.marital_status}</div>
                </div>
              </div>
              <div className="row m-b">
                <div className="col-xs-6">
                  <small className="text-muted">Permanent Address</small>
                  <div className="_500">{userDetail.permanent_address==null?"":userDetail.permanent_address}</div>
                </div>
                <div className="col-xs-6">
                  <small className="text-muted">Mobile Number</small>
                  <div className="_500">{userDetail.mobile_ph==null?"":userDetail.mobile_ph}</div>
                </div>
              </div>
              <div className="row m-b">
                <div className="col-xs-6">
                  <small className="text-muted">Emergency Contact Information 1</small>
                  <div className="_500">{userDetail.emergency_ph1==null?"":userDetail.emergency_ph1}</div>
                </div>
                <div className="col-xs-6">
                  <small className="text-muted">Emergency Contact Information 2</small>
                  <div className="_500">{userDetail.emergency_ph2==null?"":userDetail.emergency_ph2}</div>
                </div>
              </div>
              <div className="row m-b">
                <div className="col-xs-6">
                  <small className="text-muted">Blood Group</small>
                  <div className="_500">{userDetail.blood_group==null?"":userDetail.blood_group}</div>
                </div>
                <div className="col-xs-6">
                  <small className="text-muted">Any Medical Conditions</small>
                  <div className="_500">{userDetail.medical_condition==null?"":userDetail.medical_condition}</div>
                </div>
              </div>
              <div className="row m-b">
                <div className="col-xs-6">
                  <small className="text-muted">Pan Card Number</small>
                  <div className="_500">{userDetail.pan_card_num==null?"":userDetail.pan_card_num}</div>
                </div>
                <div className="col-xs-6">
                  <small className="text-muted">Type</small>
                  <div className="_500">{userDetail.type==null?"":userDetail.type}</div>
                </div>
              </div>
              <div className="row m-b">
                <div className="col-xs-6">
                  <small className="text-muted">User Id</small>
                  <div className="_500">{userDetail.user_Id==null?"":userDetail.user_Id}</div>
                </div>
                <div className="col-xs-6">
                  <small className="text-muted">User Name</small>
                  <div className="_500">{userDetail.username==null?"":userDetail.username}</div>
                </div>
              </div>
              <div className="row m-b">
                <div className="col-xs-6">
                  <small className="text-muted">Zip code</small>
                  <div className="_500">{userDetail.zip_postal==null?"":userDetail.zip_postal}</div>
                </div>
                <div className="col-xs-6">
                  <small className="text-muted">Special Instructions</small>
                  <div className="_500">{userDetail.special_instructions==null?"":userDetail.special_instructions}</div>
                </div>
              </div>
              <div className="row m-b">
                <div className="col-xs-6">
                  <small className="text-muted">Status</small>
                  <div className="_500">{userDetail.status==null?"":<span className="label rounded primary">{userDetail.status}</span>}</div>
                </div>
                <div className="col-xs-6">
                  <div className="col-md-12 text-right">
                    <button className="btn btn-fw btn-success" onTouchTap={()=>this.props.changeEmployeeStatus( userDetail.user_Id, 'Enabled' )} >Enable</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
    }
}

export default DisabledUserDetails
