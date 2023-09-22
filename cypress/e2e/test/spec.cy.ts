describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Angular Seed');
    cy.contains('home works!');
  });
});
