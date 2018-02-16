import {urls, user, click, shouldBeVisible} from '../../../index';
import {signin} from '../../../helper';
import {urlVisited} from '../../../visitRoutes';

describe('Test attendance upload page', () => {
  it('page load successfully', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.nav > #monthly_attendance');
    click('.nav > #monthly_attendance');
    shouldBeVisible('.nav-sub #uploadAttendance');
    click('.nav-sub #uploadAttendance');
    urlVisited(urls.baseUrl + urls.uploadAttendance);
  });
});
