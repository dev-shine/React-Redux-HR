import React from "react";
import * as _ from "lodash";
import Dialog from "material-ui/Dialog";
import { notify } from "src/services/notify";
import { getToken } from "src/services/generic";
import { CONFIG } from "src/config/index";
import style from "/home/etech/Documents/ReactReduxHR/src/styles/inventory/viewUser.scss";
import Lightbox from "react-images";
import FlatButton from "material-ui/FlatButton";
import UploadImageComp from "../../uploadImageCompressed/UploadImageComp";

export default class DialogUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory_id: this.props.inventory_id,
      token: "",
      inventory_files: "inventory_files",
      photoImage: "",
      warrantyImage: "",
      inoviceImage: "",
      document: "",
      file: [],
      fileName: "",
      page_url: window.location.href
    };
    this.documentType = this.documentType.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.callUpdateDocuments = this.callUpdateDocuments.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({
      token: getToken(),
      photoImage: props.manageDevice.deviceHistory.fileInventoryPhoto,
      warrantyImage: props.manageDevice.deviceHistory.fileInventoryWarranty,
      inoviceImage: props.manageDevice.deviceHistory.fileInventoryInvoice
    });
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  handleFileChange(e) {
    this.setState({ file: Array.from(e.target.files) });
  }
  documentType() {
    if (this.state.document === "photo") {
      this.setState({
        fileName: "inventory_photo"
      });
    } else if (this.state.document === "warranty") {
      this.setState({
        fileName: "inventory_warranty"
      });
    } else if (this.state.document === "inovice") {
      this.setState({
        fileName: "inventory_invoice"
      });
    }
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
  handleInlargeInovice() {
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
              onChange={e => (
                this.setState({ document: e.target.value }), this.documentType()
              )}
            >
              <option value="" disabled>
                --Select document--
              </option>
              <option value="photo">Photo</option>
              <option value="warranty">Warranty</option>
              <option value="inovice">Inovice</option>
            </select>
          </div>
          <div className="form-group">
            <label className="col-sm-12">Attachment </label>
            <input
              type="file"
              className="form-control"
              ref="file"
              name={this.state.fileName}
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
          >
            <img src={path + this.state.photoImage} />
          </Dialog>
        </div>
        <div className="form-group">
          {this.state.inoviceImage ? (
            <div>
              {" "}
              <img
                src={path + this.state.inoviceImage}
                onClick={() => {
                  this.handleInlargeInovice();
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
          >
            <img src={path + this.state.inoviceImage} />
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
          >
            <img src={path + this.state.warrantyImage} />
          </Dialog>
        </div>
        <UploadImageComp
            callUpdateDocuments={this.callUpdateDocuments}
            url={CONFIG.inventory_upload_url}
            params={this.state}
            file={this.state.file[0]}
            fileName={this.state.fileName}
          />
      </div>
    );
  }
}
