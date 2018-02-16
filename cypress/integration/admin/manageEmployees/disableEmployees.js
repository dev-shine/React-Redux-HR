import {urls, user, apiUrls} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test disable profile page', () => {
  it('employees list is loaded on left side panel', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_users').should('be.visible');
    cy.get('.nav > #manage_users').click();
    cy.get('.nav-sub #disabled_employes').should('be.visible');
    cy.get('.nav-sub #disabled_employes').click();
    urlVisited(urls.baseUrl + urls.disabledEmployes);
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
    cy.get('#userListWrapper #userList').should('be.visible');
  });
  it('click on any employee on left side will show respective information on right sided panel', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_users').should('be.visible');
    cy.get('.nav > #manage_users').click();
    cy.get('.nav-sub #disabled_employes').should('be.visible');
    cy.get('.nav-sub #disabled_employes').click();
    urlVisited(urls.baseUrl + urls.disabledEmployes);
  });
});
