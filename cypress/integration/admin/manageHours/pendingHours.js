import {urls, user, apiUrls, monthName} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test office hours', () => {
  it('header title is Manage Employee Pending Hours', () => {
    cy.server();
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.route(apiUrls.apiUrl).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.get('.nav > #manage_working_hours').should('be.visible');
    cy.get('.nav > #manage_working_hours').click();
    cy.get('.nav-sub #manage_user_pending_hours').should('be.visible');
    cy.get(' #manage_user_pending_hours').click();
    urlVisited(urls.baseUrl + urls.manageUserPendingHours);
    cy.get('.navbar .navbar-item').contains('Manage Employee Pending Hours');
  });
  it('is listing current month pending hours, if no data will show Not Updated! ', () => {

  });
  it('clicking on next and previous month will show the respective month data, month name and year text will also change', () => {

  });
  it('actions will have either text No Action Required or buttons to perform actions', () => {

  });
  it('action button APPLY LEAVE, click on this will open apply leave modal window', () => {

  });
});
