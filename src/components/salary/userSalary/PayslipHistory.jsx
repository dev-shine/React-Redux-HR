import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { dateFormatter } from "src/helper/helper";

const PayslipHistory = ({ payslip_history }) => {
  console.log(payslip_history);
  
  let previousPayslips = _.map(payslip_history, (d, key) => {
    return (
      <tr key={key}>
        <td>
          {dateFormatter().fullMonths[parseInt(d.month) - 1]} , {d.year}
        </td>
        <td>{d.total_leave_taken}</td>
        <td>{d.leave_balance}</td>
        <td>{d.allocated_leaves}</td>
        <td>{d.paid_leaves}</td>
        <td>{d.unpaid_leaves}</td>
        <td>{d.final_leave_balance}</td>
        <td>
          {parseInt(d.status) !== 0 ? <a href={`${d.payslip_url}`} target="_BLANK">View Payslip</a> : ''}
        </td>
      </tr >
  /* <div className="" key={key} >
        <div className="col-sm-12">
          <div className="col-sm-1">
          <div className="col-sm-12">
            {dateFormatter().fullMonths[parseInt(d.month) - 1]} , {d.year}</div>
          </div>
          <div className="col-sm-1">
            <div className="col-sm-12">{d.total_leave_taken}</div>
          </div>
          <div className="col-sm-2">
            <div className="col-sm-12">{d.leave_balance}</div>
          </div>
          <div className="col-sm-2">
            <div className="col-sm-12">{d.allocated_leaves}</div>
          </div>
          <div className="col-sm-2">
            <div className="col-sm-12">{d.paid_leaves}</div>
          </div>
          <div className="col-sm-2">
            <div className="col-sm-12">{d.unpaid_leaves}</div>
          </div>
          <div className="col-sm-2">
            <div className="col-sm-12">{d.final_leave_balance}</div>
          </div>
            <div className="col-sm-12">
              {parseInt(d.status) !== 0 ? <a href={`${d.payslip_url}`} target="_BLANK">View Payslip</a> : ''}
            </div>
          </div>
        </div> */
        );
});

return (
  <div>
    <table className="table table-responsive" style={{overflow: "auto", overflowY: "hidden" }}>
      <thead>
        <tr>
          <td>Month</td>
          <td>Total Leave Taken</td>
          <td>Leave Balance</td>
          <td>Allocated Leaves</td>
          <td>Paid Leaves</td>
          <td>Unpaid Leaves</td>
          <td>Final Leave Balance</td>
        </tr>
      </thead>
      <tbody>
        {previousPayslips}
      </tbody>
    </table>
    {/* <div className="row">
            <b>
              <div className="col-sm-1">Month</div>
              <div className="col-sm-1">Total Leave Taken</div>
              <div className="col-sm-2">Leave Balance</div>
              <div className="col-sm-2">Allocated Leaves</div>
              <div className="col-sm-2">Paid Leaves</div>
              <div className="col-sm-2">Unpaid Leaves</div>
              <div className="col-sm-2">Final Leave Balance</div>
            </b>
            {previousPayslips}
          </div> */}
  </div>
);
      };

PayslipHistory.PropTypes = {
  payslip_history: PropTypes.array.isRequired
};

export default PayslipHistory;
