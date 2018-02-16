import {urls, user, month, year, contains, click, wait, shouldNotBeVisble, shouldBeVisible} from '../../index';
import {signin, signout} from '../../helper';
import {urlVisited, visitIndexRoute} from '../../visitRoutes';

describe('Test case for Side menu', () => {
  it('login to admin page', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
  });
  it('on clicking attendance tab drop down will show', () => {
    cy.get('.nav > #monthly_attendance').should('be.visible');
    cy.get('.nav > #monthly_attendance').click();
    cy.get('.nav-sub #monthly_attendance').should('be.visible');
    cy.get('.nav-sub #home').should('be.visible');
    cy.get('.nav-sub #uploadAttendance').should('be.visible');
    cy.get('.nav > #monthly_attendance').should('be.visible');
  });
});
