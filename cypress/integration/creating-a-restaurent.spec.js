import {API_KEY} from '../../src/config';

describe('Creating a restaurent', () => {
  it('allows creating a restaurent', () => {
    const restaurentId = 21;
    const restaurentName = 'Kannught Place';

    cy.server({force404: true});

    cy.route({
      method: 'GET',
      url: `https://outside-in-dev-api.herokuapp.com/${API_KEY}/restaurants`,
      response: [],
    });

    cy.route({
      method: 'POST',
      url: `https://outside-in-dev-api.herokuapp.com/${API_KEY}/restaurants`,
      response: [
        {
          id: restaurentId,
          name: restaurentName,
        },
      ],
    }).as('addRestaurent');

    cy.visit('/');

    cy.get('[placeholder="Add Restaurent"]').type(restaurentName);
    cy.contains('Add').click();

    cy.wait('@addRestaurent').its('requestBody').should('deep.equal', {
      name: restaurentName,
    });

    cy.contains(restaurentName);
  });
});
