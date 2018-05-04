import React, { Component } from "react";
import ImageCompressor from "image-compressor.js";
import { notify } from "src/services/notify";
import { connect } from "react-redux";
import { qualityValue } from "src/helper/helper";
import axios from "axios";
import CircularProgress from "material-ui/CircularProgress";
import * as actionsManageDevice from "appRedux/inventory/actions/inventory";
import * as actionsUploadFile from "appRedux/uploadImageComp/actions/uploadImageComp";
import * as actionMyDocuments from "appRedux/myDocuments/actions/myDocument";
import { format } from "url";
class UploadImageComp extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { params } = this.props;
    const file = this.props.file;
    const fileName = this.props.fileName; //the name must be same as in backend
    const url = this.props.url;

    if (!file) {
      return;
    } else if (!file.type.includes("image")) {
      const formData = new FormData();
      let isRole = this.props.loggedUser.data.role;

      for (let key in params) {
        formData.append(key, params[key]);
      }
      formData.delete('imageUrl');
      formData.append(fileName, file);
      formData.append("submit", "Upload");

      this.props.onUploadFile(formData, url,isRole);
    } else {
      this.setState({ loading: true });
      let quality = qualityValue(file);
      let imageCompressor = new ImageCompressor();
      imageCompressor
        .compress(file, {
          quality: quality
        })
        .then(file => {
          const formData = new FormData();
          for (let key in params) {
            formData.append(key, params[key]);
          }
          formData.delete('imageUrl'); //IMPORTANT: it is the image in ImagePreview  
          formData.append(fileName, file, file.name);
          formData.append("submit", "Upload");
          // Send the compressed image file to server with XMLHttpRequest.
          // this.props.uploadFile(formData, url);
          axios
            .post(url, formData)
            .then(data => {
              notify("Success !", `File uploaded successfully`, "success");
              this.setState({ loading: false });
              if (
                this.props.loggedUser.data.role === "Admin"
              ) {
                this.props.onFetchDevice();
                this.props.onFetchUnapprovedUser();
                this.props.onGetMyDocuments();
              }
              else if(this.props.loggedUser.data.role === "HR"
            ){
              return;
              // this.props.onFetchDevice();
            }
            else{
              this.props.onGetMyDocuments();
            }
            })
            .catch(error => {
              if (error.request.status === 413) {
                notify("Error", "File too large to upload", "error");
                this.setState({ loading: false });
              }
              else{
                notify("Error", error.request.statusText, "error");
                this.setState({ loading: false });
              }
            });
        });
    }
  }

  render() {
    return (
      <div>
        {this.props.loading || this.state.loading ? (
          <CircularProgress
            size={30}
            thickness={3}
            style={{ marginLeft: "50%" }}
          />
        ) : (
          <form onSubmit={this.handleSubmit}>
            <input
              type="submit"
              name="submit"
              value="Upload"
              className="col-xs-12 md-btn md-raised indigo"
              onClick={e => this.props.callUpdateDocuments(e)}
            />
          </form>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.uploadImage.loading,
  loggedUser: state.logged_user.userLogin
});
const mapDispatchToProps = dispatch => {
  return {
    onFetchDevice: () => {
      return dispatch(actionsManageDevice.get_machines_detail());
    },
    onUploadFile: () => {
      return dispatch(actionsUploadFile.uploadFile());
    },
    onFetchUnapprovedUser: () => {
      return dispatch(actionsManageDevice.unapprovedUser());
    },
    onGetMyDocuments: () => {
      return dispatch(actionMyDocuments.getMyDocument());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadImageComp);
