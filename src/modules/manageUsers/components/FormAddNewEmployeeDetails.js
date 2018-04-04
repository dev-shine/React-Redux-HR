import React from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DateField } from "react-date-picker";
import ToggleButton from "react-toggle-button";
import "react-date-picker/index.css";
import { CONFIG } from "src/config/index";
import Button from "components/generic/buttons/Button";
import Menu from "components/generic/Menu";
import { isNotUserValid } from "src/services/generic";
import Header from "components/generic/Header";
import { withRouter } from "react-router";
import ButtonRaised from "components/generic/buttons/ButtonRaised";
import SignaturePad from "signature_pad";
import * as actions from "appRedux/actions";
import * as actionsUsersList from "appRedux/generic/actions/usersList";
import * as actionsManageUsers from "src/redux/manageUsers/actions/manageUsers";

let signaturePad;
class FormAddNewEmployeeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {};
  }
  handleCanvas() {
    signaturePad = new SignaturePad(document.getElementById("signature-pad"), {
      backgroundColor: "rgba(255, 255, 255, 0)",
      penColor: "rgb(0, 0, 0)"
    });
  }
  componentWillMount() {
    this.props.onUsersList();
  }
  handleCancelButton() {
    signaturePad.clear();
  }
  handleSaveButton() {
    localStorage.setItem("signature", signaturePad.toDataURL());
    console.log(localStorage.signature);
  }
  
  render() {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header
            pageTitle={"Add New Employee"}
            showLoading={this.props.frontend.show_loading}
          />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row">
                <div className="col-xs-12">
                  <div className="col-md-4 input-wrapper">
                    <TextField
                      floatingLabelText="Permanent Address"
                      floatingLabelFixed
                      fullWidth
                    />
                  </div>
                  <div className="col-md-4 input-wrapper">
                    <TextField
                      floatingLabelText="Phone No"
                      floatingLabelFixed
                      fullWidth
                    />
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="col-md-4 input-wrapper">
                    <TextField
                      floatingLabelText="Emergency Contact No"
                      floatingLabelFixed
                      fullWidth
                    />
                  </div>
                  <div className="col-md-4 input-wrapper">
                    Blood Group
                    <select className="form-control" ref="training_month">
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
                </div>
                {/* <div className="col-xs-12 p-y input-wrapper">
                  <div className="col-xs-4 input-wrapper">
                    2 photographs of new joinee
                  </div>
                  <div className="col-xs-4 md-p-x input-wrapper">
                    <ToggleButton />
                  </div>
                </div>
                <div className="col-xs-12 p-y input-wrapper">
                  <div className="col-xs-4 input-wrapper">Relieving letter</div>
                  <div className="col-xs-6 input-wrapper">
                    <ToggleButton />
                  </div>
                </div>
                <div className="col-xs-12 p-y input-wrapper">
                  <div className="col-xs-4 input-wrapper">Salary slip</div>
                  <div className="col-xs-4 input-wrapper">
                    <ToggleButton />
                  </div>
                </div>
                <div className="col-xs-12 p-y input-wrapper">
                  <div className="col-xs-4 input-wrapper">
                    Photograph of Address proof
                  </div>
                  <div className="col-xs-4 input-wrapper">
                    <ToggleButton />
                  </div>
                </div>
                <div className="col-xs-12 p-y input-wrapper">
                  <div className="col-xs-4 input-wrapper">
                    Photocopy of educational cerificates
                  </div>
                  <div className="col-xs-4 input-wrapper">
                    <ToggleButton />
                  </div>
                </div>
                <div className="col-xs-12 p-y input-wrapper">
                  <div className="col-xs-4 input-wrapper">Aadhar Card</div>
                  <div className="col-xs-4 input-wrapper">
                    <ToggleButton />
                  </div>
                </div>
                <div className="col-xs-12 p-y input-wrapper">
                  <div className="col-xs-4 input-wrapper">Pan Card</div>
                  <div className="col-xs-4 input-wrapper">
                    <ToggleButton />
                  </div>
                </div>
                <div className="col-xs-12 p-y input-wrapper">
                  <div className="col-xs-4 input-wrapper">
                    Signed offer Letter
                  </div>
                  <div className="col-xs-4 input-wrapper">
                    <ToggleButton />
                  </div>
                </div> */}
                <div className="col-md-8 input-wrapper">
                  <TextField
                    floatingLabelText="Any Medical issues in past/present"
                    floatingLabelFixed
                    fullWidth
                  />
                </div>
                <div className="col-md-8 input-wrapper">
                  <TextField
                    floatingLabelText="Any special joinining terms from employers"
                    floatingLabelFixed
                    fullWidth
                  />
                </div>
                <div className="col-md-8 input-wrapper">
                  <TextField
                    floatingLabelText="Any special joining requirements from candidates"
                    floatingLabelFixed
                    fullWidth
                  />
                </div>
              </div>
              <div className="col-md-8  input-wrapper">
                <label>Employee Signature</label>
                <p>(Double-tap and hold then start drawing your signature)</p>
                <canvas
                  id="signature-pad"
                  onClick={this.handleCanvas}
                  className="signature-pad"
                  style={{
                    width: "100%",
                    height: 200,
                    border: "1px solid rgba(80,80,80,0.6)"
                  }}
                />
                <ButtonRaised
                  onClick={this.handleCancelButton}
                  id="clear"
                  label={"Clear"}
                />
                <span> </span>
                <ButtonRaised
                  onClick={this.handleSaveButton}
                  id="save"
                  label={"Save"}
                />
                <div className="row p-y">
                  <ButtonRaised
                    className="col-xs-12 p-y-2 m-b-sm indigo"
                    // onClick={() => this.callAddNewEmployeeDetails()}
                    label={"Next"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    frontend: state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    manageUsers: state.manageUsers.toJS()
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onUsersList: () => {
      return dispatch(actionsUsersList.get_users_list());
    }
  };
};
const AddNewEmployeeDetails = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FormAddNewEmployeeDetails)
);

export default AddNewEmployeeDetails;

AddNewEmployeeDetails.PropTypes = {
  onIsAlreadyLogin: PropTypes.func.isRequired,
  usersList: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};
