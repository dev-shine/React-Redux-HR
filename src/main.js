// import React from 'react'
// import ReactDOM from 'react-dom'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
// import { useRouterHistory } from 'react-router'
// import { syncHistoryWithStore } from 'react-router-redux'
// import createStore from './store/createStore'
// import AppContainer from './containers/AppContainer'

//--start---for HR APP by arun
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Link, IndexRoute, hashHistory} from 'react-router'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import Immutable from 'immutable'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger';

import reducer from './reducers/index'

import injectTapEventPlugin from 'react-tap-event-plugin';

//pages
import Page_Login from './containers/user/login'
import Page_Home from './containers/user/home'
import Page_Logout from './containers/user/logout'
import Page_ForgotPassword from './containers/user/forgotPassword'
import Page_PolicyDocument from './containers/user/PolicyDocument'

//-admin
import Page_ManageWorkingHours from './containers/admin/manageWorkingHours'
import Page_ManageLeaves from './containers/admin/manageLeaves'
import Page_ManageUserWorkingHours from './containers/admin/manageUserWorkingHours'
import Page_LeavesSummary from './containers/admin/leavesSummary'
import Page_ManageSalary from './containers/admin/manageSalary'
import Page_ManageUsers from './containers/admin/manageUsers'
import Page_ManageClients from './containers/admin/manageClients'
import Page_ManagePayslips from './containers/admin/managePayslips'
import Page_ViewSalary from './containers/admin/viewSalary'
import Page_DisabledEmployes from './containers/admin/disabledEmployes'
import Page_UploadAttendance from './containers/admin/uploadAttendance'
import Page_UploadPolicyDocument from './containers/admin/uploadPolicyDocument'
import Page_mail_template from './containers/admin/addTemplate'
import Page_AddVariables from './containers/admin/addVariables'
import Page_TeamView from './containers/admin/viewTeam'


//-user
import Page_MonthlyAttendance from './containers/user/monthlyAttendance'
import Page_AttendanceSummary from './containers/user/attendanceSummary'
import Page_Holidays from './containers/user/holidays'
import Page_ApplyLeave from './containers/user/applyLeave'
import Page_MyLeaves from './containers/user/myLeaves'
import Page_Salary from './containers/user/salary'
import Page_MyProfile from './containers/user/myProfile'
import Page_MyDocuments from './containers/user/myDocuments'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'whatwg-fetch'
// -for iPhone iPad safari engine
 if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)){
   fetch = require('whatwg-fetch');
 }

export class APP extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const logger = createLogger();

injectTapEventPlugin()

let store = createStore(reducer, compose(
//applyMiddleware( thunk, logger),
applyMiddleware(thunk),
//window.devToolsExtension ? window.devToolsExtension() : f => f
));

//--end---for HR APP by arun

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

//--start----added by arun for HR app
let render = (routerKey = null) => {
  ReactDOM.render((
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={APP}>
            <IndexRoute component={Page_Login}/>
            //this will be the default page which will opens when app starts
            <Route path="home" component={Page_Home}/>
            <Route path="monthly_attendance" component={Page_MonthlyAttendance}/>
            <Route path="manage_working_hours" component={Page_ManageWorkingHours}/>
            <Route path="logout" component={Page_Logout}/>
            <Route path="holidays" component={Page_Holidays}/>
            <Route path="team_view" component={Page_TeamView}/>
            <Route path="apply_leave" component={Page_ApplyLeave}/>
            <Route path="manage_leaves" component={Page_ManageLeaves}/>
            <Route path="my_leaves" component={Page_MyLeaves}/>
            <Route path="disabled_employes" component={Page_DisabledEmployes}/>
            <Route path="manage_user_working_hours" component={Page_ManageUserWorkingHours}/>
            <Route path="leaves_summary" component={Page_LeavesSummary}/>
            <Route path="salary" component={Page_Salary}/>
            <Route path="manage_salary" component={Page_ManageSalary}/>
            <Route path="my_profile" component={Page_MyProfile}/>
            <Route path="manage_users" component={Page_ManageUsers}/>
            <Route path="manage_clients" component={Page_ManageClients}/>
            <Route path="manage_payslips" component={Page_ManagePayslips}/>
            <Route path="forgot_password" component={Page_ForgotPassword}/>
            <Route path="documents" component={Page_MyDocuments}/>
            <Route path="uploadAttendance" component={Page_UploadAttendance}/>
            <Route path="view_salary" component={Page_ViewSalary}/>
            <Route path="policy_documents" component={Page_PolicyDocument}/>
            <Route path="upload_policy_documents" component={Page_UploadPolicyDocument}/>
            <Route path="add_variables" component={Page_AddVariables}/>
            <Route path="mail_templates" component={Page_mail_template}/>
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>
  ), document.querySelector("#myApp"))
}
//--end------added by arun for HR app

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
render()
