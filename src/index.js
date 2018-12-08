import './styles/main.scss';
import 'whatwg-fetch';
// import 'sweetalert';
import 'sweetalert/dist/sweetalert.css';
import 'jquery';
import 'jquery-ui';
// import 'tether';
import 'bootstrap';
import './themeFlatkit/scripts'; 
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Page_Login from './modules/auth/containers/login';
import Page_Logout from './modules/auth/containers/logout';
import Page_ForgotPassword from './modules/auth/containers/forgotPassword';
import PageManageDashboard from './modules/manageUsers/containers/manageDashboard';
import MenuDefault from "./components/menu/LoaderMenuDefault"
import store from './store';
const Page_ManageLeaves = lazy(() => import('./modules/leave/containers/manageLeaves'));
const Page_LeavesSummary = lazy(() => import('./modules/leave/containers/leavesSummary'));
const Page_ApplyLeave = lazy(() => import('./modules/leave/containers/applyLeave'));
const Page_MyLeaves = lazy(() => import('./modules/leave/containers/myLeaves'));
const Page_Holidays = lazy(() => import('./modules/holidays/containers/holidays'));
const Page_PolicyDocument = lazy(() => import('./modules/policyDocuments/containers/PolicyDocument'));
const Page_UploadPolicyDocument = lazy(() => import('./modules/policyDocuments/containers/uploadPolicyDocument'));
const Page_ManageSalary = lazy(() => import('./modules/salary/containers/manageSalary'));
const Page_ViewSalary = lazy(() => import('./modules/salary/containers/viewSalary'));
const Page_Salary = lazy(() => import('./modules/salary/containers/salary'));
const Page_ManagePayslips = lazy(() => import('./modules/salary/containers/managePayslips'));
const Page_Home = lazy(() => import('./modules/attendance/containers/Home'));
const Page_MonthlyAttendance = lazy(() => import('./modules/attendance/containers/monthlyAttendance'));
const Page_UploadAttendance = lazy(() => import('./modules/attendance/containers/uploadAttendance'));
const Page_MyDocuments = lazy(() => import('./modules/myDocuments/containers/myDocuments'));
const PageManageUsers = lazy(() => import('./modules/manageUsers/containers/manageUsers'));
const Page_ManageWorkingHours = lazy(() => import('./modules/workingHours/containers/manageWorkingHours'));
const Page_ManageUserWorkingHours = lazy(() => import('./modules/workingHours/containers/manageUserWorkingHours'));
const InventorySystem = lazy(() => import('./modules/inventory/containers/manageInventory'));
const Page_MyInventory = lazy(() => import('./modules/inventory/containers/myInventory'));
const PageManageRoles = lazy(() => import('./modules/manageRoles/containers/manageRoles'));
const Page_ManageUserPendingHours = lazy(() => import('./modules/workingHours/containers/manageUserPendingHours'));
const PageDisabledEmployes  = lazy(() => import('./modules/manageUsers/containers/disabledEmployes'));
const Page_AddVariables = lazy(() => import('./modules/templates/containers/addVariables'));
const Page_TeamView = lazy(() => import('./modules/team/containers/viewTeam'));
const Page_MyProfile = lazy(() => import('./modules/myProfile/containers/myProfile'));
const Page_AttendanceReq = lazy(() => import('./modules/attendance/containers/manageAttendanceReq'));
const InventoryItem = lazy(() => import('./modules/inventory/components/inventoryItem'));
const Page_AddDocuments = lazy(() => import('./modules/addDocuments/container/AddDocuments'));
const Page_FormAddDocuments = lazy(() => import('./modules/addDocuments/components/FormAddDocuments'));
const FormAddNewEmployeeDetails = lazy(() => import('./modules/manageUsers/components/FormAddNewEmployeeDetails'))
const AddNewEmployee = lazy(() => import('./modules/manageUsers/components/FormAddNewEmployee'))
const UserDocumentDetails = lazy(() => import('./modules/manageUsers/components/Userdocuments'))
const Page_InventoryOverview = lazy(() => import('./modules/inventoryOverview/container/inventoryOverviewContainer'))
const RouterAddInventorySystem = lazy(() => import('./modules/inventory/components/AddInventory'))
const Page_Audit_Inventory = lazy(() => import("./modules/inventory/components/AuditInventoryList"))
const ContainerHealthStats = lazy(() => import('./modules/healthStats/container/ContainerHealthStats'))
const Page_settings = lazy(() => import('./modules/healthStats/container/Settings'))

const appHistory = createBrowserHistory()

// -for iPhone iPad safari engine
// if (!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
//   fetch = require('whatwg-fetch');
// }

let render = (routerKey = null) => {
  ReactDOM.render((
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={appHistory} queryKey={false}>
        <Suspense fallback={<MenuDefault/>}>

          <Switch>
          <Route exact path="/menu" component={MenuDefault} />
            <Route exact path="/" component={PageManageDashboard} />
            <Route path="/page_login" component={Page_Login} />
            <Route path="/home" component={Page_Home} />
            <Route path="/monthly_attendance" component={Page_MonthlyAttendance} />
            <Route path="/logout" component={Page_Logout} />
            <Route path="/manage_working_hours" component={Page_ManageWorkingHours} />
            <Route path="/holidays" component={Page_Holidays} />
            <Route path="/team_view" component={Page_TeamView} />
            <Route path="/apply_leave" component={Page_ApplyLeave} />
            <Route path="/manage_leaves" component={Page_ManageLeaves} />
            <Route path="/my_leaves" component={Page_MyLeaves} />
            <Route path="/disabled_employes" component={PageDisabledEmployes} />
            <Route path="/manage_user_working_hours" component={Page_ManageUserWorkingHours} />
            <Route path="/manage_user_pending_hours" component={Page_ManageUserPendingHours} />
            <Route path="/leaves_summary" component={Page_LeavesSummary} />
            <Route path="/salary" component={Page_Salary} />
            <Route path="/manage_salary" component={Page_ManageSalary} />
            <Route path="/my_profile" component={Page_MyProfile} />
            <Route path="/my_inventory" component={Page_MyInventory} />
            <Route path="/manage_users" component={PageManageUsers} />
            <Route path="/manage_roles" component={PageManageRoles} />
            <Route path="/manage_payslips" component={Page_ManagePayslips} />
            <Route path="/forgot_password" component={Page_ForgotPassword} />
            <Route path="/documents" component={Page_MyDocuments} />
            <Route path="/uploadAttendance" component={Page_UploadAttendance} />
            <Route path="/view_salary" component={Page_ViewSalary} />
            <Route path="/policy_documents" component={Page_PolicyDocument} />
            <Route path="/upload_policy_documents" component={Page_UploadPolicyDocument} />
            <Route path="/add_variables" component={Page_AddVariables} />
            {/* <Route path="/mail_templates" component={Page_mail_template} /> */}

            {/* <Route path="inventoryOverviewDetail" component={Page_InventorySystem} /> */}
            {/* <Route path="inventory_system/:device/:id" component={InventoryItem} /> */}
            {/* <Route path="/inventory_system" component={InventorySystem} /> */}

            <Route path="/inventory_system/:device/:id" component={InventoryItem} />
            <Route path="/inventory_system/:device" component={InventorySystem}/>
            <Route path="/attendanceReq" component={Page_AttendanceReq} />
            <Route path="/inventoryOverviewDetail" component={Page_InventoryOverview}/>
            <Route path="/audit_inventory_list" component={Page_Audit_Inventory}/>
            <Route exact path="/add_documents" component = {Page_AddDocuments} />
            <Route path="/add_documents/:userId" component = {Page_FormAddDocuments} />
            <Route path="/health_stats" component = {ContainerHealthStats} />
            <Route path="/settings" component = {Page_settings} />

            <Route path="/addInventory" component={RouterAddInventorySystem}/>
            <Route exact path="/add_new_employee" component={AddNewEmployee}/>
            <Route path="/add_new_employee/:id" component={FormAddNewEmployeeDetails}/>
            <Route path="/user_document" component={UserDocumentDetails}/> 
          </Switch>
          </Suspense>

        </Router>
      </Provider>
    </MuiThemeProvider>
  ),
  document.querySelector('#root'));
};

render();
