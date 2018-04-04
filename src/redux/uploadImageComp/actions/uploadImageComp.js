import { createAction } from "redux-actions";
import { uploadfile } from "src/services/index";
import { notify } from "src/services/notify";

export const uploadFile = (file, url) => dispatch => {
  uploadfile(file, url).then(data => {
    dispatch({ type: "UPLOAD_FILE", payload: data });
    console.log(data);
    if (data.status === 200) {
      notify("Success !", `${file.name} uploaded successfully`, "success");
    }
    console.log("success");
  });
};
