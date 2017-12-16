import { urls, visitIndexRoute, urlVisited } from '../../index';

describe('Test Login Form.', () => {
  it('should not go to other page when left blank username/password', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl+urls.login);
    cy.get('#loginButton').click();
    urlVisited(urls.baseUrl+urls.login);
  });
  it('should not go to other page when left blank username/password', () => {
    cy.get('#usernameInput').type('arun');
    cy.get('#loginButton').click();
    urlVisited(urls.baseUrl+urls.login);
  });
  it('should not go to other page when left blank username/password', () => {
    cy.get('#usernameInput').type('wrongusername');
    cy.get('#passwordInput').type('wrongpassword');
    cy.get('#loginButton').click();
    cy.get('.sweet-alert').wait(3000).should('be.visible');
    cy.get('.confirm').click();
  });
  it('should not go to other page when left blank username/password', () => {
    cy.get('#usernameInput').clear().type('arun');
    cy.get('#passwordInput').clear().type('java@123');
    cy.get('#loginButton').click().wait(3000);
    urlVisited(urls.baseUrl+urls.home);
  });
});
