import React, {PropTypes} from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Chip from 'material-ui/Chip'

import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'


class FormCreateClientInvoice extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
      open: false,
      client_id : "",
      client_name : "",
      client_address : "",
      currency : "",
      due_date : "",
      items_array : [],
      sub_total : 0,
      service_tax : 0,
      total_amount : 0,
      item_description : "",
      item_unit_price : "",
      item_total_price : ""
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this._addNewInvoiceItem = this._addNewInvoiceItem.bind(this)
    this._removeInvoiceItem = this._removeInvoiceItem.bind(this)
    this.createClientInvoice = this.createClientInvoice.bind(this)
  }
  handleOpen(){
    //reset state when opens
    this.setState({
      open: true,
      items_array : [],
      total_amount : 0
    });
  }
  handleClose(){
    this.setState({open: false});
  }
  _removeInvoiceItem( id ){
    let existingItems = this.state.items_array
    let new_items = _.filter( this.state.items_array, ( item, keyval ) => {
      if( keyval == id ){
        return false
      }else{
        return true
      }
    })
    //---
    let final_total_amount = 0
    _.map( new_items, ( item, keyval ) => {
      final_total_amount = +final_total_amount + +item.item_total_price
    })

    //---
    this.setState({
      items_array : new_items,
      sub_total : final_total_amount,
      total_amount : final_total_amount,
    })
  }
  createClientInvoice(){
    this.props.callCreateClientInvoice({
      client_id : this.state.client_id,
      client_name : this.state.client_name,
      client_address : this.state.client_address,
      currency : this.state.currency,
      items : this.state.items_array,
      sub_total : this.state.sub_total,
      service_tax : this.state.service_tax,
      total_amount : this.state.total_amount,
      due_date : this.state.due_date
    })
  }
  componentWillReceiveProps( props ){
    let open = this.state.open
    if( props.showForm != false ){
      open: false
    }

    this.setState({
      open: open,
      client_id : props.clientId,
      client_name : props.clientName,
      client_address : props.clientAddress,
    })
  }

  _addNewInvoiceItem( ){
    let item_total = this.state.item_total_price
    let new_total_amount = this.state.total_amount
    new_total_amount = +new_total_amount + +item_total

    let existingItems = this.state.items_array
    let newItem = {
      item_description : this.state.item_description,
      item_unit_price : this.state.item_unit_price,
      item_total_price : this.state.item_total_price
    }
    let newItems = existingItems
    newItems.push( newItem )
    this.setState({
      items_array : newItems,
      item_description : '',
      item_unit_price : '',
      item_total_price : '',
      total_amount : new_total_amount,
      sub_total : new_total_amount
    })
  }
  render(){

    let ItemsList =  _.map( this.state.items_array, ( item, keyval ) => {
      let num = keyval + 1
      return (
          <tr key={keyval}>
            <td>
              <button className="btn btn-icon white" onClick={() => {this._removeInvoiceItem( keyval )}}>
                <i className="fa fa-remove"></i>
              </button>
              {num}
            </td>
            <td>{item.item_description}</td>
            <td>{item.item_unit_price}</td>
            <td>{item.item_total_price}</td>
          </tr>
      )
    })

    return (
      <div >
            <Dialog
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              contentStyle={{width: '80%', maxWidth: 'none'}}
              autoScrollBodyContent={true}
            >


            <div className="row">


            <div className="col-md-4 b-r">  

               <div className="box">
                <div className="box-divider m-a-0"></div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        Due Date
                        <DateField dateFormat="YYYY-MM-DD" onChange={(d) => ( this.setState({ due_date : d}))} className="form-control"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <TextField
                            floatingLabelText="Currency"
                            floatingLabelFixed={true}
                            fullWidth={true}
                            onChange={ (e) => ( this.setState({ currency : e.target.value  })) }
                          />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <TextField
                          floatingLabelText="Client Name"
                          floatingLabelFixed={true}
                          fullWidth={true}
                          defaultValue={this.state.client_name}
                          onChange={ (e) => ( this.setState({ client_name : e.target.value  })) }
                        />
                      </td>
                    </tr>  
                    <tr>
                      <td>
                        <TextField
                          floatingLabelText="Client Address"
                          floatingLabelFixed={true}
                          defaultValue={this.state.client_address}
                          multiLine={true}
                          fullWidth={true}
                          onChange={ (e) => ( this.setState({ client_address : e.target.value  })) }
                        />
                      </td>
                    </tr>  
                    
                    
                  </tbody>
                </table>
              </div>


              </div>   






              
            
            <div className="col-md-4 b-r">


              <div className="box">
                <div className="box-header">
                  <h2>Add New Item</h2>
                </div>
                <div className="box-divider m-a-0"></div>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <TextField
                          floatingLabelText="Item Description"
                          floatingLabelFixed={true}
                          fullWidth={true}
                          onChange={ (e) => ( this.setState({ item_description : e.target.value  })) }
                          value={this.state.item_description}
                        />
                      </td>
                    </tr>  
                    <tr>
                      <td>
                        <TextField
                          floatingLabelText="Unit Price"
                          floatingLabelFixed={true}
                          multiLine={true}
                          fullWidth={true}
                          onChange={ (e) => ( this.setState({ item_unit_price : e.target.value  })) }
                          value={this.state.item_unit_price}
                        />
                      </td>
                    </tr>  
                    <tr>
                      <td>
                        <TextField
                          floatingLabelText="Total Price"
                          floatingLabelFixed={true}
                          fullWidth={true}
                          onChange={ (e) => ( this.setState({ item_total_price : e.target.value  })) }
                          value={this.state.item_total_price}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button className="btn btn-sm white primary pull-right" onClick={this._addNewInvoiceItem}>Add Invoice Item</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            
            
            
              </div>   


            <div className="col-md-4"> 
              

              <div className="box">
                <div className="box-header">
                  <h2>Invoice Details</h2>
                </div>
                <div className="box-divider m-a-0"></div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Qty</th>
                        <th>Item</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ItemsList}   
                      <tr>
                        <td colSpan="3" className="text-right"><i>Sub Total</i></td>
                        <td><b>{this.state.sub_total}</b></td>
                      </tr>  
                      <tr>
                        <td colSpan="3" className="text-right"><i>Service Tax</i></td>
                        <td><b>{this.state.service_tax}</b></td>
                      </tr>  
                      <tr>
                        <td colSpan="3" className="text-right"><i>Total Amount</i></td>
                        <td><b>{this.state.total_amount}</b></td>
                      </tr>  
                    </tbody>
                  </table>
                </div>

            </div>



             

            
        </div>



            
            <br/>
            <br/>
            <button className="pull-right md-btn md-raised m-b-sm indigo" onClick={this.createClientInvoice}>Generate Invoice</button>
          </Dialog>
          

          <div className="row">
            <div className="col-md-12"> 
              <button className="btn btn-fw info pull-right" onTouchTap={this.handleOpen} >New Client Invoice</button>
            </div>
          </div>
            
    </div>
    )
  }
}

// FormCreateClientInvoice.propTypes = {
//     client: React.PropTypes.object.isRequired,
//     selectedClientId : React.PropTypes.string.isRequired,
// };

export default FormCreateClientInvoice


