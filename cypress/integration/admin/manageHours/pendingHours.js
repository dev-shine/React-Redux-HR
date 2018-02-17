import {urls, apiUrls, user, click, shouldBeVisible} from '../../../index';
import {signin} from '../../../helper';
import {urlVisited} from '../../../visitRoutes';

describe('Test office hours', () => {
  xit('header title is Manage Employee Pending Hours', () => {
    cy.server();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.route(apiUrls.apiUrl).then((response) => {
      expect(response.status).to.eq(200);
    });
    shouldBeVisible('.nav > #manage_working_hours');
    click('.nav > #manage_working_hours');
    shouldBeVisible('.nav-sub #manage_user_pending_hours');
    click(' #manage_user_pending_hours');
    urlVisited(urls.baseUrl + urls.manageUserPendingHours);
    cy.get('.navbar .navbar-item').contains('Manage Employee Pending Hours');
  });
  xit('is listing current month pending hours, if no data will show Not Updated! ', () => {

  });
  xit('clicking on next and previous month will show the respective month data, month name and year text will also change', () => {

  });
  xit('actions will have either text No Action Required or buttons to perform actions', () => {

  });
  xit('action button APPLY LEAVE, click on this will open apply leave modal window', () => {

  });
});
