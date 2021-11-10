import {render} from '@testing-library/react';
import {RestaurentList} from '../RestaurentList';

describe('RestaurentList', () => {
  it('loads restaurents on first render', () => {
    const loadRestaurents = jest.fn().mockName('loadRestaurents');
    render(<RestaurentList loadRestaurents={loadRestaurents} />);

    expect(loadRestaurents).toHaveBeenCalled();
  });
});
