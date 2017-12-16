import { urls, visitIndexRoute, urlVisited } from '../../index';

describe('Test Login Form.', () => {
  it('.should() - assert that <title> is correct', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl+urls.login);
    cy.get('#forgetPassword').click();
    urlVisited(urls.baseUrl+urls.forgotPassword);
    cy.get('#forgotPasswordInput').type('arun'); 
  });
});
