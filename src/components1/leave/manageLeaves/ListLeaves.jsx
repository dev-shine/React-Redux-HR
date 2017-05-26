import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

const styles = {
  leaveDiv: {
    'marginBottom': '10px'
  },
  scroll: {
  'display': 'block',
  'maxHeight': '100%',
  'overflow': 'scroll',
  }
}
const ListLeaves = ({listItems, selectedLeave, selectLeave}) => {
  let LeavesList = _.map(listItems, (leave, key) => {
    let leaveStatusColor = '';
    let selectedDivClass = '';
    if (leave.status == 'Approved') {
      leaveStatusColor = 'green-A200'
    } else if (leave.status == 'Pending') {
      leaveStatusColor = 'blue'
    } else if (leave.status == 'Rejected') {
      leaveStatusColor = 'red-500'
    }
    if (leave.id === selectedLeave.id) {
      selectedDivClass = 'yellow';
    }
    return (
      <div key={key} className={`list-item pointer b-l b-l-2x b-${leaveStatusColor} ${selectedDivClass}`} style={styles.leaveDiv} onClick={() => selectLeave(leave.id)}>
        <div className="list-left">
          <span className="w-40 avatar">
            <img src={leave.user_profile_image} className="img-circle" />
          </span>
        </div>
        <div className="list-body">
          {leave.user_profile_name}
          <small className="block">
            Applied on : {leave.applied_on}
          </small>
        </div>
      </div>
    )
  })
  return (
    <div className="row-col" style={styles.scroll}>
      <div className="list inset">
        {LeavesList}
      </div>
    </div>
  )
}

ListLeaves.PropTypes = {
  listItems: PropTypes.array.isRequired,
  selectedLeave: PropTypes.object.isRequired,
  selectLeave: PropTypes.func.isRequired
}

export default ListLeaves;
