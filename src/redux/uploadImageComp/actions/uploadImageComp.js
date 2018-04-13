import { createAction } from "redux-actions";
import { uploadfile } from "src/services/index";
import { notify } from "src/services/notify";
import { show_loading, hide_loading } from "appRedux/generic/actions/frontend";

export const uploadFile = (formData, url) => dispatch => {
  dispatch({ type: "UPLOADING_FILE" });
  uploadfile(formData, url).then(data => {
    dispatch({ type: "UPLOAD_FILE", payload: data });
    notify("Success !", `File uploaded successfully`, "success");
    console.log(data);
    console.log("success");
  });
};
