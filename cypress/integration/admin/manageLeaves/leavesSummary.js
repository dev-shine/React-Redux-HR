import {urls, user, apiUrls, monthName} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test leaves summary', () => {
  it('api will be fired and list all employees summary on page', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #manage_leaves').should('be.visible');
    cy.get('.nav > #manage_leaves').click();
    cy.get('.nav-sub > #leaves_summary').should('be.visible');
    cy.get('.nav-sub > #leaves_summary').click();
    urlVisited(urls.baseUrl + urls.leavesSummary);
    cy.get('.app-body').should('be.visible');
    cy.get('.app-body .padding').should('be.visible');
  });
});
