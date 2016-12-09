const token = localStorage.getItem('hr_logged_user')
export const CONFIG = {
  ADMIN: 'Admin',
  HR: 'HR',
  GUEST: 'Guest',
  EMPLOYEE: 'Employee',
  WORKING_DAY: 'WORKING_DAY',
  LEAVE_DAY: 'LEAVE_DAY',
  //dev apis
  //api_url: 'http://dev.hr.excellencetechnologies.in/hr/attendance/API_HR/api.php',
  //other_api_url: 'http://dev.hr.excellencetechnologies.in/hr/attendance/sal_info/api.php',
  //api_url_salary: 'http://dev.hr.excellencetechnologies.in/hr/attendance/sal_info',
  //google_login_btn_page_url: "http://dev.hr.excellencetechnologies.in/hr/attendance/sal_info/google-api/drive_file/index.php?token=" + token,
  //login_page_url: "http://dev.hr.excellencetechnologies.in/hr/",
  //upload_url: "http://dev.hr.excellencetechnologies.in/hr/attendance/sal_info/upload_file.php",

  //live apis
  api_url: 'https://hr.excellencetechnologies.in/attendance/API_HR/api.php',
  other_api_url: 'https://hr.excellencetechnologies.in/attendance/sal_info/api.php',
  api_url_salary: 'https://hr.excellencetechnologies.in/attendance/sal_info',
  google_login_btn_page_url: "https://hr.excellencetechnologies.in/attendance/sal_info/google-api/drive_file/index.php?token=" + token,
  login_page_url: "https://hr.excellencetechnologies.in/",
  upload_url: "https://hr.excellencetechnologies.in/attendance/sal_info/upload_file.php",

  jwt_secret_key: 'HR_APP'

}
