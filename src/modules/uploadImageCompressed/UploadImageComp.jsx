import React, { Component } from "react";
import ImageCompressor from "image-compressor.js";
import { notify } from "src/services/notify";
import { connect } from "react-redux";
import { uploadFile } from "appRedux/uploadImageComp/actions/uploadImageComp";
import { qualityValue } from "src/helper/helper";
import axios from "axios";

class UploadImageComp extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      status: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const file = this.props.file;
    const url = this.props.url;
    const doc_type = this.props.doc_type;

    if (!file) {
      return;
    } else if (!file.type.includes("image")) {
      this.props.uploadFile(file, url,doc_type);
    } else {
      let quality = qualityValue(file);

      new ImageCompressor(file, {
        quality: quality,
        success(result) {
          const formData = new FormData();
          formData.append("doc_type", doc_type);
          formData.append("file", result, result.name);
          // Send the compressed image file to server with XMLHttpRequest.
          axios
            .post(url, formData, {
              onUploadProgress: progressEvent => {
                console.log(
                  `Upload Progress ${doc_type}` +
                    Math.round(
                      progressEvent.loaded / progressEvent.total * 100
                    ) +
                    "%"
                );
              }
            })
            .then(data => {
              console.log(data);
              if (data.status === 200) {
                notify(
                  "Success !",
                  `${doc_type} named ${result.name} uploaded successfully`,
                  "success"
                );
              }
            });
        },
        error(e) {
          console.log(e.message);
        }
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="submit"
            name="submit"
            value="Upload"
            className="col-xs-12 md-btn md-raised indigo"
            onClick={e => this.props.callUpdateDocuments(e)}
          />
        </form>
      </div>
    );
  }
}
export default connect(null, { uploadFile })(UploadImageComp);
