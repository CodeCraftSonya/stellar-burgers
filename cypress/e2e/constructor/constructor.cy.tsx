/// <reference types="cypress" />

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
      cy.visit('/');
      cy.wait('@getIngredients');
    });
    it('should open the modal window of the ingredient', () => {
      cy.contains(
        '[data-testid="ingredient-card-link"]',
        'Краторная булка N-200i'
      )
        .should('exist')
        .click();
      cy.get('#modals')
        .find('[data-testid="ingredient-modal"]')
        .should('exist')
        .and('contain', 'Краторная булка N-200i');
    });
    it('should be closed by clicking on the cross', () => {
      cy.contains(
        '[data-testid="ingredient-card-link"]',
        'Краторная булка N-200i'
      )
        .should('exist')
        .click();
      cy.get('#modals')
        .find('[data-testid="modal"]')
        .should('exist')
        .find('[data-testid="close-modal"]')
        .should('exist')
        .click();
      cy.get('[data-testid="modal"]').should('not.exist');
    });
    it('should be closed by clicking on the overlay', () => {
      cy.contains(
        '[data-testid="ingredient-card-link"]',
        'Краторная булка N-200i'
      )
        .should('exist')
        .click();
      cy.get('#modals')
        .find('[data-testid="modal-overlay"]')
        .invoke('css', 'z-index', '9999')
        .click();
      cy.get('[data-testid="modal"]').should('not.exist');
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
        JSON.stringify('fakeRefreshToken')
      );
      cy.setCookie('accessToken', 'fakeAccessToken');
      cy.visit('/');
    });
    afterEach(() => {
      window.localStorage.clear();
      cy.clearCookies();
    });
    it('should create an order', () => {
      cy.contains('[data-testid="ingredient-card"]', 'Краторная булка N-200i')
        .should('exist')
        .within(() => {
          cy.contains('button', 'Добавить').should('exist').click();
        });
      cy.contains(
        '[data-testid="ingredient-card"]',
        'Биокотлета из марсианской Магнолии'
      )
        .should('exist')
        .within(() => {
          cy.contains('button', 'Добавить').should('exist').click();
        });
      cy.contains('button', 'Оформить заказ').should('exist').click();
      cy.wait('@postOrder');
      cy.get('#modals')
        .find('[data-testid="modal"]')
        .should('exist')
        .and('contain', '90909');
      cy.get('#modals')
        .find('[data-testid="modal"]')
        .should('exist')
        .find('[data-testid="close-modal"]')
        .should('exist')
        .click();
      cy.get('[data-testid="modal"]').should('not.exist');
      cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
      cy.get('[data-testid="constructor-bun-bottom"]').should('not.exist');
      cy.get('[data-testid="constructor-main"]').should(
        'not.contain',
        'Биокотлета из марсианской Магнолии'
      );
    });
  });
});
