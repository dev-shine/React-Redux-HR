import {urls, user, click, shouldBeVisible} from '../../../index';
import {signin} from '../../../helper';
import {urlVisited} from '../../../visitRoutes';

describe('Test disable profile page', () => {
  it('employees list is loaded on left side panel', () => {
    signin(user.admin);
    cy.wait(4000);
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.nav > #manage_users');
    click('.nav > #manage_users');
    shouldBeVisible('.nav-sub #disabled_employes');
    click('.nav-sub #disabled_employes');
    urlVisited(urls.baseUrl + urls.disabledEmployes);
    shouldBeVisible('.app-body');
    shouldBeVisible('#userListWrapper #userList');
  });
  it('click on any employee on left side will show respective information on right sided panel', () => {
    signin(user.admin);
    cy.wait(4000);
    urlVisited(urls.baseUrl + urls.home);
    shouldBeVisible('.nav > #manage_users');
    click('.nav > #manage_users');
    shouldBeVisible('.nav-sub #disabled_employes');
    click('.nav-sub #disabled_employes');
    urlVisited(urls.baseUrl + urls.disabledEmployes);
  });
});
