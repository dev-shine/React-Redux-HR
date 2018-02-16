import {urls, user, click, shouldBeVisible} from '../../../index';
import {signin} from '../../../helper';
import {urlVisited} from '../../../visitRoutes';

describe('Test employees attendance listing', () => {
  it('employees list is loaded on left side panel', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.nav > #monthly_attendance');
    click('.nav > #monthly_attendance');
    shouldBeVisible('.nav-sub #home  ');
    click('.nav-sub #home');
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.app-body');
    shouldBeVisible('.app-body .padding');
    shouldBeVisible('#userList');
  });
  it('first employee attendance details are shown on right panel', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.nav > #monthly_attendance');
    click('.nav > #monthly_attendance');
    shouldBeVisible('.nav-sub #home');
    click('.nav-sub #home');
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.app-body');
    shouldBeVisible('.app-body .padding');
    shouldBeVisible('#content');
    shouldBeVisible('#content #calendar');
  });
});
