import { urls, visitIndexRoute, urlVisited } from '../../index';

describe('Test dashboard', () => {
  it('After user able to login successfull it should redirecet to monthly attendance route ', () => {
    signin(user.user);
    urlVisited(urls.baseUrl+urls.monthlyAttendance);
  });
  it('after user login user should able to see current month attendance', () => {
    signin(user.user);
    urlVisited(urls.baseUrl+urls.monthlyAttendance);
    cy.get()
  });
});
