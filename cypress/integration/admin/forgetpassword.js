import { urls, visitIndexRoute, urlVisited } from '../../index';

describe('Testing forget password', () => {
  it('testing forget password button while clicking', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl+urls.login);
    cy.get('#forgetPassword').click();
    urlVisited(urls.baseUrl+urls.forgotPassword);
    cy.get('#forgotPasswordInput').type('arun');
  });
});
