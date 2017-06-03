import React from 'react';

const DisplayUserBankDetails = ({ userBankDetails }) => {
  if (userBankDetails !== null) {
    return (
      <div>
        <h6 className="text-center">Bank Details</h6>
        <br />
        <ul className="list-group m-b">
          <li className="list-group-item">
            <div className="clear">
              <div className="_500 block">{userBankDetails.bank_name}</div>
              <span className="text-muted">Bank Name</span>
            </div>
          </li>
          <li className="list-group-item">
            <div className="clear">
              <div className="_500 block">{userBankDetails.bank_account_no}</div>
              <span className="text-muted">Bank Account Number</span>
            </div>
          </li>
          <li className="list-group-item">
            <div className="clear">
              <div className="_500 block">{userBankDetails.ifsc}</div>
              <span className="text-muted">IFSC Code</span>
            </div>
          </li>
          <li className="list-group-item">
            <div className="clear">
              <div className="_500 block">{userBankDetails.bank_address}</div>
              <span className="text-muted">Bank Address</span>
            </div>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h6 className="text-center">Bank Details</h6>
        <br />
        <ul className="list-group m-b">
          <li className="list-group-item">
            <div className="clear">
              <div className="_500 block">Not Updated</div>
              <span className="text-muted">Bank Name</span>
            </div>
          </li>
          <li className="list-group-item">
            <div className="clear">
              <div className="_500 block">Not Updated</div>
              <span className="text-muted">Bank Account Number</span>
            </div>
          </li>
          <li className="list-group-item">
            <div className="clear">
              <div className="_500 block">Not Updated</div>
              <span className="text-muted">IFSC Code</span>
            </div>
          </li>
          <li className="list-group-item">
            <div className="clear">
              <div className="_500 block">Not Updated</div>
              <span className="text-muted">Bank Address</span>
            </div>
          </li>
        </ul>
      </div>
    );
  }
};

export default DisplayUserBankDetails;
