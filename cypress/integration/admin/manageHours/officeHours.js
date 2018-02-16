import {urls, user, apiUrls, monthName} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test office hours', () => {
  it('header title is Manage Working Hours', () => {
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
  it('clicking on Change To text box of any date will open a select box listing time', () => {
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
    cy.get('#calendar').should('be.visible');
    cy.get('#calendar .fc-event-container .fc-content').should('be.visible');
    cy.get('#calendar .fc-event-container .fc-content .fc-time .timepicker').should('be.visible');
    const data = [];
    cy.get('#calendarDay').each((item, index, list) => {
      cy.get('#calendarDay:nth-child(' + (index + 1) + ') > div').then((id) => {
        data.push(id.attr('id'));
        console.log(data, 'asd');
      });
    });
    // cy.get('#calendar .fc-event-container .fc-content .fc-time input').click({multiple: true, force: true}).get('.ui-timepicker-wrapper').should('be.visible');
  });
  it('on selecting time for any date text box value will be the opted time and Hours will also change to the opted value', () => {

  });
});
