import React, {PropTypes} from 'react';
import * as _ from 'lodash'

import Dialog from 'material-ui/Dialog';


class InvoicesList extends React.Component {
    constructor( props ){
        super( props );
    }
    render(){
      let invoicesList =  _.map( this.props.invoicesList , ( invoice, keyval ) => {

        let itemsDesc = _.map( invoice.items, (item, keyvl) => {
          return (
            <div key={keyvl}>- { item.item_description} <b>( {invoice.currency}{ item.item_total_price }</b> )</div>
          )
        })
        return (
          
            <div className="box b-b b-r b-l" key={keyval}>
              <div className="box-header grey-200">
                <h3>
                  Created Date : { invoice.created_on} | Due Date : { invoice.due_date}
                </h3>
                <div className="box-tool">
                  <h3>{invoice.currency}{ invoice.total_amount}</h3>
                </div>
              </div>
              <div className="box-body">
                  {itemsDesc}
                  <br/>
                  <div className="row">
                    <div className="col-md-6">
                      <a href={`${invoice.file_address}`} target="_BLANK" className="md-btn md-flat m-b-sm text-accent">View Invoice</a> 
                    </div>
                    <div className="col-md-6 text-right">
                      <button className="md-btn md-flat m-b-sm text-danger" onClick={()=> this.props.callDeleteInvoice( invoice.id ) }>Delete Invoice</button>
                    </div>
                  </div>
              </div>
            </div>
        )
      })

      return (
        <div className="m-t">
          {invoicesList}
        </div>
      )
    }
}
// InvoicesList.propTypes = {
//     clients: React.PropTypes.array.isRequired,
//     selectedClientId : React.PropTypes.any.isRequired,
// };

export default InvoicesList


