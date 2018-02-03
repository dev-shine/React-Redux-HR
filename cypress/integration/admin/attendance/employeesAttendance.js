import {urls, user, apiUrls} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test employees attendance listing', () => {
  it('employees list is loaded on left side panel', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #monthly_attendance').should('be.visible');
    cy.get('.nav > #monthly_attendance').click();
    cy.get('.nav-sub #home').should('be.visible');
    cy.get('.nav-sub #home').click();
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
    cy.get('#userList').should('be.visible');
  });
  it('first employee attendance details are shown on right panel', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #monthly_attendance').should('be.visible');
    cy.get('.nav > #monthly_attendance').click();
    cy.get('.nav-sub #home').should('be.visible');
    cy.get('.nav-sub #home').click();
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
    cy.get('#content').should('be.visible');
    cy.get('#content #calendar').should('be.visible');
  });
});
