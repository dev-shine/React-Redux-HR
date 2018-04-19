import React from "react";
import * as _ from "lodash";
import Dialog from "material-ui/Dialog";
import { notify } from "src/services/notify";
import { getToken } from "src/services/generic";
import { CONFIG } from "src/config/index";
import style from "src/styles/inventory/viewUser.scss";
import FlatButton from "material-ui/FlatButton";
import UploadImageComp from "../../uploadImageCompressed/UploadImageComp";

export default class DialogUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory_id: this.props.inventory_id,
      token: "",
      file_upload_action: "inventory_files",
      inventory_invoice: "",
      inventory_warranty: "",
      inventory_photo: "",
      page_url: window.location.href,
      document: "",
      file: [],
      photoImage: "",
      warrantyImage: "",
      invoiceImage: ""
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.callUpdateDocuments = this.callUpdateDocuments.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({
      token: getToken(),
      photoImage: props.manageDevice.deviceHistory.fileInventoryPhoto,
      warrantyImage: props.manageDevice.deviceHistory.fileInventoryWarranty,
      invoiceImage: props.manageDevice.deviceHistory.fileInventoryInvoice
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  handleFileChange(e) {
    this.setState({ file: Array.from(e.target.files) });
  }

  callUpdateDocuments(e) {
    let link1 = this.refs.status.value;
    let stop = false;
    let document = this.state.document;
    if (document === "") {
      stop = true;
      notify("Warning!", "Please select document type.", "warning");
    } else if (link1 === "") {
      stop = true;
      notify("Warning!", "Please select a file", "warning");
    }

    if (stop) {
      e.preventDefault();
    }
  }
  handleInlargePhoto() {
    this.setState({
      open: true,
      open3: true,
      open2: false,
      open1: false
    });
  }
  handleInlargeInvoice() {
    this.setState({
      open: true,
      open3: false,
      open2: true,
      open1: false
    });
  }
  handleInlargeWarranty() {
    this.setState({
      open: true,
      open3: false,
      open2: false,
      open1: true
    });
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    console.table(this.state);
    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];
    let path = CONFIG.view_inventory_documents;
    return (
      <div>
        <h2>Inventory Files</h2>
        <form
          action={CONFIG.inventory_upload_url}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="form-group">
            {"Upload Documents"}
            <select
              className="form-control"
              ref="status"
              value={this.state.document}
              onChange={e => this.setState({ document: e.target.value })}
            >
              <option value="" disabled>
                --Select document--
              </option>
              <option value="inventory_photo">Photo</option>
              <option value="inventory_warranty">Warranty</option>
              <option value="inventory_invoice">Inovice</option>
            </select>
          </div>
          <div className="form-group">
            <label className="col-sm-12">Attachment </label>
            <input
              type="file"
              className="form-control"
              ref="file"
              name={this.state.document}
              multiple="multiple"
              onChange={this.handleFileChange}
            />
          </div>
        </form>
        <div className="form-group">
          {this.state.photoImage ? (
            <div>
              <img
                src={path + this.state.photoImage}
                onClick={() => {
                  this.handleInlargePhoto();
                }}
                className="small"
              />
              <br />
            </div>
          ) : null}
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open && this.state.open3}
            onRequestClose={this.handleClose}
            autoScrollBodyContent = {true}
          >
            <div className="thumbnail">
              <img src={path + this.state.photoImage} />
            </div>
          </Dialog>
        </div>

        <div className="form-group">
          {this.state.warrantyImage ? (
            <div>
              {" "}
              <img
                src={path + this.state.warrantyImage}
                onClick={() => {
                  this.handleInlargeWarranty();
                }}
                className="small"
              />
              <br />
            </div>
          ) : null}
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open && this.state.open1}
            onRequestClose={this.handleClose}
            autoScrollBodyContent = {true}
          >
            {" "}
            <div className="thumbnail">
              <img src={path + this.state.warrantyImage} />
            </div>
          </Dialog>
        </div>
        <div className="form-group">
          {this.state.invoiceImage ? (
            <div>
              {" "}
              <img
                src={path + this.state.invoiceImage}
                onClick={() => {
                  this.handleInlargeInvoice();
                }}
                className="small"
              />
              <br />
            </div>
          ) : null}
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.open && this.state.open2}
            onRequestClose={this.handleClose}
            autoScrollBodyContent = {true}
          >
            <div className="thumbnail">
              <img src={path + this.state.invoiceImage} />
            </div>
          </Dialog>
        </div>
        <UploadImageComp
          callUpdateDocuments={this.callUpdateDocuments}
          url={CONFIG.inventory_upload_url}
          params={this.state}
          file={this.state.file[0]}
          fileName={this.state.document}
        />
      </div>
    );
  }
}
