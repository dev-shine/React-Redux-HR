import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

const InvoicesList = ({invoicesList, callDeleteInvoice}) => {
  let invoiceList = _.map(invoicesList, (invoice, keyval) => {
    let itemsDesc = _.map(invoice.items, (item, keyvl) => {
      return( <div key={keyvl}>- {item.item_description} <b>( {invoice.currency}{item.item_total_price}</b> )</div> );
    });
    return(
      <div className="box b-b b-r b-l" key={keyval}>
        <div className="box-header grey-200">
          <h4>Created Date : {invoice.created_on} | Due Date : {invoice.due_date}</h4>
          <div className="box-tool"><h4>{invoice.currency}{invoice.total_amount}</h4></div>
        </div>
        <div className="box-body">
          {itemsDesc}
          <br />
          <div className="row">
            <div className="col-md-6">
              <a href={`${invoice.file_address}`} target="_BLANK" className="md-btn md-flat m-b-sm text-accent">View Invoice</a>
            </div>
            <div className="col-md-6 text-right">
              <button className="md-btn md-flat m-b-sm text-danger" onClick={() => callDeleteInvoice(invoice.id)}>Delete Invoice</button>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return(
    <div className="m-t">{invoiceList}</div>
  );
}

export default InvoicesList;

InvoicesList.PropTypes = {
  invoicesList: PropTypes.object.isRequired,
  callDeleteInvoice: PropTypes.func.isRequired,
  invoice: PropTypes.shape({
    items: PropTypes.array,
    currency: PropTypes.string.isRequired,
    created_on: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    total_amount: PropTypes.string.isRequired,
    file_address: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};
