import React from 'react';
import PropTypes from 'prop-types';
import {ButtonRaised, ButtonInfo} from 'components/generic/buttons';


const MyLeavesList = ({leave, handleOpen, cancelLeave}) => {
  let s = leave.status;
  let f_char = s.charAt(0);
  let leaveStatusColor = '';
  if (s == 'Approved') {
    leaveStatusColor = 'green-A200';
  } else if (s == 'Pending') {
    leaveStatusColor = 'blue';
  } else if (s == 'Rejected') {
    leaveStatusColor = 'red-500';
  } else if (s == 'Cancelled Request') {
    leaveStatusColor = 'red-100';
  }

  return (
    <div className={`list-item b-l b-l-2x b-${leaveStatusColor}`}>
      <div className="list-left">
        <span className={`w-40 avatar ${leaveStatusColor}`}>
          {f_char}
        </span>
      </div>
      <div className="list-body">
        <div className="pull-right text-muted text-xs">
        </div>
        <div>
          <span className="_500">Status : {leave.status}</span>
        </div>
        <div>
          <span className="_500">Apply on : {leave.applied_on}</span>
        </div>
        <div>
          <span className="_500">From {leave.from_date} to {leave.to_date}</span>
          &nbsp;&nbsp;&nbsp;<span className="label cyan">{leave.no_of_days} Day</span>
          <span className="label cyan" style={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => cancelLeave(leave.user_Id, leave.from_date)}>Cancel</span>
        </div>
        <div className="text-ellipsis text-muted text-sm">Reason : {leave.reason}</div>
        {
          leave.leave_type != ''
          ? <div className="text-ellipsis text-muted text-sm">Leave Type : {leave.leave_type}</div>
          : null
        }
        {
          leave.late_reason != ''
          ? <div className="text-ellipsis text-muted text-sm">Reason For Late Applying : {leave.late_reason}</div>
          : null
        }
        {
          leave.comment != ''
          ? <div className="text-ellipsis text-muted text-sm">comment : {leave.comment}</div>
          : null
        }
      </div>
      {
        leave.doc_require != '0'
        ? <div className='row m-0'>
          <div className='col-sm-3 p-0 pt-5'>
            <div className="text-right" style={{marginTop: '10px'}}>
              <ButtonInfo onClick={() => {handleOpen(leave.id) }} label="Upload Leave Documents"/>
            </div>
          </div>
          <div className='col-sm-3 p-0'>
            {
              leave.doc_link == '' ? null : <form method="get" target="_blank" action={leave.doc_link}>
                <div className=" text-left" style={{marginTop: '10px'}}>
                  <ButtonRaised className="indigo" label="View Document" />
                </div>
              </form>
            }
          </div>
        </div>
      : null
      }
    </div>
  )
}

MyLeavesList.PropTypes = {
  leave: PropTypes.object.isRequired,
  handleOpen: PropTypes.func.isRequired,
  cancelLeave: PropTypes.func.isRequired
}

export default MyLeavesList;
