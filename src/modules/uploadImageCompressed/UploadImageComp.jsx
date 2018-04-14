import React, { Component } from "react";
import ImageCompressor from "image-compressor.js";
import { notify } from "src/services/notify";
import { connect } from "react-redux";
import { uploadFile } from "appRedux/uploadImageComp/actions/uploadImageComp";
import { qualityValue } from "src/helper/helper";
import axios from "axios";
import CircularProgress from "material-ui/CircularProgress";

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
    const fileName = this.props.fileName;
    const url = this.props.url;

    if (!file) {
      return;
    } 
    else if (!file.type.includes("image")) {
      const formData = new FormData();
      for (let key in params) {
        formData.append(key, params[key]);
      }
      formData.append(fileName, file);
      formData.append("submit", "Upload");

      this.props.uploadFile(formData, url);
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
          formData.append(fileName, file, file.name);
          formData.append("submit", "Upload");
          // Send the compressed image file to server with XMLHttpRequest.
          // this.props.uploadFile(formData, url);
          axios
            .post(url, formData)
            .then(data => {
              notify("Success !", `File uploaded successfully`, "success");
              this.setState({ loading: false });
            })
            .catch(error => {
              if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                notify("Error", "File too large to upload", "error");
                this.setState({ loading: false });
                console.log(error.request);
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
  loading: state.uploadImage.loading
});
export default connect(mapStateToProps, { uploadFile })(UploadImageComp);
