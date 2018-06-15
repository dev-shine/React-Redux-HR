import Immutable from "immutable";

let initialState = { loading: false };

export function uploadImage(state = initialState, action) {
  if (action.type === "UPLOADING_FILE") {
    return { loading: true };
  }
  if (action.type === "UPLOAD_FILE") {
    return {loading:false};
  } else {
    return state;
  }
}
