import React from "react";
import { CONFIG } from "src/config/index";
import { notify } from "src/services/notify";
import { getToken } from "src/services/generic";
import ListDocuments from "components/myDocuments/ListDocuments";
import UploadImageComp from "../../uploadImageCompressed/UploadImageComp";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";


class FormMyDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document_type: "",
      token: "",
      file: [],
      user_id: this.props.user_id,
      page_url: window.location.href
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.callUpdateDocuments = this.callUpdateDocuments.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }
  componentDidMount() {
    this.toggleCollapse();
    window.addEventListener("resize", this.toggleCollapse);
  }
  componentWillReceiveProps(props) {
    this.setState({
      token: getToken()
    });
  }
  handleFileChange(e) {
    this.setState({ file: Array.from(e.target.files) });
    const file = this.refs.file.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imageUrl: reader.result
      });
    };
    if (file) {
      reader.readAsDataURL(file);
      this.setState({
        imageUrl: reader.result
      });
    } else {
      this.setState({
        imageUrl: ""
      });
    }
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpen = () => {
    this.setState({open:true});
  }
  callUpdateDocuments(e) {
    let type = this.state.document_type;
    let link1 = this.refs.file.value;
    let file = this.state.file[0];
    let stop = false;
    if (type === "") {
      stop = true;
      notify("Warning!", "Please select document type.", "warning");
    } else if (link1 === "") {
      stop = true;
      notify("Warning!", "Please select a file", "warning");
    } else if (this.refs.declear.checked !== true) {
      stop = true;
      notify("Warning!", "Mark declearation before submit", "warning");
     } 
    // else if (file.size > 5000000) {
    //   stop = true;
    //   notify("Warning!", "File size must be less than 5mb", "warning");

    // }
    if (stop) {
      e.preventDefault();
    }
  }
  deleteDocument(docId) {
    this.props
      .onDeleteDocument(docId)
      .then(msg => {
        this.props.onGetMydocuments();
        notify("Success!", msg.toString(), "success");
      })
      .catch(err => {
        notify("Error!", err.toString(), "error");
      });
  }
  toggleCollapse() {
    if ($(window).width() > 767) {
      $("#uploadDoc").addClass("in");
      $("#uploadMyDoc").removeClass(
        "md-btn md-raised indigo auto-width-center"
      );
    } else {
      $("#uploadDoc").removeClass("in");
      $("#uploadMyDoc").addClass("md-btn md-raised indigo auto-width-center");
    }
  }
  render() {
    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];
    return (
      <div className="row p-t-md">
        <div className="col-sm-6 p-x-md">
          <h6
            id="uploadMyDoc"
            className="text-center pointer"
            data-toggle="collapse"
            data-target="#uploadDoc"
          >
            Upload New Documents
          </h6>
          <div className="row box p-a-md m-b-lg collapse" id="uploadDoc">

            <form
              action={CONFIG.upload_url}
              method="POST"
              encType="multipart/form-data"
            >
              <div className="form-group">
                <label className="col-sm-12">Document Type</label>
                <select
                  className="form-control"
                  ref="document_type"
                  onChange={() =>
                    this.setState({ document_type: this.refs.document_type.value })
                  }
                  value={this.state.document_type}
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
              <input
                type="hidden"
                name="document_type"
                value={this.state.document_type}
              />
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
                <input
                  type="checkbox"
                  ref="declear"
                  className="vertical-middle"
                />
                <span className="declaration">
                  <b>*IMPORTANT: </b>&nbsp;By uploading this document you
                  certify that these document are true and all information is
                  correct
                </span>
              </div>
              <div className = "form-group">
                  {this.state.file[0] ? (
                    <div>
                    <label className="col-xs-12">Image Preview </label>
                      <img
                        src={this.state.imageUrl}
                        onClick={() => {
                          this.handleOpen();
                        }}
                        className="small"
                      />
                      <br />
                    </div>
                  ) : null}
                  <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                  >
                    <div className="thumbnail">
                      <img src={this.state.imageUrl} />
                    </div>
                  </Dialog>
                  </div>
              <div className="form-group col-sm-12">
                <UploadImageComp
                  callUpdateDocuments={this.callUpdateDocuments}
                  url={CONFIG.upload_url}
                  params={this.state}
                  file = {this.state.file[0]}
                  fileName = "link_1"
                />
              </div>
            </form>
          </div>
        </div>
        <ListDocuments
          myDocuments={this.props.my_documents}
          deleteDocument={this.deleteDocument}
        />
      </div>
    );
  }
}

export default FormMyDocuments;
