import Immutable from 'immutable';
import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'appRedux/constants';

let initialState = {
  'holidays': []
};

export function holidaysList (state = Immutable.fromJS(initialState), action) {
  if (action.type === constants.SUCCESS_HOLIDAYSLIST) {
    return state.set('holidays', action.payload.holidays);
  } else if (action.type === constants.EMPTY_HOLIDAYSLIST) {
    return state.set('holidays', action.payload);
  } else if (action.type === constants.ERROR_HOLIDAYSLIST) {
    return state.set('holidays', action.payload);
  } else {
    return state;
  }
}
