describe('Smoke Test', () => {
  it('Can view the home page', () => {
    cy.visit('/');
    cy.contains('Learn React');
  });
});
