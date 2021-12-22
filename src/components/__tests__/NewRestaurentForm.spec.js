import {render, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurentForm} from '../NewRestaurentForm';
import flushPromises from 'flush-promises';

describe('NewRestaurentForm', () => {
  const restaurentName = 'Kannught Place';
  const requiredError = 'Name is required';
  const serverError = 'The restaurent could not be saved. Please try again.';

  let createRestaurent;
  let context;
  beforeEach(() => {
    createRestaurent = jest.fn().mockName('createRestaurent');
    context = render(<NewRestaurentForm createRestaurent={createRestaurent} />);
  });

  describe('initially', () => {
    it('does not display a validation error', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).toBeNull();
    });

    it('does not display a server error', () => {
      const {queryByText} = context;
      expect(queryByText(serverError)).toBeNull();
    });
  });

  describe('when filled in', () => {
    beforeEach(async () => {
      createRestaurent.mockResolvedValue();
      const {getByPlaceholderText, getByTestId} = context;
      await userEvent.type(
        getByPlaceholderText('Add Restaurent'),
        restaurentName,
      );

      userEvent.click(getByTestId('create-a-new-restaurent'));

      return act(flushPromises);
    });

    it('calls createRestaurent with the name', () => {
      expect(createRestaurent).toHaveBeenCalledWith(restaurentName);
    });

    it('clears the name', () => {
      const {getByPlaceholderText} = context;
      expect(getByPlaceholderText('Add Restaurent').value).toEqual('');
    });

    it('does not display a validation error', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).toBeNull();
    });

    it('does not display a server error', () => {
      const {queryByText} = context;
      expect(queryByText(serverError)).toBeNull();
    });
  });

  describe('when empty', () => {
    beforeEach(async () => {
      createRestaurent.mockResolvedValue();

      const {getByPlaceholderText, getByTestId} = context;

      await userEvent.type(getByPlaceholderText('Add Restaurent'), '');

      userEvent.click(getByTestId('create-a-new-restaurent'));
      return act(flushPromises);
    });

    it('displays a validation error', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).not.toBeNull();
    });

    it('does not call createRestaurent', () => {
      expect(createRestaurent).not.toHaveBeenCalled();
    });
  });

  describe('when correcting a validation error', () => {
    beforeEach(async () => {
      createRestaurent.mockResolvedValue();
      const {getByPlaceholderText, getByTestId} = context;

      await userEvent.type(getByPlaceholderText('Add Restaurent'), '');
      userEvent.click(getByTestId('create-a-new-restaurent'));

      await act(flushPromises); //To await before interacting with component too early.

      await userEvent.type(
        getByPlaceholderText('Add Restaurent'),
        restaurentName,
      );
      userEvent.click(getByTestId('create-a-new-restaurent'));

      return act(flushPromises);
    });

    it('clears the validation error', () => {
      const {queryByText} = context;
      expect(queryByText(requiredError)).toBeNull();
    });
  });

  describe('when store action rejects', () => {
    beforeEach(async () => {
      createRestaurent.mockRejectedValue();

      const {getByPlaceholderText, getByTestId} = context;

      await userEvent.type(
        getByPlaceholderText('Add Restaurent'),
        restaurentName,
      );

      userEvent.click(getByTestId('create-a-new-restaurent'));

      return act(flushPromises);
    });

    it('displays a server error', () => {
      const {queryByText} = context;
      expect(queryByText(serverError)).not.toBeNull();
    });

    it('does not clear the name', () => {
      const {getByPlaceholderText} = context;
      expect(getByPlaceholderText('Add Restaurent').value).toEqual(
        restaurentName,
      );
    });
  });

  describe('when retrying after a server error', () => {
    beforeEach(async () => {
      createRestaurent.mockRejectedValueOnce().mockResolvedValueOnce();

      const {getByPlaceholderText, getByTestId} = context;

      await userEvent.type(
        getByPlaceholderText('Add Restaurent'),
        restaurentName,
      );

      userEvent.click(getByTestId('create-a-new-restaurent'));

      await act(flushPromises);

      userEvent.click(getByTestId('create-a-new-restaurent'));

      return act(flushPromises);
    });

    it('clears the server error', () => {
      const {queryByText} = context;
      expect(queryByText(serverError)).toBeNull();
    });
  });
});
