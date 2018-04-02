import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import {CONFIG} from 'src/config/index';
import {DateField} from 'react-date-picker';
import ToggleButton from 'react-toggle-button';
import 'react-date-picker/index.css';
import Button from 'components/generic/buttons/Button';
import ButtonRaised from 'components/generic/buttons/ButtonRaised';
import SignaturePad from 'signature_pad';


class FormAddNewEmployeeDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
    
  }  
  handleCanvas(){ 
    var signaturePad = new SignaturePad(document.getElementById('signature-pad'), {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      penColor: 'rgb(0, 0, 0)'
    });
    localStorage.setItem('signature', signaturePad.toDataURL());
    console.log(localStorage.signaturePad)
   }
 
  render () {
    
    return (
      
      <div>
        <Dialog
          title="Add New Employee"
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          contentClassName="add-new-emp-dialog dialog-add-role"
          titleClassName="title"
          bodyClassName="body"
          autoScrollBodyContent>
          <div className="row">
            <div className="col-xs-6 input-wrapper">
            <TextField
                floatingLabelText="Address"
                floatingLabelFixed fullWidth
              />
            </div>
            <div className="col-xs-6 input-wrapper">
              <TextField
                floatingLabelText="Contact No"
                floatingLabelFixed fullWidth
              />
            </div>
            <div className="col-xs-6 input-wrapper">
              <TextField
                floatingLabelText="Emergency Contact"
                floatingLabelFixed fullWidth
              />
            </div>
            <div className="col-xs-6 input-wrapper">
            Blood Group
              <select
                className="form-control"
                ref="training_month"
                >
                <option disabled>--select blood group--</option>
                <option value="0">B+ </option>
                <option value="1">O+</option>
                <option value="2">AB+</option>
                <option value="3">A+</option>
                <option value="4">B- </option>
                <option value="5">O-</option>
                <option value="6">AB-</option>
                <option value="7">A-</option>
              </select>
            </div>
            <div className="col-xs-12 input-wrapper">
            <div className="col-xs-6 input-wrapper">
                2 photographs of new joinee
            </div>
            <div className="col-xs-6 md-p-x input-wrapper">
              <ToggleButton
              />
            </div>
            </div>
            <div className="col-xs-12 input-wrapper">
            <div className="col-xs-6 input-wrapper">
                Relieving letter
            </div>
            <div className="col-xs-6 pull-right input-wrapper">
              <ToggleButton
              />
            </div>
            </div>
            <div className="col-xs-12 input-wrapper">
            <div className="col-xs-6 input-wrapper">
                Salary slip
            </div>
            <div className="col-xs-6 input-wrapper">
              <ToggleButton
              />
            </div>
            </div>
            <div className="col-xs-12 input-wrapper">
            <div className="col-xs-6 input-wrapper">
                Photograph of Address proof
            </div>
            <div className="col-xs-6 input-wrapper">
              <ToggleButton
              />
            </div>
            </div>
            <div className="col-xs-12 input-wrapper">
            <div className="col-xs-6 input-wrapper">
                Photocopy of educational cerificates
            </div>
            <div className="col-xs-6 input-wrapper">
              <ToggleButton
              />
            </div>
            </div>
            <div className="col-xs-12 input-wrapper">
            <div className="col-xs-6 input-wrapper">
                Aadhar Card
            </div>
            <div className="col-xs-6 input-wrapper">
              <ToggleButton
              />
            </div>
            </div>
            <div className="col-xs-12 input-wrapper">
            <div className="col-xs-6 input-wrapper">
                Pan Card
            </div>
            <div className="col-xs-6 input-wrapper">
              <ToggleButton
              />
            </div>
            </div>
            <div className="col-xs-12 input-wrapper">
            <div className="col-xs-6 input-wrapper">
                Signed offer Letter
            </div>
            <div className="col-xs-6 input-wrapper">
              <ToggleButton
              />
            </div>
            </div>
            <div className="col-xs-12 input-wrapper">
              <TextField
              floatingLabelText="Any Medical issues in past/present"
              floatingLabelFixed fullWidth
              />
            </div>
            <div className="col-xs-12 input-wrapper">
              <TextField
              floatingLabelText="Any special joinining terms from employers"
              floatingLabelFixed fullWidth
              />
            </div>
            <div className="col-xs-12 input-wrapper">
              <TextField
              floatingLabelText="An special joining requirements from candidates"
              floatingLabelFixed fullWidth
              />
            </div>
          </div>
          <label>Employee Signature</label>
            <canvas id="signature-pad" onClick={this.handleCanvas} className="signature-pad" style={{width:"100%" , height:200,border:"1px solid rgba(80,80,80,0.6)"}} >
            </canvas>
          <ButtonRaised
            className="col-xs-12 m-b-sm indigo"
            onClick={() => this.props.callAddNewEmployeeDetails()}
            label={'Add Employee'}
          />
        </Dialog>
      </div>
    );
  }
  
}

export default FormAddNewEmployeeDetails;