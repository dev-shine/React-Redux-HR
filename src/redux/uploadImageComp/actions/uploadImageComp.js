import { createAction } from "redux-actions";
import { uploadfile } from "src/services/index";
import { notify } from "src/services/notify";
import { show_loading, hide_loading } from "appRedux/generic/actions/frontend";
import * as actionsManageDevice from "appRedux/inventory/actions/inventory";
import * as actionMyDocuments from "appRedux/myDocuments/actions/myDocument";

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
  });
};
