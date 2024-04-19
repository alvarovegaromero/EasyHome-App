import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import useLoginController from './hooks/useLoginController';

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
}));

const renderLoginScreen = () => {
    return render(
        <NavigationContainer>
            <LoginScreen />
        </NavigationContainer>
    );
};


describe('LoginScreen', () => {
    it('should render initial states', () => {
        const { getByLabelText } = renderLoginScreen();

        expect(getByLabelText('Input for the username').props.value).toBe('');
        expect(getByLabelText('Input for the password').props.value).toBe('');
    });

    it('should update states', () => {
        const { getByLabelText } = renderLoginScreen();

        fireEvent.changeText(getByLabelText('Input for the username'), 'newUsername');
        fireEvent.changeText(getByLabelText('Input for the password'), 'newPassword');

        expect(getByLabelText('Input for the username').props.value).toBe('newUsername');
        expect(getByLabelText('Input for the password').props.value).toBe('newPassword');
    });
});