// import React from 'react'
// import ReactDOM from 'react-dom'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
// import { useRouterHistory } from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'
// import createStore from './store/createStore'
// import AppContainer from './containers/AppContainer'

// --start---for HR APP by arun
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers/index';

import injectTapEventPlugin from 'react-tap-event-plugin';

// pages
// --------new structure import-----
import Page_Login from './modules/auth/containers/login';
import Page_Logout from './modules/auth/containers/logout';
import Page_ForgotPassword from './modules/auth/containers/forgotPassword';
import Page_ManageLeaves from './modules/leave/containers/manageLeaves';
import Page_LeavesSummary from './modules/leave/containers/leavesSummary';
import Page_ApplyLeave from './modules/leave/containers/applyLeave';
import Page_MyLeaves from './modules/leave/containers/myLeaves';
import Page_Holidays from './modules/holidays/containers/holidays';
import Page_PolicyDocument from './modules/policyDocuments/containers/PolicyDocument';
import Page_UploadPolicyDocument from './modules/policyDocuments/containers/uploadPolicyDocument';
import Page_ManageSalary from './modules/salary/containers/manageSalary';
import Page_ViewSalary from './modules/salary/containers/viewSalary';
import Page_Salary from './modules/salary/containers/salary';
import Page_ManagePayslips from './modules/salary/containers/managePayslips';
import Page_Home from './modules/attendance/containers/Home';
import Page_MonthlyAttendance from './modules/attendance/containers/monthlyAttendance';
// import Page_AttendanceSummary from './modules/attendance/containers/attendanceSummary';
import Page_UploadAttendance from './modules/attendance/containers/uploadAttendance';
import Page_MyDocuments from './modules/myDocuments/containers/myDocuments';
import PageManageUsers from './modules/manageUsers/containers/manageUsers';
import Page_ManageWorkingHours from './modules/workingHours/containers/manageWorkingHours';
import Page_ManageUserWorkingHours from './modules/workingHours/containers/manageUserWorkingHours';
import Page_ManageUserPendingHours from './modules/workingHours/containers/manageUserPendingHours';

// -----------------------------

// -admin
import PageManageClients from 'modules/manageClients/containers/manageClients';
import PageDisabledEmployes from 'modules/manageUsers/containers/disabledEmployes';

import Page_mail_template from './modules/templates/containers/addTemplate';
import Page_AddVariables from './modules/templates/containers/addVariables';

import Page_TeamView from './containers/admin/viewTeam';
import Page_InventorySystem from './containers/admin/manageInventory';

// -user
import Page_MyProfile from './containers/user/myProfile';
import Page_MyInventory from './containers/user/myInventory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'whatwg-fetch';
// -for iPhone iPad safari engine
if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
  fetch = require('whatwg-fetch');
}

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

export class APP extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const logger = createLogger();

injectTapEventPlugin();

let store = createStore(reducer, compose(
// applyMiddleware( thunk, logger),
applyMiddleware(thunk),
//window.devToolsExtension ? window.devToolsExtension() : f => f
));

// --end---for HR APP by arun

// ========================================================
// Browser History Setup
// ========================================================
// const browserHistory = useRouterHistory(createBrowserHistory)({
//   basename: __BASENAME__
// })

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
// const initialState = window.___INITIAL_STATE__
// const store = createStore(initialState, browserHistory)
// const history = syncHistoryWithStore(browserHistory, store, {
//   selectLocationState: (state) => state.router
// })

// ========================================================
// Developer Tools Setup
// ========================================================
// if (__DEBUG__) {
//   if (window.devToolsExtension) {
//     window.devToolsExtension.open()
//   }
// }

// ========================================================
// Render Setup
// ========================================================
// const MOUNT_NODE = document.getElementById('root')

// let render = (routerKey = null) => {
//   const routes = require('./routes/index').default(store)

//   ReactDOM.render(
//     <AppContainer
//       store={store}
//       history={history}
//       routes={routes}
//       routerKey={routerKey}
//     />,
//     MOUNT_NODE
//   )
// }

// --start----added by arun for HR app
let render = (routerKey = null) => {
  // console.log('aaaaa');
  ReactDOM.render((
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={appHistory} queryKey={false}>
          <Route path="/" component={APP}>
            <IndexRoute component={Page_Login} />
            //this will be the default page which will opens when app starts
            <Route path="home" component={Page_Home} />
            <Route path="monthly_attendance" component={Page_MonthlyAttendance} />
            <Route path="manage_working_hours" component={Page_ManageWorkingHours} />
            <Route path="logout" component={Page_Logout} />
            <Route path="holidays" component={Page_Holidays} />
            <Route path="team_view" component={Page_TeamView} />
            <Route path="apply_leave" component={Page_ApplyLeave} />
            <Route path="manage_leaves" component={Page_ManageLeaves} />
            <Route path="my_leaves" component={Page_MyLeaves} />
            <Route path="disabled_employes" component={PageDisabledEmployes} />
            <Route path="manage_user_working_hours" component={Page_ManageUserWorkingHours} />
            <Route path="manage_user_pending_hours" component={Page_ManageUserPendingHours} />
            <Route path="leaves_summary" component={Page_LeavesSummary} />
            <Route path="salary" component={Page_Salary} />
            <Route path="manage_salary" component={Page_ManageSalary} />
            <Route path="my_profile" component={Page_MyProfile} />
            <Route path="my_inventory" component={Page_MyInventory} />
            <Route path="manage_users" component={PageManageUsers} />
            <Route path="manage_clients" component={PageManageClients} />
            <Route path="manage_payslips" component={Page_ManagePayslips} />
            <Route path="forgot_password" component={Page_ForgotPassword} />
            <Route path="documents" component={Page_MyDocuments} />
            <Route path="uploadAttendance" component={Page_UploadAttendance} />
            <Route path="view_salary" component={Page_ViewSalary} />
            <Route path="policy_documents" component={Page_PolicyDocument} />
            <Route path="upload_policy_documents" component={Page_UploadPolicyDocument} />
            <Route path="add_variables" component={Page_AddVariables} />
            <Route path="mail_templates" component={Page_mail_template} />
            <Route path="inventory_system" component={Page_InventorySystem} />
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  ), document.querySelector('#myApp'));
};
// --end------added by arun for HR app

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
// if (__DEV__ && module.hot) {
//   const renderApp = render
//   const renderError = (error) => {
//     const RedBox = require('redbox-react').default

//     ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
//   }
//   render = () => {
//     try {
//       renderApp(Math.random())
//     } catch (error) {
//       renderError(error)
//     }
//   }
//   //module.hot.accept(['./routes/index'], () => render())
// }

// ========================================================
// Go!
// ========================================================
render();
