import { urls, apiUrls, visitIndexRoute, urlVisited, user, signin, signout } from '../../index';

describe('Test Login Form.', () => {
  it('should not go to other page when left blank username/password', () => {
    signin(user.blankField);
    urlVisited(urls.baseUrl+urls.login);
  });
  it('when enter wrong data show error', () => {
    signin(user.adminWrongPassword);
    cy.get('.sweet-alert').should('be.visible');
    cy.get('.confirm').click();
  });
  it('login should success', () => {
    signin(user.admin)
    urlVisited(urls.baseUrl+urls.home);
  });
});
