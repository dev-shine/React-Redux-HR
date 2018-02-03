import {urls, user, apiUrls} from '../../../index';
import {signin, signout} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test dashboard', () => {
  it('after clicking button should load login page', () => {
    visitIndexRoute();
    urlVisited(urls.baseUrl);
    cy.server();
    // cy.route('PUT',data.apiUrl+`/template/update/**`).as('update');
    // cy.wait('@update');
    cy.get('#openLogin').click();
    urlVisited(urls.baseUrl + urls.login);
  });
});
