import React from 'react';
import 'whatwg-fetch';
import * as _ from 'lodash';
var moment = require('moment');
import TeamDetailsRow from './TeamDetailsRow';

const TeamDetails = ({teamListData, fetchUserDetails}) => {
  const onSelectTeam = (emp) => {
    let selectedTeam = emp.target.value;
    fetchUserDetails(selectedTeam);
  };
  let teams = teamListData && teamListData.teams || [];
  let row = _.map(teamListData.candidateByTeam, (emp, key) => {
    return (
      <TeamDetailsRow emp={emp} keys={key} />
    );
  });

  if (_.isEmpty(row)) {
    <tr><td colSpan="9"
      style={{'textAlign': 'center'}}>No any employee in this team</td>
  </tr>;
  }
  return (
    <div>
      <div className="row no-gutter">
        <div className="col-md-6 p-r">
          <div className="form-group">
            <label style={{'fontSize': 15}}>Select Team:</label>
            <select className="form-control"
              onChange={(emp) => onSelectTeam(emp)}>
              <option value="">--Select team--</option>
              {_.map(teams, (team, keys) => {
                return (<option key={keys} value={team}>{team}</option>);
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="box">
            <div className="box">
              <div className="box-divider m-a-0"></div>
              <div>
                <table className="table" >
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Employe name</th>
                      <th>Designation</th>
                      <th>Salary</th>
                      <th style={{'textAlign': 'center'}} >
                        Holding Amount Details
                      </th>
                      <th style={{'width': '100px'}}>Holding Comments</th>
                      <th>Date of Joining</th>
                      <th >No of Days Since Joined</th>
                      <th >Team</th>
                      <th >Last Increment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                      {row}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
