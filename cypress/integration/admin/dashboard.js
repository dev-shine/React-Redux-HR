import { urls, visitIndexRoute, urlVisited } from '../../index';

describe('Test dashboard', () => {
  it('cheking page is change to login', () => {
    visitIndexRoute();
    urlVisited(urls.baseUrl);
    cy.server();
    // cy.route('PUT',data.apiUrl+`/template/update/**`).as('update');
    // cy.wait('@update');
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl+urls.login);
  });
});
