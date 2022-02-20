// short-link.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" />
const stages = ['Idea', 'Development', 'Testing', 'Deployment'];
describe('Assembly Line', () => {
  it('opens the site', () => {
    cy.visit('127.0.0.1:3000/');
  });

  it('render stages ', () => {
    cy.get('[data-cy=stage]');
    cy.get('[data-cy=stage]').each(($item, $index) => {
      cy.get('[data-cy=stage]').eq($index).should('have.text', stages[$index]);
    });
  });
  it('add the task to the first stage [idea] when press enter ', () => {
    cy.get('[data-cy=input]').type('task 1');
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=input]').type('task 2');
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=stage]')
      .eq(0)
      .parent()
      .find('[data-cy=task]')
      .first()
      .should('have.text', 'task 2');
  });
});
describe('Moving task 2 to next till the end', () => {
  afterEach(() => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
  });
  it('add the task to the next stage [development] when click left ', () => {
    cy.get('[data-cy=stage]').eq(0).parent().find('[data-cy=task]').first().click();
    cy.get('[data-cy=stage]').eq(1).parent().children('[data-cy=task]').contains('task 2');
    cy.get('[data-cy=stage]').eq(1).parent().not('[data-cy=task]');
  });

  it('add the task to the next stage [testing] when click left', () => {
    cy.get('[data-cy=stage]').eq(1).parent().find('[data-cy=task]').first().click();
    cy.get('[data-cy=stage]').eq(2).parent().children('[data-cy=task]').contains('task 2');
  });
  it('add the task to the next stage [deployment] when click left', () => {
    cy.get('[data-cy=stage]').eq(2).parent().find('[data-cy=task]').first().click();
    cy.get('[data-cy=stage]').eq(3).parent().children('[data-cy=task]').contains('task 2');
  });
  it('remove the task when click left on the last stage', () => {
    cy.get('[data-cy=stage]').eq(3).parent().find('[data-cy=task]').first().click();
    cy.get('[data-cy=stage]').eq(3).parent().not('[data-cy=task]');
  });
});

describe('Moving task 1 to next till the end', () => {
  afterEach(() => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
  });
  it('add the task to the next stage [development] when click left ', () => {
    cy.get('[data-cy=stage]').eq(0).parent().find('[data-cy=task]').first().click();
    cy.get('[data-cy=stage]').eq(1).parent().children('[data-cy=task]').contains('task 1');
    cy.get('[data-cy=stage]').eq(1).parent().not('[data-cy=task]');
  });

  it('add the task to the next stage [testing] when click left', () => {
    cy.get('[data-cy=stage]').eq(1).parent().find('[data-cy=task]').first().click();
    cy.get('[data-cy=stage]').eq(2).parent().children('[data-cy=task]').contains('task 1');
  });
  it('add the task to the next stage [deployment] when click left', () => {
    cy.get('[data-cy=stage]').eq(2).parent().find('[data-cy=task]').first().click();
    cy.get('[data-cy=stage]').eq(3).parent().children('[data-cy=task]').contains('task 1');
  });
});

describe('Moving task 1 to backward till the end', () => {
  afterEach(() => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
  });
  it('add the task to the previous stage [testing] when click right ', () => {
    cy.get('[data-cy=stage]').eq(3).parent().find('[data-cy=task]').first().rightclick();
    cy.get('[data-cy=stage]').eq(2).parent().children('[data-cy=task]').contains('task 1');
    cy.get('[data-cy=stage]').eq(3).parent().not('[data-cy=task]');
  });

  it('add the task to the previous stage [development] when click right', () => {
    cy.get('[data-cy=stage]').eq(2).parent().find('[data-cy=task]').first().rightclick();
    cy.get('[data-cy=stage]').eq(1).parent().children('[data-cy=task]').contains('task 1');
  });
  it('add the task to the previous stage [idea] when click right', () => {
    cy.get('[data-cy=stage]').eq(1).parent().find('[data-cy=task]').first().rightclick();
    cy.get('[data-cy=stage]').eq(0).parent().children('[data-cy=task]').contains('task 1');
  });
  it('remove the task when click right on the first stage', () => {
    cy.get('[data-cy=stage]').eq(0).parent().find('[data-cy=task]').first().rightclick();
    cy.get('[data-cy=stage]').eq(0).parent().not('[data-cy=task]');
  });
});
