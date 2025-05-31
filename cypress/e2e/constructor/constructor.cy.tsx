/// <reference types="cypress" />

describe('Constructor Testing', () => {
  describe('constructor', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      // cy.intercept('GET', `${URL}//auth/user`, { fixture: 'user.json' }).as(
      //   'getUser'
      // );
      cy.visit('/');
      cy.wait('@getIngredients');
    });
    it('should add a bun to the constructor', () => {
      cy.contains('[data-testid="ingredient-card"]', 'Краторная булка N-200i')
        .should('exist')
        .within(() => {
          cy.contains('button', 'Добавить').should('exist').click();
        });

      cy.get('[data-testid="constructor-bun-top"]').should(
        'contain',
        'Краторная булка N-200i'
      );
      cy.get('[data-testid="constructor-bun-bottom"]').should(
        'contain',
        'Краторная булка N-200i'
      );
    });
    it('should add an ingredient to the constructor', () => {
      cy.contains(
        '[data-testid="ingredient-card"]',
        'Биокотлета из марсианской Магнолии'
      )
        .should('exist')
        .within(() => {
          cy.contains('button', 'Добавить').should('exist').click();
        });

      cy.get('[data-testid="constructor-main"]').should(
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
      // cy.intercept('GET', `${URL}//auth/user`, { fixture: 'user.json' }).as(
      //   'getUser'
      // );
      cy.visit('/');
      cy.wait('@getIngredients');
    });
    it('should open the modal window of the ingredient', () => {});
    it('should be closed by clicking on the cross', () => {});
    it('should be closed by clicking on the overlay', () => {});
  });
  describe('create an order', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');
      // cy.intercept('GET', 'auth/user', { fixture: 'user.json' }).as(
      //   'getUser'
      // );
      // cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      //   'postOrder'
      // );
      cy.visit('/');
      cy.wait('@getIngredients');
    });
  });
});
