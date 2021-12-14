import {render} from '@testing-library/react';
import {RestaurentList} from '../RestaurentList';

describe('RestaurentList', () => {
  const restaurents = [
    {id: 1, name: 'Salad Place'},
    {id: 2, name: 'Pasta Place'},
  ];
  let loadRestaurents;
  let context;

  const renderWithProps = (propOverrides = {}) => {
    const props = {
      loadRestaurents: jest.fn().mockName('loadRestaurants'),
      restaurents,
      loading: false,
      loadingError: false,
      ...propOverrides,
    };

    loadRestaurents = props.loadRestaurents;

    context = render(<RestaurentList {...props} />);
  };

  it('loads restaurents on first render', () => {
    renderWithProps();
    expect(loadRestaurents).toHaveBeenCalled();
  });

  describe('when loading succeeds', () => {
    beforeEach(() => {
      renderWithProps();
    });

    it('display the restaurents', () => {
      const {queryByText} = context;

      expect(queryByText('Salad Place')).not.toBeNull();
      expect(queryByText('Pasta Place')).not.toBeNull();
    });

    it('does not display loading indicator while not loading', async () => {
      const {queryByTestId} = context;
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    it('does not display the error messsage', () => {
      const {queryByText} = context;
      expect(queryByText('Restaurents could not be loaded.')).toBeNull();
    });
  });

  describe('when loading fails', () => {
    beforeEach(() => {
      renderWithProps({loadingError: true});
    });

    it('displays the error message', () => {
      const {queryByText} = context;
      expect(queryByText('Restaurents could not be loaded.')).not.toBeNull();
    });
  });

  it('displays the loading indicator while loading', async () => {
    renderWithProps({loading: true});
    const {queryByTestId} = context;

    expect(queryByTestId('loading-indicator')).not.toBeNull();
  });

});
