import { createAction } from "redux-actions";
import { uploadfile } from "src/services/index";
import { notify } from "src/services/notify";
import { show_loading, hide_loading } from "appRedux/generic/actions/frontend";
import * as actionsManageDevice from "appRedux/inventory/actions/inventory";

export const uploadFile = (formData, url) => dispatch => {
  dispatch({ type: "UPLOADING_FILE" });
  uploadfile(formData, url).then(data => {
    dispatch({ type: "UPLOAD_FILE", payload: data });
    notify("Success !", `File uploaded successfully`, "success");
    dispatch(actionsManageDevice.get_machines_detail());
    dispatch(actionsManageDevice.unapprovedUser());
    console.log(data);
    console.log("success");
  });
};
