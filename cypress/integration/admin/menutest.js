import { urls, visitIndexRoute, urlVisited, user, signin, signinWithWhitespace, signout } from '../../index';

describe('Test Side menu', () => {
  it('login to admin page', () => {
    visitIndexRoute();
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl+urls.login);
    signin(user.admin);
    urlVisited(urls.baseUrl+urls.home);
  });
});
