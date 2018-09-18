import {handleActions} from 'redux-actions';
import update from 'immutability-helper';
import * as constants from 'appRedux/constants';
import 'appRedux/update';

let initialState = {
  holidaysList: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  addHolidays: {
    data:      {},
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  },
  holidayType : {
    data:      [],
    isLoading: false,
    isError:   false,
    isSuccess: false,
    message:   ''
  }
};

const requestHolidaysList = (state, action) => update(state, {
  holidaysList: {$setRequestLoading: null}
});
const successHolidaysList = (state, action) => update(state, {
  holidaysList: {$setRequestSuccess: action.payload},
  addHolidays : {isSuccess :{$set:false}}
});
const errorHolidaysList = (state, action) => update(state, {
  holidaysList: {$setRequestError: action.payload}
});

const requestAddHolidays = (state, action) => update(state, {
  addHolidays: {$setRequestLoading: null}
});
const successAddHolidays = (state, action) => update(state, {
  addHolidays: {$setRequestSuccess: action.payload}
});
const errorAddHolidays = (state, action) => update(state, {
  addHolidays: {$setRequestError: action.payload}
});

const requestHolidayType = (state, action) => update(state, {
  holidayType: {$setRequestLoading: null}
});
const successHolidayType = (state, action) => update(state, {
  holidayType: {$setRequestSuccess: action.payload}
});
const errorHolidayType = (state, action) => update(state, {
  holidayType: {$setRequestError: action.payload}
});

const resetReducer = (state,action) => update(state, {
  addHolidays : {$setInitialState :null}
})

export default handleActions({
  [constants.REQUEST_HOLIDAYSLIST]: requestHolidaysList,
  [constants.SUCCESS_HOLIDAYSLIST]: successHolidaysList,
  [constants.ERROR_HOLIDAYSLIST]:   errorHolidaysList,
  [constants.REQUEST_ADDHOLIDAYS]: requestAddHolidays,
  [constants.SUCCESS_ADDHOLIDAYS]: successAddHolidays,
  [constants.ERROR_ADDHOLIDAYS]: errorAddHolidays,
  [constants.REQUEST_HOLIDAYTYPE]: requestHolidayType,
  [constants.SUCCESS_HOLIDAYTYPE]: successHolidayType,
  [constants.ERROR_HOLIDAYTYPE]: errorHolidayType,
  [constants.RESET_REDUCER]: resetReducer
}, initialState);
