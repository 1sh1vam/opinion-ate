import {render} from '@testing-library/react';
import {RestaurentList} from '../RestaurentList';

describe('RestaurentList', () => {
  const restaurents = [
    {id: 1, name: 'Salad Place'},
    {id: 2, name: 'Pasta Place'},
  ];
  let loadRestaurents;
  let context;
  beforeEach(() => {
    loadRestaurents = jest.fn().mockName('loadRestaurants');
    context = render(
      <RestaurentList
        loadRestaurents={loadRestaurents}
        restaurents={restaurents}
      />,
    );
  });

  it('loads restaurents on first render', () => {
    expect(loadRestaurents).toHaveBeenCalled();
  });

  it('display the restaurents', () => {
    const {queryByText} = context;

    expect(queryByText('Salad Place')).not.toBeNull();
    expect(queryByText('Pasta Place')).not.toBeNull();
  });
});
