import {urls, user, month, year, contains, click, wait, shouldNotBeVisble, shouldBeVisible} from '../../../index';
import {signin, signout, apiCall} from '../../../helper';
import {urlVisited, visitIndexRoute} from '../../../visitRoutes';

describe('Test add variable', () => {
  xit('open page open will list all variables', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #mail_templates').should('be.visible');
    cy.get('.nav > #mail_templates').click();
    cy.get('.nav-sub #add_variables').should('be.visible');
    cy.get('.nav-sub #add_variables').click();
    urlVisited(urls.baseUrl + urls.addVariables);
    cy.get('.variable-list').should('be.visible');
  });
  xit('click on add new variable modal, submitting new variable form will list the newly added variable', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #mail_templates').should('be.visible');
    cy.get('.nav > #mail_templates').click();
    cy.get('.nav-sub #add_variables').should('be.visible');
    cy.get('.nav-sub #add_variables').click();
    urlVisited(urls.baseUrl + urls.addVariables);
    cy.get('#add-new-variable').should('be.visible');
        // Testing for variable other than Header/Footer
    cy.get('#add-new-variable').click();
    cy.get('#add-variable-form').should('be.visible');
    cy.get('.form-group > .variable-code').should('be.visible');
    cy.get('.variable-code > input').type('testCodeVariable');
    cy.get('.form-group .otherThanHeaderFooter').should('be.visible');
    cy.get('.form-group .otherThanHeaderFooter').click();
    cy.get('.form-group .DraftEditor-root').should('be.visible');
    cy.get('.public-DraftEditor-content').focus().type(' Cypress testing for variable other than Header/Footer.');
    cy.get('.add-variable-dialog .action-buttons div > button').should('be.visible');
    cy.get('.add-variable-dialog .action-buttons div > button').click();
        // Testing for Header/Footer Variable
        // cy.get('#add-new-variable').click();
        // cy.get('#add-variable-form').should('be.visible');
        // cy.get('.form-group > .variable-code').should('be.visible');
        // cy.get('.variable-code > input').type('testCodeVariable');
        // cy.get('.form-group .headerFooter').should('be.visible');
        // cy.get('.form-group .headerFooter').click();
        // cy.get('.form-group .show > textarea').should('be.visible');
        // cy.get('.form-group .show > textarea').type(' Cypress testing for Header/Footer variable.')
        // cy.get('.add-variable-dialog .action-buttons div > button').should('be.visible');
        // cy.get('.add-variable-dialog .action-buttons div > button').click();
  });
  it('delete on right side panel will reuslt to delete of variable', () => {
    visitIndexRoute();
    signin(user.admin);
    urlVisited(urls.baseUrl + urls.home);
    cy.get('.nav > #mail_templates').should('be.visible');
    cy.get('.nav > #mail_templates').click();
    cy.get('.nav-sub #add_variables').should('be.visible');
    cy.get('.nav-sub #add_variables').click();
    urlVisited(urls.baseUrl + urls.addVariables);
        // For testing delete functionality- first we add a new variable and then delete it.
    var variableCode = 'testing-delete';
    cy.get('#add-new-variable').click();
    cy.get('#add-variable-form').should('be.visible');
    cy.get('.form-group > .variable-code').should('be.visible');
    cy.get('.variable-code > input').type(variableCode);
    cy.get('.form-group .otherThanHeaderFooter').should('be.visible');
    cy.get('.form-group .otherThanHeaderFooter').click();
    cy.get('.form-group .DraftEditor-root').should('be.visible');
    cy.get('.public-DraftEditor-content').focus().type(' Testing Delete');
    cy.get('.add-variable-dialog .action-buttons div > button').should('be.visible');
    cy.get('.add-variable-dialog .action-buttons div > button').click();
    cy.get('.add-variable-dialog .action-buttons > button').click();
    cy.get('.table-responsive').should('be.visible');
    cy.get('.table-responsive .variable-table-body').should('be.visible');
    cy.get('.variable-list').should('be.visible');
    cy.get('.variable-list > .variable-table-body').should('be.visible');
    cy.get('.variable-list > .variable-table-body > tr').should('have', variableCode + '_tr');
    cy.get('.variable-list > .variable-table-body button').should('have', variableCode + '_button');
    cy.get('.variable-list > .variable-table-body #' + variableCode + '_button').should('be.visible');
    cy.get('.variable-list > .variable-table-body #' + variableCode + '_button').click();
  });
});
