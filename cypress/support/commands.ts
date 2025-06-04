/// <reference types="cypress" />
import {
  closeModalSelector,
  ingredientCardLinkSelector,
  ingredientCardSelector,
  modalSelector
} from '../e2e/constructor/constants';

Cypress.Commands.add('addIngredientByName', (ingredientName: string) => {
  cy.contains(ingredientCardSelector, ingredientName)
    .should('exist')
    .within(() => {
      cy.contains('button', 'Добавить').should('exist').click();
    });
});

Cypress.Commands.add('openIngredientModal', (ingredientName: string) => {
  cy.contains(ingredientCardLinkSelector, ingredientName)
    .should('exist')
    .click();
});

Cypress.Commands.add('closeModal', () => {
  cy.get('#modals')
    .find(modalSelector)
    .should('exist')
    .find(closeModalSelector)
    .should('exist')
    .click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredientByName(ingredientName: string): Chainable<void>;
      openIngredientModal(ingredientName: string): Chainable<void>;
      closeModal(): Chainable<void>;
    }
  }
}

export {};
