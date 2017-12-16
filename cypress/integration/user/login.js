import { urls, visitIndexRoute, urlVisited, user, signin } from '../../index';

describe('User login', () => {
  it('user should able to login and redirected to home page', () => {
    signin(user.user);
  });
});
