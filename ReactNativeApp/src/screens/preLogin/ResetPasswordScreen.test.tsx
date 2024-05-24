import {fireEvent, render} from '@testing-library/react-native';
import ResetPasswordScreen from './ResetPasswordScreen';
import useResetPasswordController from './hooks/useResetPasswordController';

jest.mock('./hooks/useResetPasswordController', () => {
  const setEmail = jest.fn();
  const handleResetPasswordSubmit = jest.fn();
  const navigateLoginScreen = jest.fn();
  const navigateRegisterScreen = jest.fn();

  return () => ({
    email: '',
    setEmail,
    handleResetPasswordSubmit,
    navigateLoginScreen,
    navigateRegisterScreen,
  });
});

const renderScreen = () => {
  return render(<ResetPasswordScreen />);
};

describe('ResetPasswordScreen', () => {
  it('should render all components', () => {
    const {getByTestId} = renderScreen();

    expect(getByTestId('Logo')).toBeTruthy();

    expect(getByTestId('EmailInput')).toBeTruthy();

    expect(getByTestId('ResetPasswordButton')).toBeTruthy();
    expect(getByTestId('LoginButton')).toBeTruthy();
    expect(getByTestId('RegisterButton')).toBeTruthy();
  });

  it('input should be empty at beginning', () => {
    const {getByTestId} = renderScreen();

    expect(getByTestId('EmailInput').props.value).toBe('');
  });

  it('should update state when input is changed', () => {
    const {getByTestId} = renderScreen();

    const {setEmail} = useResetPasswordController();

    expect(setEmail).not.toHaveBeenCalled();

    fireEvent.changeText(getByTestId('EmailInput'), 'newEmail');

    expect(setEmail).toHaveBeenCalledWith('newEmail');
  });

  it('should call the correct functions when buttons are pressed', () => {
    const {getByTestId} = renderScreen();

    const {
      handleResetPasswordSubmit,
      navigateLoginScreen,
      navigateRegisterScreen,
    } = useResetPasswordController();

    expect(handleResetPasswordSubmit).not.toHaveBeenCalled();
    expect(navigateLoginScreen).not.toHaveBeenCalled();
    expect(navigateRegisterScreen).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('ResetPasswordButton'));
    fireEvent.press(getByTestId('LoginButton'));
    fireEvent.press(getByTestId('RegisterButton'));

    expect(handleResetPasswordSubmit).toHaveBeenCalled();
    expect(navigateLoginScreen).toHaveBeenCalled();
    expect(navigateRegisterScreen).toHaveBeenCalled();
  });
});
