import {urls, apiUrls, user, click, shouldBeVisible} from '../../../index';
import {signin} from '../../../helper';
import {urlVisited} from '../../../visitRoutes';

describe('Test office hours', () => {
  it('header title is Manage Employee Pending Hours', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.wait(3000);
    shouldBeVisible('.nav > #manage_working_hours');
    click('.nav > #manage_working_hours');
    shouldBeVisible('.nav-sub #manage_user_pending_hours');
    click(' #manage_user_pending_hours');
    urlVisited(urls.baseUrl + urls.manageUserPendingHours);
    cy.get('.navbar .navbar-item').contains('Manage Employee Pending Hours');
  });
  it('is listing current month pending hours, if no data will show Not Updated! ', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.wait(3000);
    shouldBeVisible('.nav > #manage_working_hours');
    click('.nav > #manage_working_hours');
    shouldBeVisible('.nav-sub #manage_user_pending_hours');
    click(' #manage_user_pending_hours');
    urlVisited(urls.baseUrl + urls.manageUserPendingHours);
    cy.get('.navbar .navbar-item').contains('Manage Employee Pending Hours');
  });
  it('clicking on next and previous month will show the respective month data, month name and year text will also change', () => {
    signin(user.admin);
    cy.wait(3000);
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.nav > #manage_working_hours');
    click('.nav > #manage_working_hours');
    shouldBeVisible('.nav-sub #manage_user_pending_hours');
    click(' #manage_user_pending_hours');
    urlVisited(urls.baseUrl + urls.manageUserPendingHours);
    cy.get('.navbar .navbar-item').contains('Manage Employee Pending Hours');
  });
  it('actions will have either text No Action Required or buttons to perform actions', () => {
    signin(user.admin);
    cy.wait(3000);
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.nav > #manage_working_hours');
    click('.nav > #manage_working_hours');
    shouldBeVisible('.nav-sub #manage_user_pending_hours');
    click(' #manage_user_pending_hours');
    urlVisited(urls.baseUrl + urls.manageUserPendingHours);
    cy.get('.navbar .navbar-item').contains('Manage Employee Pending Hours');
  });
  it('action button APPLY LEAVE, click on this will open apply leave modal window', () => {
    cy.server();
    signin(user.admin);
    cy.wait(3000);
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.nav > #manage_working_hours');
    click('.nav > #manage_working_hours');
    shouldBeVisible('.nav-sub #manage_user_pending_hours');
    click(' #manage_user_pending_hours');
    urlVisited(urls.baseUrl + urls.manageUserPendingHours);
    cy.get('.navbar .navbar-item').contains('Manage Employee Pending Hours');
  });
});
