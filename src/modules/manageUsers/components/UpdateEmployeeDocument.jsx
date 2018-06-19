import React from "react";
import * as _ from "lodash";
import Dialog from "material-ui/Dialog";
import { notify } from "src/services/notify";
import { getToken } from "src/services/generic";
import { CONFIG } from "src/config/index";
import "react-date-picker/index.css";

class UpdateEmployeeDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      open: false,
      doc_type: "",
      user_token: ""
    };
    this.deleteDocument = this.deleteDocument.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.callUpdateDocuments = this.callUpdateDocuments.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({ user_token: getToken() });
    if (typeof props.user_id !== "undefined" && props.user_id !== null) {
      this.setState({ user_id: props.user_id });
    }
  }
  handleOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  callUpdateDocuments(e) {
    let type = this.state.doc_type;
    let link1 = this.refs.file.value;
    let stop = false;
    if (this.state.user_id === "") {
      stop = true;
      notify("User not selected");
    } else if (type === "") {
      stop = true;
      notify("Please select document type");
    } else if (link1 === "") {
      stop = true;
      notify("Please select a file");
    } else if (this.refs.declear.checked !== true) {
      stop = true;
      notify("Mark declearation before submit");
    }
    if (stop) {
      e.preventDefault();
    }
  }
  deleteDocument(docId) {
    this.props
      .onDeleteDocument(docId)
      .then(msg => {
        this.props.onGetUserDocument(this.state.user_id);
        notify(msg.toString());
      })
      .catch(err => {
        notify(err.toString());
      });
  }
  render() {
    let pageUrl = window.location.href;
    let userDoc = [];
    _.map(this.props.user_documents, (doc, key) => {
      userDoc.push(
        <li key={key} className="list-group-item">
          <div className="clear b-t p-t">
            <div className="_500 block">
              {doc.document_type}
              <span
                className="glyphicon glyphicon-remove-circle pull-right pointer"
                onClick={() => {
                  this.deleteDocument(doc.id);
                }}
              />
            </div>
            {typeof doc.link_1 === "undefined" ? (
              ""
            ) : (
              <span className="text-muted">
                <div dangerouslySetInnerHTML={{ __html: doc.link_1 }} />
                <br />
              </span>
            )}
          </div>
        </li>
      );
    });
    return (
      <div>
        <h6 className="text-center">Uploaded Documents</h6>
        <br />
        <div>
          <ul className="list-group m-b">
            {userDoc.length === 0 ? (
              <li className="list-group-item">
                <span>No document uploaded</span>
              </li>
            ) : (
              userDoc
            )}
          </ul>
        </div>
        <div className="text-center">
          {this.props.disabled ? (
            ""
          ) : (
            <button
              className="btn info"
              onClick={() =>
                this.props.history.push(`/add_documents/${this.state.user_id}`)
              }
            >
              Upload New Documents
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default UpdateEmployeeDocument;
