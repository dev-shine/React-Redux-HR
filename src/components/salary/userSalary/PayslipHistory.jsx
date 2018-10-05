import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { dateFormatter } from "src/helper/helper";

const PayslipHistory = ({ payslip_history }) => {
  let previousPayslips = _.map(payslip_history, (d, key) => {
    return (
        <div className="row" key={key}>
          <div className="col-sm-1 w-15">
          <div className="col-sm-12 m-view">Month</div>
          <div className="col-sm-12">
            {dateFormatter().fullMonths[parseInt(d.month) - 1]} , {d.year}</div>
          </div>
          <div className="col-sm-1 w-13">
            <div className="col-sm-12 m-view">Total Leave Taken</div>
            <div className="col-sm-12">{d.total_leave_taken}</div>
          </div>
          <div className="col-sm-2 w-11">
            <div className="col-sm-12 m-view">Leave Balance</div>
            <div className="col-sm-12">{d.leave_balance}</div>
          </div>
          <div className="col-sm-2 w-13">
            <div className="col-sm-12 m-view">Allocated Leaves</div>
            <div className="col-sm-12">{d.allocated_leaves}</div>
          </div>
          <div className="col-sm-2 w-11">
          <div className="col-sm-12 m-view">Paid Leaves</div>
            <div className="col-sm-12">{d.paid_leaves}</div>
          </div>
          <div className="col-sm-2 w-11">
            <div className="col-sm-12 m-view">Unpaid Leaves</div>
            <div className="col-sm-12">{d.unpaid_leaves}</div>
          </div>
          <div className="col-sm-2 w-15">
            <div className="col-sm-12 m-view">Final Leave Balance</div>
            <div className="col-sm-12">{d.final_leave_balance}</div>
          </div>
          <div className="col-sm-2 w-11">
            <div className="col-sm-12 m-view">Payslips</div>
            <div className="col-sm-12">
              {parseInt(d.status) !== 0 ? <a href={`${d.payslip_url}`} target="_BLANK">View</a> : 'None'}
            </div>
          </div>
          </div>
        );
});

return (
    <div className="row content-payslips">
            <b>
              <div className="col-sm-1 l-view w-15">Month</div>
              <div className="col-sm-1 l-view w-13">Total Leave Taken</div>
              <div className="col-sm-2 l-view w-11">Leave Balance</div>
              <div className="col-sm-2 l-view w-13">Allocated Leaves</div>
              <div className="col-sm-2 l-view w-11">Paid Leaves</div>
              <div className="col-sm-2 l-view w-11">Unpaid Leaves</div>
              <div className="col-sm-2 l-view w-15">Final Leave Balance</div>
              <div className="col-sm-2 l-view w-11">Payslips</div>
            </b>
            <div className="payslip_row">
              {previousPayslips}
            </div>
          </div>
);
      };

PayslipHistory.PropTypes = {
  payslip_history: PropTypes.array.isRequired
};

export default PayslipHistory;
