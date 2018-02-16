import {urls, signin, user, month, year, contains, click, wait, shouldBeVisible} from '../../../index';
import {urlVisited, visitOfficeHours} from '../../../visitRoutes';

describe('Test office hours', () => {
  it('header title is Manage Working Hours', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    visitOfficeHours();
    urlVisited(urls.baseUrl + urls.manageWorkingHours);
    cy.get('.navbar .navbar-item').contains('Manage Working Hours');
  });
  it('is listing current month working hours', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    visitOfficeHours();
    urlVisited(urls.baseUrl + urls.manageWorkingHours);
    shouldBeVisible('.app-body');
    shouldBeVisible('.app-body .padding');
    shouldBeVisible('#content');
    shouldBeVisible('.fullcalendar .fc-toolbar > .fc-center h2 ');
    cy.get('.fullcalendar .fc-toolbar > .fc-center h2 ').contains(`${month(0)}-${year(0)}`);
  });
  it('clicking on next and previous month will show the respective month data, month name and year text will also change', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    visitOfficeHours();
    wait(3000);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    click('.fc-left button');
    wait(3000);
    cy.get('.fullcalendar .fc-toolbar > .fc-center h2 ').contains(`${month(-1)}-${year(0)}`);
  });
  it('clicking on Change To text box of any date will open a select box listing time', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    visitOfficeHours();
    urlVisited(urls.baseUrl + urls.manageWorkingHours);
    shouldBeVisible('.app-body');
    shouldBeVisible('.app-body .padding');
    shouldBeVisible('#content');
    shouldBeVisible('#calendar');
    shouldBeVisible('#calendar .fc-event-container .fc-content');
    shouldBeVisible('#calendar .fc-event-container .fc-content .fc-time .timepicker');
    const data = [];
    cy.get('#calendarDay').each((item, index, list) => {
      cy.get('#calendarDay:nth-child(' + (index + 1) + ') > div').then((id) => {
        data.push(id.attr('id'));
      });
    });
    // cy.get('#calendar .fc-event-container .fc-content .fc-time input').click({multiple: true, force: true}).get('.ui-timepicker-wrapper');
  });
  it('on selecting time for any date text box value will be the opted time and Hours will also change to the opted value', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    visitOfficeHours();
    click('#calendar #calendarDay:nth-child(1) .ui-timepicker-input');
    click('.ui-timepicker-wrapper .ui-timepicker-list li:nth-child(10)');
    contains('#calendar #calendarDay:nth-child(1) .fc-time h6', 'Hours : 06:30');
  });
});
