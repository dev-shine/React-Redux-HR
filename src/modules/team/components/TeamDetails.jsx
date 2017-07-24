import React from 'react';
import 'whatwg-fetch';
import * as _ from 'lodash';
var moment = require('moment');

const TeamDetails = ({teamList, team, fetchUserDetails}) => {
  const onSelectTeam = (emp) => {
    let selectedTeam = emp.target.value;
    fetchUserDetails(selectedTeam);
  };
  let teams = teamList && teamList.data || [];
  let teamData = team && team.data || [];
  let row = _.map(teamData, (emp, key) => {
    return (
      <tr key={key}>
        <td><div className="list-left">
          <span className="w-40 avatar">
            <img src={emp.slack_image} />
          </span>
        </div></td>
        <td>{emp.name}</td>
        <td>{emp.jobtitle}</td>
        <td>{emp.salary_detail}</td>
        <td>{emp.holdin_amt_detail !== ''
          ? <ul>
            <li>Holding amount : {emp.holdin_amt_detail.holding_amt}</li>
            <li>Start date : {emp.holdin_amt_detail.holding_start_date}</li>
            <li>End date : {emp.holdin_amt_detail.holding_end_date}</li>
            <li>Reason : {emp.holdin_amt_detail.reason}</li>
          </ul> : ''
        }</td>
        <td>{emp.holding_comments}</td>
        <td>{moment(emp.dateofjoining).format('Do MMMM YYYY')}</td>
        <td>{emp.no_of_days_join}</td>
        <td>{emp.team}</td>
        <td>{moment(emp.start_increment_date).format('Do MMMM YYYY')}</td>
      </tr>
    );
  });

  if (_.isEmpty(row)) {
    row = <tr><td colSpan="9"
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
