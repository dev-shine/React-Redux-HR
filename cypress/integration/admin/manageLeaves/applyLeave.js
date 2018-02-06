import {urls, user, apiUrls, monthName} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test apply leave page', () => {
  it('left panel will have all users list', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_leaves').should('be.visible');
    cy.get('.nav > #manage_leaves').click();
    cy.get('.nav-sub > #apply_leave').should('be.visible');
    cy.get('.nav-sub > #apply_leave').click();
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
  });
  it('clicking on any user on left panel and filling information on right side, click on apply button will apply leave', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_leaves').should('be.visible');
    cy.get('.nav > #manage_leaves').click();
    cy.get('.nav-sub > #apply_leave').should('be.visible');
    cy.get('.nav-sub > #apply_leave').click();
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
  });
});
