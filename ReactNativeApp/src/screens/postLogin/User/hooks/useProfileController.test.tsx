import {act, renderHook, waitFor} from '@testing-library/react-native';
import useProfileController from './useProfileController';
import {
  mockFailedFetch,
  mockSuccesfulFetch,
} from '../../../../utils/utilsTestingHooks';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../../config';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('dummy_token')),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      addListener: jest
        .fn()
        .mockImplementation((event, callback) => callback()),
    }),
  };
});

const renderTestHookTest = () => {
  return renderHook(() => useProfileController());
};

describe('useLoginController', () => {
  it('should be undefined while fetchData has not been done', () => {
    const {result} = renderTestHookTest();

    expect(result.current.username).toBe('');
    expect(result.current.email).toBe('');
    expect(result.current.firstName).toBe('');
    expect(result.current.lastName).toBe('');
  });

  describe('fetchData', () => {
    it('should call proper endpoint for retrieving profile data', async () => {
      mockSuccesfulFetch({});

      renderTestHookTest();

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/api/users/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token dummy_token',
          },
        });
      });
    });

    it('should render the fetched data', async () => {
      const testData = {
        username: 'username',
        email: 'email@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      mockSuccesfulFetch(testData);

      const {result} = renderTestHookTest();

      await waitFor(() => {
        expect(result.current.username).toBe(testData.username);
        expect(result.current.email).toBe(testData.email);
        expect(result.current.firstName).toBe(testData.firstName);
        expect(result.current.lastName).toBe(testData.lastName);
      });
    });

    it('should handle fetch error', async () => {
      mockFailedFetch('Error');
      const alertSpy = jest.spyOn(Alert, 'alert');

      renderTestHookTest();

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Error');
      });
    });
  });

  describe('navigate', () => {
    it('should navigate to EditProfileScreen', () => {
      const {result} = renderTestHookTest();

      act(() => {
        result.current.navigateEditProfileScreen();
      });

      expect(mockedNavigate).toHaveBeenCalledWith('EditProfileScreen', {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
      });
    });

    it('should navigate to HomeScreen', () => {
      const {result} = renderTestHookTest();

      act(() => {
        result.current.handleGoBack();
      });

      expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen');
    });
  });
});
