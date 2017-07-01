import React from 'react';
import 'whatwg-fetch';
import * as _ from 'lodash';
var moment = require('moment');

const TeamDetailsRow = ({emp, keys}) => {
  if (_.isEmpty(emp.holdin_amt_detail)) {
    emp.holdin_amt_detail = <ul> </ul>;
  } else {
    emp.holdin_amt_detail = <ul>
      <li>Holding amount : {emp.holdin_amt_detail.holding_amt}</li>
      <li>Start date : {emp.holdin_amt_detail.holding_start_date}</li>
      <li>End date : {emp.holdin_amt_detail.holding_end_date}</li>
      <li>Reason : {emp.holdin_amt_detail.reason}</li>
    </ul>;
  }

  return (
    <tr key={keys}>
      <td><div className="list-left">
        <span className="w-40 avatar">
          <img src={emp.slack_image} />
        </span>
      </div></td>
      <td>{emp.name}</td>
      <td>{emp.jobtitle}</td>
      <td>{emp.salary_detail}</td>
      <td>{emp.holdin_amt_detail}</td>
      <td>{emp.holding_comments}</td>
      <td>{moment(emp.dateofjoining).format('Do MMMM YYYY')}</td>
      <td>{emp.no_of_days_join}</td>
      <td>{emp.team}</td>
      <td>{moment(emp.start_increment_date).format('Do MMMM YYYY')}</td>
    </tr>
  );
};
export default TeamDetailsRow;
