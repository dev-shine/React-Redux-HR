import { createAction } from "redux-actions";
import { uploadfile } from "../../../services/index";
import { notify } from "../../../services/notify";
import { show_loading, hide_loading } from "../../../redux/generic/actions/frontend";
import * as actionsManageDevice from "../../../redux/inventory/actions/inventory";
import * as actionMyDocuments from "../../../redux/myDocuments/actions/myDocument";

export const uploadFile = (formData, url, isRole) => dispatch => {
  dispatch({ type: "UPLOADING_FILE" });
  uploadfile(formData, url).then(data => {
    dispatch({ type: "UPLOAD_FILE", payload: data });
    notify("Success !", `File uploaded successfully`, "success");
    if (isRole === "Admin") {
      dispatch(actionsManageDevice.get_machines_detail());
      dispatch(actionsManageDevice.unapprovedUser());
      dispatch(actionMyDocuments.getMyDocument());
    } else if (isRole === "HR") {
      return;
    } else {
      dispatch(actionMyDocuments.getMyDocument());
    }
  }).catch(error => {
    dispatch({ type: "UPLOAD_FILE", payload: false });
    notify('Error',error,'error')
  });
};
