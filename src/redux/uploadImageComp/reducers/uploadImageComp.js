import Immutable from "immutable";

let initialState = {};

export function myDocument(state = initialState, action) {
  if (action.type === "UPLOAD_FILE") {
    return action.payload;
  } else {
    return state;
  }
}
