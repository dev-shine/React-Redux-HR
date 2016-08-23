import React, {PropTypes} from 'react';
import * as _ from 'lodash'


class InvoicesList extends React.Component {
    constructor( props ){
        super( props );
    }
    render(){
      let invoicesList =  _.map( this.props.invoicesList , ( invoice, keyval ) => {
        return (
            <div className="sl-item b-warning" key={keyval}>
              <div className="sl-content">
                <div>Status : { invoice.status}</div>
                <div className="sl-date text-muted">Created On - <b><i>{invoice.created_on}</i></b></div>
                <div className="sl-date text-muted">Due Date - <b><i>{invoice.due_date}</i></b></div>
                <div>Total Amount : {invoice.currency}{ invoice.total_amount}</div>
              </div>
            </div>
        )
      })
      return (
        <div className = "row">
          <h6 className="text-center">Invoices</h6>

          <div className="col-12">
            <div className="box">


              <div className="streamline b-l m-l">
                    {invoicesList}
                </div>
             
            </div>
          </div>
        </div>
      )
    }
}
// InvoicesList.propTypes = {
//     clients: React.PropTypes.array.isRequired,
//     selectedClientId : React.PropTypes.any.isRequired,
// };

export default InvoicesList


