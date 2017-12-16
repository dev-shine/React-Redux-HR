import { urls, visitIndexRoute, urlVisited } from '../../index';

describe('Test Logout', () => {
  it('testing logout functionality', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl+urls.login);
    cy.get('#usernameInput').type('arun');
    cy.get('#passwordInput').type('java@123');
    cy.get('#loginButton').click().wait(3000);
    urlVisited(urls.baseUrl+urls.home);
    cy.get('#Logout').click();
    urlVisited(urls.baseUrl);
  });
});
