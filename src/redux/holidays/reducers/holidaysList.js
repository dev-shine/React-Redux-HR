import Immutable from 'immutable';
import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'appRedux/constants';

// let initialState = {
//   holidaysList: {
//     data:       {},
//     isLoading:  false,
//     isError:    false,
//     isSuccess:  false,
//     message:    ''
//   },
// }
//
// const requestHolidaysList = (state, action) => update(state, {
//   holidaysList: {
//     isLoading: {$set: true},
//     isError:   {$set: false},
//     isSuccess: {$set: false},
//     message:   {$set: ''}
//   }
// });
// const successHolidaysList = (state, action) => update(state, {
//   holidaysList: {
//     data:       {$set: action.payload},
//     isLoading:  {$set: false},
//     isError:    {$set: false},
//     isSuccess:  {$set: true},
//     message:    {$set: ''}
//   }
// });
// const failedHolidaysList = (state, action) => update(state, {
//   holidaysList: {
//     isLoading: {$set: false},
//     isSuccess: {$set: false},
//     isError:   {$set: true},
//     message:   {$set: action.payload}
//   }
// });
// const errorHolidaysList = (state, action) => update(state, {
//   holidaysList: {
//     isLoading: {$set: false},
//     isSuccess: {$set: false},
//     isError:   {$set: true},
//     message:   {$set: action.payload}
//   }
// });
// export default handleActions({
//   [constants.REQUEST_HOLIDAYSLIST]: requestHolidaysList,
//   [constants.SUCCESS_HOLIDAYSLIST]: successHolidaysList,
//   [constants.FAILED_HOLIDAYSLIST]: failedHolidaysList,
//   [constants.ERROR_HOLIDAYSLIST]: errorHolidaysList
// }, initialState);
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
