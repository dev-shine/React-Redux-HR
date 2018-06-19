import {urls, user, click, shouldBeVisible,wait} from '../../../index';
import {signin} from '../../../helper';
import {urlVisited} from '../../../visitRoutes';

describe('Test inventory overview',()=>{
    it('header title in inventory overview',()=>{
        signin(user.admin);
        cy.visit(urls.baseUrl + urls.inventoryOverviewDetail);
        cy.wait(4000);
        shouldBeVisible('.app');
        shouldBeVisible('.row');
        cy.wait(4000);
        cy.get('.navbar .navbar-item').contains('Inventory Overview');
    });
    it('click on device will short device accordingly',()=>{
        signin(user.admin);
        urlVisited(urls.baseUrl + urls.home);
        cy.wait(4000);
         cy.visit(urls.baseUrl + urls.inventoryOverviewDetail);
         click('text-muted');
         wait(3000);
         urlVisited(urls.baseUrl + urls.inventory_system);
         shouldBeVisible('.navbar');
         shouldBeVisible('.app-body');
         cy.get('.navbar .navbar-item').contains('Inventory Management');
    })
});