import {urls, user, apiUrls} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test profile page', () => {
  it('employees list is loaded on left side panel', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_users').should('be.visible');
    cy.get('.nav > #manage_users').click();
    cy.get('.nav-sub #manage_users').should('be.visible');
    cy.get('.nav-sub #manage_users').click();
    urlVisited(urls.baseUrl + urls.manageUsers);
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
    cy.get(' #userList').should('be.visible');
  });
  it('first employee profile details are shown on right panel', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_users').should('be.visible');
    cy.get('.nav > #manage_users').click();
    cy.get('.nav-sub #manage_users').should('be.visible');
    cy.get('.nav-sub #manage_users').click();
    urlVisited(urls.baseUrl + urls.manageUsers);
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
    cy.get(' #manage-user').should('be.visible');
  });
  it('add new employee form opens when click on Add New Employee button', () => {

  });
});
