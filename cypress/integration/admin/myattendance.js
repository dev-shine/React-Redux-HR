import {urls, user, apiUrls} from '../../../index';
import {signin, signout} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test attendance option', () => {
  it('after login in menu ateendance option should be visible', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl + urls.login);
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #monthly_attendance').should('be.visible');
  });
  it('after clicking attendance it should show drop-down list', () => {
    cy.get('.nav > #monthly_attendance').click();
    cy.get('.nav-sub #monthly_attendance').should('be.visible');
    cy.get('.nav-sub #home').should('be.visible');
    cy.get('.nav-sub #uploadAttendance').should('be.visible');
    cy.get('.nav-sub > #monthly_attendance span a ').should('be.exist').click();
    // cy.get('.nav-sub > #monthly_attendance span a ').click();
    // urlVisited(urls.baseUrl+urls.monthlyAttendance);
  });
});
