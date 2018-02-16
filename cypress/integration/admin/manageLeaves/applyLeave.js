import {urls, user, click, shouldBeVisible} from '../../../index';
import {signin} from '../../../helper';
import {urlVisited} from '../../../visitRoutes';

describe('Test apply leave page', () => {
  it('left panel will have all users list', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.nav > #manage_leaves');
    click('.nav > #manage_leaves');
    shouldBeVisible('.nav-sub > #apply_leave');
    click('.nav-sub > #apply_leave');
    shouldBeVisible('.app-body');
    shouldBeVisible('.app-body .padding');
  });
  it('clicking on any user on left panel and filling information on right side, click on apply button will apply leave', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.nav > #manage_leaves');
    click('.nav > #manage_leaves');
    shouldBeVisible('.nav-sub > #apply_leave');
    click('.nav-sub > #apply_leave');
    shouldBeVisible('.app-body');
    shouldBeVisible('.app-body .padding');
  });
});
