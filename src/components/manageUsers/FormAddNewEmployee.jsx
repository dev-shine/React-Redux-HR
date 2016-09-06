import React, {PropTypes} from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class FormAddNewEmployee extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
      open: false,
      name : "",
      jobtitle : "",


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

        <button className="btn btn-fw info" onTouchTap={this.handleOpen} >Add New Employee</button>
        
        <Dialog
          title="Add New Employee"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className="text-danger">
           <i>*Create a slack profile first and enter email in Work Email</i>
        </div>
       
      


           <table className="table">
            <tbody>
            <tr>
              <td>
                <TextField
                  floatingLabelText="Date Of Joining"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (e) => ( this.setState({ jobtitle : e.target.value  })) }
                  value = {this.state.jobtitle}
                />
              </td>
              <td>
                <TextField
                  floatingLabelText="Name"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (e) => ( this.setState({ jobtitle : e.target.value  })) }
                  value = {this.state.jobtitle}
                />
                
              </td>

               <td>
                <TextField
                  floatingLabelText="Job Title"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (e) => ( this.setState({ jobtitle : e.target.value  })) }
                  value = {this.state.jobtitle}
                />
                
              </td>
              
            </tr>


            <tr>
              <td>
                <TextField
                  floatingLabelText="Gender"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (e) => ( this.setState({ jobtitle : e.target.value  })) }
                  value = {this.state.jobtitle}
                />
              </td>
               <td colSpan={2}>
                <TextField
                  floatingLabelText="Date Of Birth"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (e) => ( this.setState({ jobtitle : e.target.value  })) }
                  value = {this.state.jobtitle}
                />
              </td>
              
              
            </tr>


             <tr>
              <td>
                <TextField
                  floatingLabelText="UserName"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (e) => ( this.setState({ jobtitle : e.target.value  })) }
                  value = {this.state.jobtitle}
                />
              </td>
               <td colSpan={2}>
                <TextField
                  floatingLabelText="Work Email"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (e) => ( this.setState({ jobtitle : e.target.value  })) }
                  value = {this.state.jobtitle}
                />
              </td>
              
              
            </tr>


            </tbody>
            </table>














        
        <br/>
        <br/>
        <button className="col-md-12 md-btn md-raised m-b-sm indigo" onClick={this.addNewClient}>ADD</button>
      </Dialog>
    </div>
    )
  }
}

// FormAddNewEmployee.propTypes = {
//     client: React.PropTypes.object.isRequired,
//     selectedClientId : React.PropTypes.string.isRequired,
// };

export default FormAddNewEmployee


