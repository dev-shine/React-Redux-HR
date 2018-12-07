import {getToken} from '../services/generic';


console.log('Environment :: ' + process.env.NODE_ENV);


const baseUrl = process.env.REACT_APP_BASE_URL
const token = getToken();

const CONFIG = {
  BASE_URL:                  window.location.href.split('/#')[0] || baseUrl,
  api_url:                   `${baseUrl}/attendance/API_HR/api.php`,
  other_api_url:             `${baseUrl}/attendance/sal_info/api.php`,
  api_url_salary:            `${baseUrl}/attendance/sal_info`,
  google_login_btn_page_url: `${baseUrl}/attendance/sal_info/google-api/drive_file/index.php?token=${token}`,
  login_page_url:            `${baseUrl}`,
  upload_url:                `${baseUrl}/attendance/sal_info/upload_file.php`,
  upload_leave_url:          `${baseUrl}/attendance/API_HR/upload_leave_doc.php`,
  upload_attendance_url:     `${baseUrl}/attendance/index.php`,
  pdf_url:                   `${baseUrl}/attendance/sal_info/`,
  upload_email_attachment:   `${baseUrl}/attendance/sal_info/upload_file_attachment.php`,
  transfer_link:             `${baseUrl}/attendance/sal_info/display_user_info.php`,
  expressApiUrl:             `${baseUrl}/attendance/API_HR/express_api_call.php`,
  expressRequestUrl:         'http://5.9.144.226:3020', // this should be http for production 
  inventory_upload_url:      `${baseUrl}/attendance/API_HR/generic-file-upload.php`,
  view_inventory_documents:  `${baseUrl}/attendance/uploaded_files/`,
  inventory_images:          `${baseUrl}/attendance/uploaded_files/`
};

CONFIG['ADMIN'] = 'Admin';
CONFIG['HR'] = 'HR';
CONFIG['GUEST'] = 'Guest';
CONFIG['EMPLOYEE'] = 'Employee';
CONFIG['WORKING_DAY'] = 'WORKING_DAY';
CONFIG['LEAVE_DAY'] = 'LEAVE_DAY';
CONFIG['DEFAULT_PASSWORD'] = 'java@123';
CONFIG['jwt_secret_key'] = 'HR_APP';
CONFIG['PAGEROLES'] = [];
CONFIG['minimum_months_hr_salary_view'] = 8;

export {CONFIG};
