/// <reference types="cypress" />
import '../../support/commands';
import {
  bunBottomSelector,
  bunTopSelector,
  ingredientModalSelector,
  mainSelector,
  modalOverlaySelector,
  modalSelector
} from './constants';

describe('Constructor Testing', () => {
  describe('constructor', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      cy.visit('/');
      cy.wait('@getIngredients');
    });
    it('should add a bun to the constructor', () => {
      cy.addIngredientByName('Краторная булка N-200i');
      cy.get(bunTopSelector).should('contain', 'Краторная булка N-200i');
      cy.get(bunBottomSelector).should('contain', 'Краторная булка N-200i');
    });
    it('should add an ingredient to the constructor', () => {
      cy.addIngredientByName('Биокотлета из марсианской Магнолии');
      cy.get(mainSelector).should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );
    });
  });
  describe('modals', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      cy.visit('/');
      cy.wait('@getIngredients');
    });
    it('should open the modal window of the ingredient', () => {
      cy.openIngredientModal('Краторная булка N-200i');
      cy.get('#modals')
        .find(ingredientModalSelector)
        .should('exist')
        .and('contain', 'Краторная булка N-200i');
    });
    it('should be closed by clicking on the cross', () => {
      cy.openIngredientModal('Краторная булка N-200i');
      cy.closeModal();
      cy.get(modalSelector).should('not.exist');
    });
    it('should be closed by clicking on the overlay', () => {
      cy.openIngredientModal('Краторная булка N-200i');
      cy.get('#modals')
        .find(modalOverlaySelector)
        .invoke('css', 'z-index', '9999')
        .click();
      cy.get(modalSelector).should('not.exist');
    });
  });
  describe('create an order', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
        'postOrder'
      );
      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('mockRefreshToken')
      );
      cy.setCookie('accessToken', 'mockAccessToken');
      cy.visit('/');
    });
    afterEach(() => {
      window.localStorage.clear();
      cy.clearCookies();
    });
    it('should create an order', () => {
      cy.addIngredientByName('Краторная булка N-200i');
      cy.addIngredientByName('Биокотлета из марсианской Магнолии');
      cy.contains('button', 'Оформить заказ').should('exist').click();
      cy.wait('@postOrder');
      cy.get('#modals')
        .find(modalSelector)
        .should('exist')
        .and('contain', '90909');
      cy.closeModal();
      cy.get(modalSelector).should('not.exist');
      cy.get(bunTopSelector).should('not.exist');
      cy.get(bunBottomSelector).should('not.exist');
      cy.get(mainSelector).should(
        'not.contain',
        'Биокотлета из марсианской Магнолии'
      );
    });
  });
});
