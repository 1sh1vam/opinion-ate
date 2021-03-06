import {API_KEY} from '../../src/config';

describe('Listing Restaurents', () => {
  it('shows restaurents from the server', () => {
    const saladPlace = 'Salad Place';
    const pastaPlace = 'Pasta Place';

    cy.server({force404: true});

    cy.route({
      method: 'GET',
      url: `https://outside-in-dev-api.herokuapp.com/${API_KEY}/restaurants`,
      response: [
        {id: 1, name: saladPlace},
        {id: 2, name: pastaPlace},
      ],
    });

    cy.visit('/');
    cy.contains(saladPlace);
    cy.contains(pastaPlace);
  });
});
