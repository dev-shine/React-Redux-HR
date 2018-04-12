import React, { Component } from "react";
import { CONFIG } from "src/config/index";
import { notify } from "src/services/notify";
import { getToken } from "src/services/generic";
import UploadImageComp from "../../uploadImageCompressed/UploadImageComp";
import { browserHistory } from "react-router";

export default class FormAddDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doc_type: "",
      user_token: "",
      file: [],
      filelist: []
    };

    this.handleFileChange = this.handleFileChange.bind(this);
    this.callUpdateDocuments = this.callUpdateDocuments.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.toggleCollapse);
  }

  callUpdateDocuments(e) {
    let type = this.state.doc_type;
    let link1 = this.refs.file.value;
    let file = this.state.file[0];
    let userId = this.props.params.splat;
    let stop = false;
    if (!userId) {
      stop = true;
      notify("Warning!", "Please select a User.", "warning");
    } else if (type === "") {
      stop = true;
      notify("Warning!", "Please select document type.", "warning");
    } else if (link1 === "") {
      stop = true;
      notify("Warning!", "Please select a file", "warning");
    } else if (file.size > 5000000) {
      stop = true;
      notify("Warning!", "File doc_typesize must be less than 5mb", "warning");
    }
    if (stop) {
      e.preventDefault();
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      user_token: getToken()
    });
  }
  handleFileChange(e) {
    this.setState({ file: Array.from(e.target.files) });
  }
  render() {
    const userId = this.props.params.splat;
    return (
      <div className="row p-t-md">
        <div className="col-sm-offset-3 col-sm-6 p-x-md">
          <h6 id="uploadMyDoc" className="text-center pointer">
            Upload Documents
          </h6>
          <div className="row box p-a-md m-b-lg " id="uploadDoc">
            <form encType="multipart/form-data">
              <div className="form-group">
                <label className="col-sm-12">Document Type</label>
                <select
                  className="form-control"
                  ref="doc_type"
                  onChange={() =>
                    this.setState({ doc_type: this.refs.doc_type.value })
                  }
                  value={this.state.doc_type}
                >
                  <option value="">--- Select Doc Type ---</option>
                  <option value="CV">CV</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Address Proof">Address Proof</option>
                  <option value="Photo">Photo</option>
                  <option value="Offer Letter">Offer Letter</option>
                  <option value="Appointment Letter">Appointment Letter</option>
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
                  <option value="Other Documents">Other Documents</option>
                </select>
              </div>
              <input type="hidden" name="token" value={this.state.user_token} />
              <input type="hidden" name="user_id" value={userId} />
              <input
                type="hidden"
                name="document_type"
                value={this.state.doc_type}
              />
              {/* <input type="hidden" name="page_url" value={pageUrl} /> */}
              <div className="form-group">
                <label className="col-sm-12">Attachment </label>
                <input
                  type="file"
                  className="form-control"
                  ref="file"
                  name="link_1"
                  multiple="multiple"
                  onChange={this.handleFileChange}
                />
              </div>
              <div className="form-group col-sm-12">
                <UploadImageComp
                  callUpdateDocuments={this.callUpdateDocuments}
                  url={CONFIG.upload_url}
                  file={this.state.file[0]}
                  doc_type={this.state.doc_type}
                />
              </div>
            </form>
          </div>
          <button
            className="col-xs-4 col-xs-offset-4 md-btn md-raised indigo"
            onClick={browserHistory.goBack}
          >
            {" "}
            Go Back
          </button>
        </div>
      </div>
    );
  }
}
