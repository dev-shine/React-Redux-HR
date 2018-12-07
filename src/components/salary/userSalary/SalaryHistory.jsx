import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const SalaryHistory = ({data, viewSalarySummary}) => {
  let salaryHistoryHtml = _.map(data, (d, key) => {
    return (
      <div id={'slip'+key} className="sl-item b-info"  key={key}  onClick={ () => viewSalarySummary( d.test.id ) } style={{'cursor':"pointer"}}>
        <div className="sl-content">
          <div className="sl-date text-muted">  Applicable From  : {d.test.applicable_from}</div>
          <div className="sl-date text-muted"> Updated on : {d.test.last_updated_on} </div>
          <div>
               <b>Rs.{d.test.total_salary} </b>
          </div>
        </div>
      </div>
    )
  });
  return (
    <div id="salary_revisions">
      <div className="box-body">
        <div className="streamline b-l m-l">
          {salaryHistoryHtml}
        </div>
      </div>
    </div>
  )
}

SalaryHistory.PropTypes = {
  data: PropTypes.array.isRequired,
  viewSalarySummary: PropTypes.func.isRequired
}
export default SalaryHistory;
