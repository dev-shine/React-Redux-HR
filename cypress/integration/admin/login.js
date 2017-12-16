import { urls, visitIndexRoute, urlVisited } from '../../index';

describe('Test Login Form.', () => {
  it('.should() - assert that <title> is correct', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl+urls.login);
    cy.get('#loginButton').click();
    urlVisited(urls.baseUrl+urls.login);
    cy.get('#usernameInput').type('arun');
    cy.get('#loginButton').click();
    urlVisited(urls.baseUrl+urls.login);
    cy.get('#usernameInput').type('wrongusername');
    cy.get('#passwordInput').type('wrongpassword');
    cy.get('#loginButton').click();
    cy.get('.sweet-alert').wait(3000).should('be.visible');
    cy.get('.confirm').click();
    cy.get('#usernameInput').clear().type('arun');
    cy.get('#passwordInput').clear().type('java@123');
    cy.get('#loginButton').click().wait(3000);
    urlVisited(urls.baseUrl+urls.home);
  });
});
