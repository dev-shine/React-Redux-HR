import { urls, visitIndexRoute, urlVisited } from '../../index';

describe('Test Login Form.', () => {
  it('.should() - assert that <title> is correct', () => {
    visitIndexRoute();
    urlVisited(urls.baseUrl);
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl+urls.login);
  });
});
