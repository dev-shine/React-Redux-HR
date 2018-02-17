import {urls, signin, user, month, year, contains, click, wait, visitMailTemplates} from '../../../index';
import $ from 'jquery';

const deleteTemplate = () => {
  click('#template-4 .delete-style');
  cy.get('#template-4 .delete-style').within(() => {
    click('#template-4 .menuOptions span:last-child .fa-trash');
  });
};

describe('Test mail template page', () => {
  it('open page open will list all templates', () => {
    signin(user.admin);
    cy.wait(4000);
    visitMailTemplates();
    cy.get('#templatesList, #templatesList div').should('be.visible');
  });
  it('click on create new template modal, submitting new template form will list the newly added template', () => {
    cy.get('#createNewTemplate').should('be.visible');
    click('#createNewTemplate');
    click('.m-r-5');
  });
  xit('delete dropdown menu will result in delete of template', () => {
    $('html, body').animate({
      scrollTop: ($('#template-4').offset('top'))
    }, 2000);
    deleteTemplate();
  });
});
