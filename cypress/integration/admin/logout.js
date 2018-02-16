import {urls, user, apiUrls} from './../../index';
import {signin, signout} from './../../helper';
import {urlVisited, visitIndexRoute} from './../../visitRoutes';

describe('Test Logout', () => {
  it('testing logout functionality', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl + urls.login);
    cy.get('#usernameInput').type('arun');
    cy.get('#passwordInput').type('java@123');
    cy.get('#loginButton').click();
    urlVisited(urls.baseUrl + urls.home);
    cy.get('#logout').click();
    urlVisited(urls.baseUrl);
  });
});
