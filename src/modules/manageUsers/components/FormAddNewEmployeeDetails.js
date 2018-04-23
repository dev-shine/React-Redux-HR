import React from "react";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { notify } from "src/services/notify";
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
    this.state = {
      user_id: "",
      permanent_address: "",
      emergency_ph1: "",
      emergency_ph2: "",
      blood_group: "",
      medical_condition: "",
      holding_comments: "",
      signature: ""
    };
    this.callAddNewEmployeeDetails = this.callAddNewEmployeeDetails.bind(this);
    this.handleSaveButton = this.handleSaveButton.bind(this);
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
    localStorage.setItem("signature", signaturePad.toDataURL('image/jpeg', 0.5));
    this.setState({
      signature:  signaturePad.toDataURL()
    },()=>{console.log(this.state.signature,'ooooooo');
    });
  }
  callAddNewEmployeeDetails(new_profile_details) {
    this.props.onAddNewUserDetails(new_profile_details).then(
      data => {
        notify("Success!!", data.message, "success");
        this.props.router.push(`/add_documents/${this.props.params.id}`);
      },
      error => {
        notify("error", error, "error");
      }
    );
  }
  render() {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header
            pageTitle={"Add New Employee Details"}
            showLoading={this.props.frontend.show_loading}
          />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="col-md-6 input-wrapper">
                <TextField
                  floatingLabelText="Permanent Address"
                  floatingLabelFixed
                  fullWidth
                  onChange={e =>
                    this.setState({ permanent_address: e.target.value })
                  }
                  value={this.state.permanent_address}
                />
              </div>
              <div className="col-md-6 input-wrapper">
                <TextField
                type="number"
                  floatingLabelText="Phone No"
                  floatingLabelFixed
                  fullWidth
                  onChange={e =>
                    this.setState({ emergency_ph1: e.target.value })
                  }
                  value={this.state.emergency_ph1}
                />
              </div>

              <div className="col-md-6 input-wrapper">
                <TextField
                type="number"
                  floatingLabelText="Emergency Contact No"
                  floatingLabelFixed
                  fullWidth
                  onChange={e =>
                    this.setState({ emergency_ph2: e.target.value })
                  }
                  value={this.state.emergency_ph2}
                />
              </div>
              <div className="col-md-6 input-wrapper">
                Blood Group
                <select
                  className="form-control"
                  ref="blood_group"
                  onChange={e => this.setState({ blood_group: e.target.value })}
                  value={this.state.blood_group}
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
              <div className="col-md-8 input-wrapper">
                <TextField
                  floatingLabelText="Any Medical issues in past/present"
                  floatingLabelFixed
                  fullWidth
                  onChange={e =>
                    this.setState({ medical_condition: e.target.value })
                  }
                  value={this.state.medical_condition}
                />
              </div>
              <div className="col-md-8 input-wrapper">
                <TextField
                  floatingLabelText="Any special joinining terms from employers"
                  floatingLabelFixed
                  fullWidth
                  onChange={e =>
                    this.setState({
                      holding_comments: e.target.value,
                      user_id: this.props.params.id
                    })
                  }
                  value={this.state.holding_comments}
                />
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
                  onClick={() => this.handleSaveButton()}
                  id="save"
                  label={"Save"}
                />
                <img src={this.state.signature}/>
                <div className="row p-y">
                  <ButtonRaised
                    className="col-xs-12 p-y-2 m-b-sm indigo"
                    onClick={() => this.callAddNewEmployeeDetails(this.state)}
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
    },
    onAddNewUserDetails: new_profile_details => {
      return dispatch(
        actionsManageUsers.addNewUserDetails(new_profile_details)
      );
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
  onAddNewUserDetails: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
};
