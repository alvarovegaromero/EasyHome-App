import {fireEvent, render} from '@testing-library/react-native';
import RegisterScreen from './RegisterScreen';
import useRegisterController from './hooks/useRegisterController';

jest.mock('./hooks/useRegisterController', () => {
  const setUsername = jest.fn();
  const setEmail = jest.fn();
  const setPassword = jest.fn();
  const setConfirmPassword = jest.fn();
  const setFirstName = jest.fn();
  const setLastName = jest.fn();
  const handleRegisterSubmit = jest.fn();
  const navigateLoginScreen = jest.fn();
  const navigateResetPasswordScreen = jest.fn();

  return () => ({
    username: '',
    setUsername,
    email: '',
    setEmail,
    password: '',
    setPassword,
    confirmPassword: '',
    setConfirmPassword,
    firstName: '',
    setFirstName,
    lastName: '',
    setLastName,
    handleRegisterSubmit,
    navigateLoginScreen,
    navigateResetPasswordScreen,
  });
});

const renderScreen = () => {
  return render(<RegisterScreen />);
};

describe('RegisterScreen', () => {
  it('should render all components', () => {
    const {getByTestId} = renderScreen();

    expect(getByTestId('UsernameInput')).toBeTruthy();
    expect(getByTestId('EmailInput')).toBeTruthy();
    expect(getByTestId('PasswordInput')).toBeTruthy();
    expect(getByTestId('ConfirmPasswordInput')).toBeTruthy();
    expect(getByTestId('FirstNameInput')).toBeTruthy();
    expect(getByTestId('LastNameInput')).toBeTruthy();

    expect(getByTestId('RegisterButton')).toBeTruthy();
    expect(getByTestId('LoginButton')).toBeTruthy();
    expect(getByTestId('ResetPasswordButton')).toBeTruthy();
  });

  it('inputs should be empty at beginning', () => {
    const {getByTestId} = renderScreen();

    expect(getByTestId('UsernameInput').props.value).toBe('');
    expect(getByTestId('EmailInput').props.value).toBe('');
    expect(getByTestId('PasswordInput').props.value).toBe('');
    expect(getByTestId('ConfirmPasswordInput').props.value).toBe('');
    expect(getByTestId('FirstNameInput').props.value).toBe('');
    expect(getByTestId('LastNameInput').props.value).toBe('');
  });

  it('should update state when input is changed', () => {
    const {getByTestId} = renderScreen();

    const {
      setUsername,
      setEmail,
      setPassword,
      setConfirmPassword,
      setFirstName,
      setLastName,
    } = useRegisterController();

    expect(setUsername).not.toHaveBeenCalled();
    expect(setEmail).not.toHaveBeenCalled();
    expect(setPassword).not.toHaveBeenCalled();
    expect(setConfirmPassword).not.toHaveBeenCalled();
    expect(setFirstName).not.toHaveBeenCalled();
    expect(setLastName).not.toHaveBeenCalled();

    fireEvent.changeText(getByTestId('UsernameInput'), 'newUsername');
    fireEvent.changeText(getByTestId('EmailInput'), 'newEmail');
    fireEvent.changeText(getByTestId('PasswordInput'), 'newPassword');
    fireEvent.changeText(
      getByTestId('ConfirmPasswordInput'),
      'newConfirmPassword',
    );
    fireEvent.changeText(getByTestId('FirstNameInput'), 'newFirstName');
    fireEvent.changeText(getByTestId('LastNameInput'), 'newLastName');

    expect(setUsername).toHaveBeenCalledWith('newUsername');
    expect(setEmail).toHaveBeenCalledWith('newEmail');
    expect(setPassword).toHaveBeenCalledWith('newPassword');
    expect(setConfirmPassword).toHaveBeenCalledWith('newConfirmPassword');
    expect(setFirstName).toHaveBeenCalledWith('newFirstName');
    expect(setLastName).toHaveBeenCalledWith('newLastName');
  });

  it('should call the correct functions when buttons are pressed', () => {
    const {getByTestId} = renderScreen();

    const {
      handleRegisterSubmit,
      navigateLoginScreen,
      navigateResetPasswordScreen,
    } = useRegisterController();

    expect(handleRegisterSubmit).not.toHaveBeenCalled();
    expect(navigateLoginScreen).not.toHaveBeenCalled();
    expect(navigateResetPasswordScreen).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('RegisterButton'));
    fireEvent.press(getByTestId('LoginButton'));
    fireEvent.press(getByTestId('ResetPasswordButton'));

    expect(handleRegisterSubmit).toHaveBeenCalled();
    expect(navigateLoginScreen).toHaveBeenCalled();
    expect(navigateResetPasswordScreen).toHaveBeenCalled();
  });
});
