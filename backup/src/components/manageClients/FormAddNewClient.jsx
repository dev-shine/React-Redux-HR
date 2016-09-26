import React, {PropTypes} from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class FormAddNewClient extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
      open: false,
      client_name : "",
      client_address : ""
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.addNewClient = this.addNewClient.bind(this)
  }
  handleOpen(){
    this.setState({
      open: true,
      client_name : "",
      client_address : ""
    });
  }
  handleClose(){
    this.setState({open: false});
  }
  addNewClient(){
    this.props.callAddNewClient({
      client_name : this.state.client_name,
      client_address : this.state.client_address,
      open : false
    })
  }
  componentWillReceiveProps( props ){
    
  }
  render(){
    return (
      <div>

        <button className="btn btn-fw info" onTouchTap={this.handleOpen} >Add Client</button>
      
        <Dialog
          title="Add New Client"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <TextField
          floatingLabelText="Name"
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={ (e) => ( this.setState({ client_name : e.target.value  })) }
          value = {this.state.client_name}
        />
        <br/>
        <TextField
          multiLine={true}
          floatingLabelText="Address"
          floatingLabelFixed={true}
          fullWidth={true}
          onChange={ (e) => ( this.setState({ client_address : e.target.value  })) }
          value = {this.state.client_address}
        />
        <br/>
        <br/>
        <button className="col-md-12 md-btn md-raised m-b-sm indigo" onClick={this.addNewClient}>ADD</button>
      </Dialog>
    </div>
    )
  }
}

// FormAddNewClient.propTypes = {
//     client: React.PropTypes.object.isRequired,
//     selectedClientId : React.PropTypes.string.isRequired,
// };

export default FormAddNewClient


