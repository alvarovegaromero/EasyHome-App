import {act, renderHook} from '@testing-library/react-native';
import useResetPasswordController from './useResetPasswordController';
import {Alert} from 'react-native';
import {BASE_URL} from '../../../config';
import {
  mockFailedFetch,
  mockSuccesfulFetch,
} from '../../../utils/utilsTestingHooks';

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
    }),
  };
});

const renderTestHookTest = () => {
  return renderHook(() => useResetPasswordController());
};

describe('useResetPasswordController', () => {
  it('should update email state', () => {
    const {result} = renderTestHookTest();

    act(() => {
      result.current.setEmail('newEmail');
    });

    expect(result.current.email).toBe('newEmail');
  });

  describe('handleResetPasswordSubmit', () => {
    it('should display an alert when email format is not valid', async () => {
      const alertSpy = jest.spyOn(Alert, 'alert');

      const {result} = renderTestHookTest();

      act(() => {
        result.current.setEmail('newEmail');
      });

      await act(() => {
        result.current.handleResetPasswordSubmit();
      });

      expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid email format');
    });

    it('should handle reset password submit with valid email', async () => {
      mockSuccesfulFetch({message: 'Reset password request sent successfully'});

      const {result} = renderTestHookTest();

      act(() => {
        result.current.setEmail('newEmail@example.com');
      });

      await act(() => {
        result.current.handleResetPasswordSubmit();
      });

      expect(fetch).toHaveBeenCalledWith(
        `${BASE_URL}/api/users/reset-password`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: 'newEmail@example.com'}),
        }),
      );
    });

    it('should display alert when response is not ok', async () => {
      mockFailedFetch('Invalid email');
      const alertSpy = jest.spyOn(Alert, 'alert');

      const {result} = renderTestHookTest();

      act(() => {
        result.current.setEmail('newEmail@example.com');
      });

      await act(() => {
        result.current.handleResetPasswordSubmit();
      });

      expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid email');
    });
  });

  describe('navigation', () => {
    it('should navigate to LoginScreen', () => {
      const {result} = renderTestHookTest();

      act(() => {
        result.current.navigateLoginScreen();
      });

      expect(mockedNavigate).toHaveBeenCalledWith('LoginScreen');
    });

    it('should navigate to RegisterScreen', () => {
      const {result} = renderTestHookTest();

      act(() => {
        result.current.navigateRegisterScreen();
      });

      expect(mockedNavigate).toHaveBeenCalledWith('RegisterScreen');
    });
  });
});
