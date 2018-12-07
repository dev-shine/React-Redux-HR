import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CONFIG } from "../../../config/index";
import Menu from "../../../components/generic/Menu";
import { isNotUserValid } from "../../../services/generic";
import Header from "../../../components/generic/Header";
import { withRouter } from "react-router";
import * as actions from "../../../redux/actions";
import * as actionsUsersList from "../../../redux/generic/actions/usersList";
import * as actionsManageUsers from "../../../redux/manageUsers/actions/manageUsers";

class UserDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.props.onIsAlreadyLogin();
    this.state = {
      doc_type: "Adhaar Card",
      file: []
    };

    this.handleFileChange = this.handleFileChange.bind(this);
  }
  handleSkip(e) {
    if (this.state.doc_type == "Adhaar Card") {
      this.setState({
        doc_type: "PAN Card"
      });
    } else if (this.state.doc_type == "PAN Card") {
      this.setState({
        doc_type: "Passport"
      });
    } else {
      this.setState({
        doc_type: "Adhaar Card"
      });
    }
  }
  handleFileChange(e){
      this.setState({
          file: Array.from(e.target.files)
      })
      
  }

  handleUpload(e){
      e.preventDefault();
    //   fetch()

  }
  render() {
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header
            pageTitle={"User Documents"}
            showLoading={this.props.frontend.show_loading}
          />
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row p-y">
                <div className="col-sm-6 p-x p-y p-x-md">
                  <h6 id="uploadMyDoc" className="col-sm-12">
                    Upload New Documents
                  </h6>
                  <div className="row box p-a-md m-b-lg" id="uploadDoc">
                    <form
                      action={CONFIG.upload_url}
                      method="POST"
                    //   encType="multipart/form-data"
                    >
                      <div className="form-group">
                        <label className="col-sm-12">
                          Document Type : {this.state.doc_type}
                        </label>
                        {/* <select
                          className="form-control"
                          ref="doc_type"
                          //   onChange={() =>
                          //     this.setState({ doc_type: this.refs.doc_type.value })
                          //   }
                          //   value={this.state.doc_type}
                        >
                          <option value="">--- Select Doc Type ---</option>
                          <option value="CV">CV</option>
                          <option value="PAN Card">PAN Card</option>
                          <option value="Address Proof">Address Proof</option>
                          <option value="Photo">Photo</option>
                          <option value="Offer Letter">Offer Letter</option>
                          <option value="Appointment Letter">
                            Appointment Letter
                          </option>
                          <option value="Previous Company Experience Letter">
                            Previous Company Experience Letter
                          </option>
                          <option value="Previous Company Offer Letter">
                            Previous Company Offer Letter
                          </option>
                          <option value="Previous Company Salary Slip">
                            Previous Company Salary Slip
                          </option>
                          <option value="Previous Company Other Documents">
                            Previous Company Other Documents
                          </option>
                          <option value="Qualification Certificate">
                            Qualification Certificate
                          </option>
                          <option value="Other Documents">
                            Other Documents
                          </option>
                        </select> */}
                      </div>
                      <input
                        type="hidden"
                        name="token"
                        value={this.state.user_token}
                      />
                      <input
                        type="hidden"
                        name="user_id"
                        //   value={userId}
                      />
                      <input
                        type="hidden"
                        name="document_type"
                        value={this.state.doc_type}
                      />
                      <input
                        type="hidden"
                        name="page_url"
                        //   value={pageUrl}
                      />
                      <div className="form-group">
                        <label className="col-sm-12">Attachment </label>
                        <input
                          type="file"
                          className="form-control"
                          ref="file"
                          name="link_1"
                          onChange={(e) => this.handleFileChange(e)}
                        />
                      </div>
                      <div className="form-group col-sm-12">
                        <input
                          type="checkbox"
                          ref="declear"
                          className="vertical-middle"
                        />
                        <span className="declaration">
                          <b>*IMPORTANT: </b>&nbsp;By uploading this document
                          you certify that these document are true and all
                          information is correct
                        </span>
                      </div>
                      <div className="form-group col-sm-12">
                        <input
                          type="submit"
                          name="submit"
                          value="Upload"
                          className="col-xs-4 md-btn md-raised indigo"
                            onClick={(e) => {
                              this.handleUpload(e);
                            }}
                        />
                        <div className="col-xs-4" />
                        <input
                          type="button"
                          name="submit"
                          value="Skip"
                          className="col-xs-4 md-btn md-raised indigo"
                          onClick={(e)=> {
                            this.handleSkip(e);
                          }}
                        />
                      </div>
                    </form>
                  </div>
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

const UserDocumentDetails = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserDocuments)
);

export default UserDocumentDetails;

UserDocumentDetails.PropTypes = {
  onIsAlreadyLogin: PropTypes.func.isRequired,
  usersList: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};
