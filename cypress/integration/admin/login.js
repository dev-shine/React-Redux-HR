import {urls, user, apiUrls} from './../../index';
import {signin, signout} from './../../helper';
import {urlVisited, visitIndexRoute} from './../../visitRoutes';

describe('Test Login Form.', () => {
  it('should not go to other page when left blank username/password', () => {
    signin(user.blankField);
    urlVisited(urls.baseUrl + urls.login);
  });
  it('when enter wrong data show error', () => {
    signin(user.adminWrongPassword);
    cy.get('.sweet-alert').should('be.visible');
    cy.get('.confirm').click();
  });
  it('login should success', () => {
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
  });
});
