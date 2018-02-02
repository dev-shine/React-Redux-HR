import { urls, apiUrls, visitIndexRoute, urlVisited, user, signin, signinWithWhitespace, signout } from '../../index';

describe('Test holidays', () => {
  it('holidays list is not empty', () => {
    cy.server();
    cy.route({method:'POST',url: apiUrls.apiUrl}).as('login');
    signin(user.admin);
    urlVisited(urls.baseUrl+urls.home);
    cy.get('#holidays').should('be.visible');
    cy.get('#holidays').click();
    urlVisited(urls.baseUrl+urls.holidays);
  });
});
