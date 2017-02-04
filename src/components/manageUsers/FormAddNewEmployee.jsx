import React, {PropTypes} from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'


class FormAddNewEmployee extends React.Component {
  constructor( props ){
    super( props );
    this.state = {
      open: false,
      dateofjoining : "",
      name : "",
      jobtitle : "",
      gender : "",
      dob : "",
      username : "",
      workemail : "",
      training : ""
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleOpen(){
    this.setState({
      open: true,
      dateofjoining : "",
      name : "",
      jobtitle : "",
      gender : "",
      dob : "",
      username : "",
      workemail : "",
      trainig : ""
    });
  }
  handleClose(){
    this.setState({open: false});
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
          contentStyle={ {width: '70%',maxWidth: 'none'}}
          autoScrollBodyContent={true}>

          <div className="text-danger">
           <i>*Create a slack profile first and enter email in Work Email</i>
        </div>
        <div className="text-info">
           *Default password is : java@123
        </div>




           <table className="table">
            <tbody>
            <tr>
              <td>
                Date of Joining
                <DateField
                  dateFormat="YYYY-MM-DD"
                  onChange={ ( date ) => { this.setState({ dateofjoining : date }) }}
                  className="form-control"/>
              </td>

               <td colSpan={2}>
                Date of Birth
                <DateField
                  dateFormat="YYYY-MM-DD"
                  onChange={ ( date ) => { this.setState({ dob : date }) }}
                  className="form-control"/>

              </td>
            </tr>

        <tr>
            <td>
                Trainig Period
                <select className="form-control" ref="gender" onChange={ () => this.setState({ training : this.refs.trainig.value }) } value={this.state.training} >
                <option value="">-Select Month-</option>
                <option value="tm0">0</option>
                <option value="tm1">1</option>
                <option value="tm2">2</option>
                <option value="tm3">3</option>
                <option value="tm4">4</option>
              </select>
            </td>

            <td>
                 Gender
                  <select className="form-control" ref="gender" onChange={ () => this.setState({ gender : this.refs.gender.value }) } value={this.state.gender} >
                  <option value="">--Select gender--</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>

              </td>

            </tr>


          <tr>
              <td>
                <TextField
                  floatingLabelText="Name"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (e) => ( this.setState({ name : e.target.value  })) }
                  value = {this.state.name}/>

              </td>

               <td>
                <TextField
                  floatingLabelText="Job Title"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (e) => ( this.setState({ jobtitle : e.target.value  })) }
                  value = {this.state.jobtitle}/>
              </td>
            </tr>

             <tr>
              <td>
                <TextField
                  floatingLabelText="UserName"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (e) => ( this.setState({ username : e.target.value  })) }
                  value = {this.state.username}/>
              </td>

               <td colSpan={2}>
                <TextField
                  floatingLabelText="Work Email"
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={ (e) => ( this.setState({ workemail : e.target.value  })) }
                  value = {this.state.workemail}/>
              </td>
            </tr>


            </tbody>
            </table>

        <br/>
        <br/>
        <button className="col-md-12 md-btn md-raised m-b-sm indigo" onClick={ () => this.props.callAddNewEmployee( this.state ) } >Add Employee</button>
        <br/>
        <br/>
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
