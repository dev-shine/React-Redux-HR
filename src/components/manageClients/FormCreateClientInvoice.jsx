import React, {PropTypes} from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Chip from 'material-ui/Chip'

class FormCreateClientInvoice extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
      open: false,
      client_name : "",
      client_address : "",
      curreny : "",
      due_date : "",
      items_array : [],
      item_description : "",
      item_unit_price : "",
      item_total_price : ""
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.addNewClient = this.addNewClient.bind(this)
    this.addNewInvoiceItem = this.addNewInvoiceItem.bind(this)
    this.deleteInvoiceItem = this.deleteInvoiceItem.bind(this)
  }
  handleOpen(){
    this.setState({open: true});
  }
  handleClose(){
    this.setState({open: false});
  }
  deleteInvoiceItem(){
    console.log('arun')
  }
  addNewClient(){
    this.props.callAddNewClient({
      client_name : this.state.client_name,
      client_address : this.state.client_address
    })
  }
  componentWillReceiveProps( props ){
    this.setState({
      client_name : props.clientName,
      client_address : props.clientAddress
    })
  }

  addNewInvoiceItem( ){
    let existingItems = this.state.items_array
    let newItem = {
      item_description : this.state.item_description,
      item_unit_price : this.state.item_unit_price,
      item_total_price : this.state.item_total_price
    }
    let newItems = existingItems
    newItems.push( newItem )
    this.setState({
      items_array : newItems
    })
  }
  render(){
    let ItemsList =  _.map( this.state.items_array, ( item, keyval ) => {
      return (
        <div>

          <Chip
            onRequestDelete={this.deleteInvoiceItem}
          >
            Item : <b>{item.item_description}</b><br/>
            Unit Price : <b>{item.item_unit_price}</b><br/>
            Total Price : <b>{item.item_total_price}</b><br/>
          </Chip>
          
        </div>
      )
    })

    return (
      <div>
            <Dialog
              title="Create Client Invoice"
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >


            <div className="row">
              
              <div className="col-md-6 b-r">  

                <TextField
              floatingLabelText="Client Name"
              floatingLabelFixed={true}
              fullWidth={true}
              defaultValue={this.state.client_name}
              onChange={ (e) => ( this.setState({ client_name : e.target.value  })) }
            />
            <br/>
            <TextField
              floatingLabelText="Client Address"
              floatingLabelFixed={true}
              defaultValue={this.state.client_address}
              multiLine={true}
              fullWidth={true}
              onChange={ (e) => ( this.setState({ client_address : e.target.value  })) }
            />
            <br/>
            <TextField
              floatingLabelText="Currency"
              floatingLabelFixed={true}
              fullWidth={true}
              onChange={ (e) => ( this.setState({ curreny : e.target.value  })) }
            />
            <br/>
            Due Date
            <DatePicker 
              hintText="Due Date" 
              fullWidth={true}
              onChange={ (e) => ( this.setState({ due_date : e.target.value  })) }
            />

              </div>              
              
            







            <div className="col-md-6">

              {ItemsList}

              <h7>Add Invoice Item</h7>


                <TextField
              floatingLabelText="Item Description"
              floatingLabelFixed={true}
              fullWidth={true}
              onChange={ (e) => ( this.setState({ item_description : e.target.value  })) }
            />
            <br/>
            <TextField
              floatingLabelText="Unit Price"
              floatingLabelFixed={true}
              multiLine={true}
              fullWidth={true}
              onChange={ (e) => ( this.setState({ item_unit_price : e.target.value  })) }
            />
            <br/>
            <TextField
              floatingLabelText="Total Price"
              floatingLabelFixed={true}
              fullWidth={true}
              onChange={ (e) => ( this.setState({ item_total_price : e.target.value  })) }
            />

            <button className="col-md-12 md-btn md-raised m-b-sm primary" onClick={this.addNewInvoiceItem}>Add Item</button>
            
            
            
              </div>                

            
        </div>



            
            <br/>
            <br/>
            <button className="col-md-12 md-btn md-raised m-b-sm indigo" onClick={this.addNewClient}>ADD</button>
          </Dialog>
          
          
          <button className="btn btn-fw info" onTouchTap={this.handleOpen} >Create Client Invoice</button>
            
    </div>
    )
  }
}

// FormCreateClientInvoice.propTypes = {
//     client: React.PropTypes.object.isRequired,
//     selectedClientId : React.PropTypes.string.isRequired,
// };

export default FormCreateClientInvoice


