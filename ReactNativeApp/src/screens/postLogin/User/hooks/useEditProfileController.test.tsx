import {act, renderHook} from '@testing-library/react-native';
import useEditProfileController from './useEditProfileController';
import {Alert} from 'react-native';
import {
  mockFailedFetch,
  mockSuccesfulFetch,
} from '../../../../utils/utilsTestingHooks';
import React from 'react';
import {BASE_URL} from '../../../../config';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('dummy_token')),
}));

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockedGoBack,
      navigate: mockedNavigate,
    }),
  };
});

const renderTestHookTest = () => {
  return renderHook(() =>
    useEditProfileController(
      'initialUsername',
      'newEmail@email.com',
      'initialFirstName',
      'initialLastName',
    ),
  );
};

describe('useEditProfileController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render initial states', () => {
    const {result} = renderTestHookTest();

    expect(result.current.username).toBe('initialUsername');
    expect(result.current.email).toBe('newEmail@email.com');
    expect(result.current.firstName).toBe('initialFirstName');
    expect(result.current.lastName).toBe('initialLastName');
  });

  it('should update states', () => {
    const {result} = renderTestHookTest();

    act(() => {
      result.current.setUsername('newUsername');
      result.current.setEmail('newEmail');
      result.current.setFirstName('newFirstName');
      result.current.setLastName('newLastName');
    });

    expect(result.current.username).toBe('newUsername');
    expect(result.current.email).toBe('newEmail');
    expect(result.current.firstName).toBe('newFirstName');
    expect(result.current.lastName).toBe('newLastName');
  });

  describe('handleEditProfileSubmit', () => {
    it('should display an alert when email format is not valid', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');

      const {result} = renderTestHookTest();

      act(() => {
        result.current.setEmail('newEmail');
      });

      await act(async () => {
        await result.current.handleEditProfileSubmit();
      });

      expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid email format');
    });

    it('should handle successful edit profile submit', async () => {
      mockSuccesfulFetch({});

      const {result} = renderTestHookTest();

      act(() => {
        result.current.setUsername('newUsername');
      });

      await act(async () => {
        result.current.handleEditProfileSubmit();
      });

      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/users/profile`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token dummy_token`,
          },
          body: JSON.stringify({
            username: 'newUsername',
            email: 'newEmail@email.com',
            firstName: 'initialFirstName',
            lastName: 'initialLastName',
          }),
        }),
      );
    });

    it('should navigate to ProfileScreen after submit', async () => {
      mockSuccesfulFetch({});

      const {result} = renderTestHookTest();

      await act(async () => {
        result.current.handleEditProfileSubmit();
      });

      expect(mockedNavigate).toHaveBeenCalledWith('ProfileScreen');
    });

    it('should update context username when handleEditProfileSubmit is called', async () => {
      const mockSetContextUsername = jest.fn();
      const useContextSpy = jest.spyOn(React, 'useContext');
      useContextSpy.mockReturnValue({
        setContextUsername: mockSetContextUsername,
      });

      mockSuccesfulFetch({});

      const {result} = renderTestHookTest();

      act(() => {
        result.current.setUsername('newUsername');
      });

      await act(async () => {
        result.current.handleEditProfileSubmit();
      });

      expect(mockSetContextUsername).toHaveBeenCalledWith('newUsername');
    });

    it('should handle failed edit profile submit', async () => {
      mockFailedFetch('Failed');
      const alertSpy = jest.spyOn(Alert, 'alert');

      const {result} = renderTestHookTest();

      await act(async () => {
        result.current.handleEditProfileSubmit();
      });

      expect(alertSpy).toHaveBeenCalledWith('Error', 'Failed');
    });
  });

  describe('navigate', () => {
    it('should go back when handleGoBack is called', () => {
      const {result} = renderTestHookTest();

      act(() => {
        result.current.handleGoBack();
      });

      expect(mockedGoBack).toHaveBeenCalled();
    });
  });
});
