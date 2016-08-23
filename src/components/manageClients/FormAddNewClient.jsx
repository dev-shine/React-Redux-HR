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
    this.setState({open: true});
  }
  handleClose(){
    this.setState({open: false});
  }
  addNewClient(){
    this.props.callAddNewClient({
      client_name : this.state.client_name,
      client_address : this.state.client_address
    })
  }
  componentWillReceiveProps( props ){
    this.setState({
      //client_name : props.clienDetails.name,
      //client_address : props.clienDetails.address
    })
  }
  render(){
    return (
      <div>
      <RaisedButton label="Add Client" onTouchTap={this.handleOpen} />
        <Dialog
          title="Add New Client"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <TextField
          hintText="Client Name"
          fullWidth={true}
          onChange={ (e) => ( this.setState({ client_name : e.target.value  })) }
        />
        <br/>
        <TextField
          multiLine={true}
          hintText="Client Address"
          fullWidth={true}
          onChange={ (e) => ( this.setState({ client_address : e.target.value  })) }
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


