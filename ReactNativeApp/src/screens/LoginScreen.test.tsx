import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
import useLoginController from './hooks/useLoginController';

jest.mock('./hooks/useLoginController', () => {
    const setUsername = jest.fn();
    const setPassword = jest.fn();
    const handleLoginSubmit = jest.fn();
    const navigateRegisterScreen = jest.fn();
    const navigateResetPasswordScreen = jest.fn();

    return () => ({
        username: '',
        setUsername,
        password: '',
        setPassword,
        handleLoginSubmit,
        navigateRegisterScreen,
        navigateResetPasswordScreen,
    });
});

const renderScreen = () => {
    return render(
        <LoginScreen />
    );
};


describe('LoginScreen', () => {
    it('should render all components', () => {
        const { getByTestId } = renderScreen();
    
        expect(getByTestId('Logo')).toBeTruthy();

        expect(getByTestId('UsernameInput')).toBeTruthy();
        expect(getByTestId('PasswordInput')).toBeTruthy();
    
        expect(getByTestId('LoginButton')).toBeTruthy();
        expect(getByTestId('RegisterButton')).toBeTruthy();
        expect(getByTestId('ResetPasswordButton')).toBeTruthy();
    });

    it('inputs should be empty at beginning', () => {
        const { getByTestId } = renderScreen();
    
        expect(getByTestId('UsernameInput').props.value).toBe('');
        expect(getByTestId('PasswordInput').props.value).toBe('');
    });

    it('should update states when inputs are changed', () => {
        const { getByTestId } = renderScreen();

        const { setUsername, setPassword } = useLoginController(); //mocked controller

        expect(setUsername).not.toHaveBeenCalledWith();
        expect(setPassword).not.toHaveBeenCalledWith();

        fireEvent.changeText(getByTestId('UsernameInput'), 'newUsername');
        fireEvent.changeText(getByTestId('PasswordInput'), 'newPassword');
        
        expect(setUsername).toHaveBeenCalledWith('newUsername');
        expect(setPassword).toHaveBeenCalledWith('newPassword');
    });

    it('should call the correct functions when buttons are pressed', () => {
        const { getByTestId } = renderScreen();
    
        const { handleLoginSubmit, navigateRegisterScreen, navigateResetPasswordScreen } = useLoginController();

        fireEvent.press(getByTestId('LoginButton'));
        fireEvent.press(getByTestId('RegisterButton'));
        fireEvent.press(getByTestId('ResetPasswordButton'));
        
        expect(handleLoginSubmit).toHaveBeenCalled();
        expect(navigateRegisterScreen).toHaveBeenCalled();
        expect(navigateResetPasswordScreen).toHaveBeenCalled();
    });
});