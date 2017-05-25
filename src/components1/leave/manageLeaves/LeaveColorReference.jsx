import React from 'react';
import {CONFIG} from 'src/config/index';

const styles = {
  cursor: {
    'cursor': 'Pointer'
  },
  selectedTab: {
    'height': '3px',
    'background': '#008000',
    'borderRadius': '10px 10px 0px 0px',
  },
  nonSelectedTabs: {
    'height': '3px'
  }
}

const ManageLeavesRoot = ({filterLeaveList, selectedTab, logged_user}) => {
  if (logged_user.role === CONFIG.ADMIN) {
    return (
      <div className="row no-gutter m-b text-xs l-h-1x">
        <div className="col-xs-3 text-center" style={styles.cursor} onClick={() => filterLeaveList('ApprovedByHr')} >
          <div style={selectedTab === 'ApprovedByHr' ? styles.selectedTab : styles.nonSelectedTabs}></div>
          <div className="p-a blue">
            <h4></h4>
            <div className="text-u-c _600 text-sm" >Approved By HR</div>
          </div>
        </div>
        <div className="col-xs-3 text-center" style={styles.cursor} onClick={() => filterLeaveList('NotApprovedByHr')} >
          <div style={selectedTab === 'NotApprovedByHr' ? styles.selectedTab : styles.nonSelectedTabs}></div>
          <div className="p-a yellow-A200">
            <h4></h4>
            <div className=" text-u-c _600 text-sm" >Not Approved By HR</div>
          </div>
        </div>
        <div className="col-xs-3 text-center" style={styles.cursor} onClick={() => filterLeaveList('Approved')} >
          <div style={selectedTab === 'Approved' ? styles.selectedTab : styles.nonSelectedTabs}></div>
          <div className="p-a green-A200">
            <h4></h4>
            <div className=" text-u-c _600 text-sm" >Approved</div>
          </div>
        </div>
        <div className="col-xs-3 text-center" style={styles.cursor} onClick={() => filterLeaveList('Rejected')} >
          <div style={selectedTab === 'Rejected' ? styles.selectedTab : styles.nonSelectedTabs}></div>
          <div className="p-a red-500">
            <h4></h4>
            <div className="text-u-c _600 text-sm" >Rejected</div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="row no-gutter m-b text-xs l-h-1x">
      <div className="col-xs-4 text-center" style={styles.cursor} onClick={() => filterLeaveList('Pending')} >
        <div style={selectedTab === 'Pending' ? styles.selectedTab : styles.nonSelectedTabs}></div>
        <div className="p-a blue">
          <h4></h4>
          <div className="text-u-c _600 text-sm" >Pending Leave Requests</div>
        </div>
      </div>
      <div className="col-xs-3 text-center" style={styles.cursor} onClick={() => filterLeaveList('ApprovedByHr')} >
        <div style={selectedTab === 'ApprovedByHr' ? styles.selectedTab : styles.nonSelectedTabs}></div>
        <div className="p-a green-A200">
          <h4></h4>
          <div className=" text-u-c _600 text-sm" >Approved By HR</div>
        </div>
      </div>
    </div>
  )
}

export default ManageLeavesRoot;
