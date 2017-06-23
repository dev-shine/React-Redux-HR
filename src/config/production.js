const token = localStorage.getItem('hr_logged_user');

const CONFIG = {
  ADMIN: 'Admin',
  HR: 'HR',
  GUEST: 'Guest',
  EMPLOYEE: 'Employee',
  WORKING_DAY: 'WORKING_DAY',
  LEAVE_DAY: 'LEAVE_DAY',
  DEFAULT_PASSWORD: 'java@123',
  jwt_secret_key: 'HR_APP',
  // live apis
  api_url: 'https://hr.excellencetechnologies.in/attendance/API_HR/api.php',
  other_api_url: 'https://hr.excellencetechnologies.in/attendance/sal_info/api.php',
  api_url_salary: 'https://hr.excellencetechnologies.in/attendance/sal_info',
  google_login_btn_page_url: 'https://hr.excellencetechnologies.in/attendance/sal_info/google-api/drive_file/index.php?token=' + token,
  login_page_url: 'https://hr.excellencetechnologies.in/',
  upload_url: 'https://hr.excellencetechnologies.in/attendance/sal_info/upload_file.php',
  upload_leave_url: 'http://hr.excellencetechnologies.in/attendance/API_HR/upload_leave_doc.php',
  upload_attendance_url: 'https://hr.excellencetechnologies.in/attendance/upload_form.php',
  pdf_url: 'https://hr.excellencetechnologies.in/attendance/sal_info/',
  upload_email_attachment: 'https://hr.excellencetechnologies.in/attendance/sal_info/upload_file_attachment.php',
  transfer_link: 'https://hr.excellencetechnologies.in/attendance/sal_info/display_user_info.php'
};

export default CONFIG