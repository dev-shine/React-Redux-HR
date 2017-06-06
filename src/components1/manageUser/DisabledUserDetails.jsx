import React from 'react';

const DisabledUserDetails = ({ userDetails, changeEmployeeStatus, prop }) => {
  return (
    <div className="tab-content">
      <div className="tab-pane p-v-sm active">
        <div className="row m-b">
          <div className="col-xs-6">
            <small className="text-muted">Name</small>
            <div className="_500">{userDetails.name === null ? '' : userDetails.name}</div>
          </div>
          <div className="col-xs-6">
            <small className="text-muted">Job Title</small>
            <div className="_500">{userDetails.jobtitle === null ? '' : userDetails.jobtitle}</div>
          </div>
        </div>
        <div className="row m-b">
          <div className="col-xs-6">
            <small className="text-muted">Date Of Joining</small>
            <div className="_500">{userDetails.dateofjoining === null ? '' : userDetails.dateofjoining}</div>
          </div>
          <div className="col-xs-6">
            <small className="text-muted">Work Email</small>
            <div className="_500">{userDetails.work_email === null ? '' : userDetails.work_email}</div>
          </div>
        </div>
        <div className="row m-b">
          <div className="col-xs-6">
            <small className="text-muted">Other Email</small>
            <div className="_500">{userDetails.other_email === null ? '' : userDetails.other_email}</div>
          </div>
          <div className="col-xs-6">
            <small className="text-muted">Gender</small>
            <div className="_500">{userDetails.gender === null ? '' : userDetails.gender}</div>
          </div>
        </div>
        <div className="row m-b">
          <div className="col-xs-6">
            <small className="text-muted">Date Of Birth</small>
            <div className="_500">{userDetails.dob === null ? '' : userDetails.dob}</div>
          </div>
          <div className="col-xs-6">
            <small className="text-muted">Marital Status</small>
            <div className="_500">{userDetails.marital_status === null ? '' : userDetails.marital_status}</div>
          </div>
        </div>
        <div className="row m-b">
          <div className="col-xs-6">
            <small className="text-muted">Permanent Address</small>
            <div className="_500">{userDetails.permanent_address === null ? '' : userDetails.permanent_address}</div>
          </div>
          <div className="col-xs-6">
            <small className="text-muted">Mobile Number</small>
            <div className="_500">{userDetails.mobile_ph === null ? '' : userDetails.mobile_ph}</div>
          </div>
        </div>
        <div className="row m-b">
          <div className="col-xs-6">
            <small className="text-muted">Emergency Contact Information 1</small>
            <div className="_500">{userDetails.emergency_ph1 === null ? '' : userDetails.emergency_ph1}</div>
          </div>
          <div className="col-xs-6">
            <small className="text-muted">Emergency Contact Information 2</small>
            <div className="_500">{userDetails.emergency_ph2 === null ? '' : userDetails.emergency_ph2}</div>
          </div>
        </div>
        <div className="row m-b">
          <div className="col-xs-6">
            <small className="text-muted">Blood Group</small>
            <div className="_500">{userDetails.blood_group === null ? '' : userDetails.blood_group}</div>
          </div>
          <div className="col-xs-6">
            <small className="text-muted">Any Medical Conditions</small>
            <div className="_500">{userDetails.medical_condition === null ? '' : userDetails.medical_condition}</div>
          </div>
        </div>
        <div className="row m-b">
          <div className="col-xs-6">
            <small className="text-muted">Pan Card Number</small>
            <div className="_500">{userDetails.pan_card_num === null ? '' : userDetails.pan_card_num}</div>
          </div>
          <div className="col-xs-6">
            <small className="text-muted">Type</small>
            <div className="_500">{userDetails.type === null ? '' : userDetails.type}</div>
          </div>
        </div>
        <div className="row m-b">
          <div className="col-xs-6">
            <small className="text-muted">User Id</small>
            <div className="_500">{userDetails.user_Id === null ? '' : userDetails.user_Id}</div>
          </div>
          <div className="col-xs-6">
            <small className="text-muted">User Name</small>
            <div className="_500">{userDetails.username === null ? '' : userDetails.username}</div>
          </div>
        </div>
        <div className="row m-b">
          <div className="col-xs-6">
            <small className="text-muted">Zip code</small>
            <div className="_500">{userDetails.zip_postal === null ? '' : userDetails.zip_postal}</div>
          </div>
          <div className="col-xs-6">
            <small className="text-muted">Special Instructions</small>
            <div className="_500">{userDetails.special_instructions === null ? '' : userDetails.special_instructions}</div>
          </div>
        </div>
        <div className="row m-b">
          <div className="col-xs-6">
            <small className="text-muted">Status</small>
            <div className="_500">{userDetails.status == null ? '' : <span className="label rounded primary">{userDetails.status}</span>}</div>
          </div>
          <div className="col-xs-6">
            <div className="col-md-12 text-right">
              <button
                className="btn btn-fw btn-success"
                onTouchTap={() => { changeEmployeeStatus(userDetails.user_Id, 'Enabled'); }}
              >Enable</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisabledUserDetails;
