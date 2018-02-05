import {urls, user, apiUrls, monthName} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test office hours', () => {
  it('header title is Manage Working Hours', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_working_hours').should('be.visible');
    cy.get('.nav > #manage_working_hours').click();
    cy.get('.nav-sub #manage_working_hours').should('be.visible');
    cy.get('.nav-sub #manage_working_hours').click();
    urlVisited(urls.baseUrl + urls.manageWorkingHours);
    cy.get('.navbar .navbar-item').contains('Manage Working Hours');
  });
  it('is listing current month working hours', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_working_hours').should('be.visible');
    cy.get('.nav > #manage_working_hours').click();
    cy.get('.nav-sub #manage_working_hours').should('be.visible');
    cy.get('.nav-sub #manage_working_hours').click();
    urlVisited(urls.baseUrl + urls.manageWorkingHours);
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
    cy.get('#content').should('be.visible');
    var currentDate = new Date();
    var currentMonth = monthName[currentDate.getMonth()];
    var currentYear = currentDate.getFullYear();
    cy.get('.fullcalendar .fc-toolbar > .fc-center h2 ').should('be.visible');
    cy.get('.fullcalendar .fc-toolbar > .fc-center h2 ').contains(`${currentMonth}-${currentYear}`);
  });
  it('clicking on next and previous month will show the respective month data, month name and year text will also change', () => {

  });
  if ('clicking on Change To text box of any date will open a select box listing time', () => {

  });
  if ('on selecting time for any date text box value will be the opted time and Hours will also change to the opted value', () => {

  });
});
