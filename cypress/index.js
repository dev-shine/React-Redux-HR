import * as visit from './visitRoutes';
import * as helper from './helper';

export const urlVisited = visit.urlVisited;
export const visitIndexRoute = visit.visitIndexRoute;
export const signin = helper.signin;
export const signout = helper.signout;

export const urls = {
  baseUrl: 'http://localhost:3000/#/',
  login: 'page_login',
  home: 'home',
  ManageDashboard: 'PageManageDashboard',
  monthlyAttendance: 'monthly_attendance',
  manageWorkingHours: 'manage_working_hours',
  logout: 'logout',
  holidays: 'holidays',
  teamView: 'team_view',
  applyLeave: 'apply_leave',
  manageLeaves: 'manage_leaves',
  myLeaves: 'my_leaves',
  disabledEmployes: 'disabled_employes',
  manageUserWorkingHours: 'manage_user_working_hours',
  manageUserPendingHours: 'manage_user_pending_hours',
  leavesSummary: 'leaves_summary',
  salary: 'salary',
  manageSalary: 'manage_salary',
  myProfile: 'my_profile',
  myInventory: 'my_inventory',
  manageUsers: 'manage_users',
  manageRoles: 'manage_roles',
  managePayslips: 'manage_payslips',
  forgotPassword: 'forgot_password',
  documents: 'documents',
  uploadAttendance: 'uploadAttendance',
  viewSalary: 'view_salary',
  policyDocuments: 'policy_documents',
  uploadPolicyDocuments: 'upload_policy_documents',
  addVariables: 'add_variables',
  mailTemplates: 'mail_templates',
  inventorySystem: 'inventory_system',
  attendanceReq: 'attendanceReq',
};

export const user = {
  admin:{
    username: 'arun',
    password:'java@123',
  },
  user:{
    username:'atul',
    password:'java@123',
  },
  userWhiteSpace: {
    username:'atul       ',
    password:'java@123',
  },
  hr:{
    username:'deepak',
    password:'java@123',
  },
  hrWrongPassword: {
    username:'deepak',
    password:'wrongpassword',
  },
  userWrongPassword: {
    username:'atul',
    password:'wrongpassword'
  },
  adminWrongPassword:{
    username:'admin',
    password:'wrongpassword',
  }
}
