import { render, fireEvent, act } from '@testing-library/react-native';
import useLoginController from './useLoginController';
import { Alert, Button, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BASE_URL } from '../../config';

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));

const TestComponent = () => {
    const { username, setUsername, password, setPassword, handleLoginSubmit, navigateRegisterScreen, navigateResetPasswordScreen } = useLoginController();

    return (
        <View>
            <TextInput testID="usernameInput" value={username} onChangeText={setUsername} />
            <TextInput testID="passwordInput" value={password} onChangeText={setPassword} />
            <Button testID="submitButton" onPress={handleLoginSubmit} title="Submit" />
            <Button testID="registerButton" onPress={navigateRegisterScreen} title="Register" />
            <Button testID="resetPasswordButton" onPress={navigateResetPasswordScreen
            } title="Reset Password" />
        </View>
    );
};

const renderTestComponent = () => {
    return render(
        <NavigationContainer>
            <TestComponent/>
        </NavigationContainer>
    );
};

describe('useLoginController', () => {
    it('should update username and password state', () => {
        const { getByTestId } = renderTestComponent();
        fireEvent.changeText(getByTestId('usernameInput'), 'newUsername');
        fireEvent.changeText(getByTestId('passwordInput'), 'newPassword');

        expect(getByTestId('usernameInput').props.value).toBe('newUsername');
        expect(getByTestId('passwordInput').props.value).toBe('newPassword');
    });

    it('should handle login submit with empty username or password', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert');
        const { getByTestId } = renderTestComponent();

        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });

        expect(alertSpy).toHaveBeenCalledWith('Error', 'Username and password must be filled');
    });

    it('should handle login submit with valid username and password', async () => {
          global.fetch = jest.fn().mockImplementation(() => // mock fetch
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: 'dummy_token', username: 'newUsername' }),
                headers: new Headers(), // Needed for the fetch but not "used". Follow response's interface
                status: 200,
                statusText: 'OK',
                type: 'basic',
                clone: jest.fn(),
                body: null,
                bodyUsed: false,
                arrayBuffer: jest.fn(),
                blob: jest.fn(),
                formData: jest.fn(),
                text: jest.fn()
            })
        );
    
        const { getByTestId } = renderTestComponent();
    
        fireEvent.changeText(getByTestId('usernameInput'), 'newUsername');
        fireEvent.changeText(getByTestId('passwordInput'), 'newPassword');
    
        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });
    
        expect(fetch).toHaveBeenCalledWith(
            `${BASE_URL}/api/users/login`,
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: 'newUsername', password: 'newPassword' }),
            })
        );
    });

    it('should display alert when response is not ok', async () => {
        const errorResponse = {
            ok: false,
            status: 400,
            json: jest.fn().mockResolvedValue({ error: 'Invalid credentials' }),
        };
    
        global.fetch = jest.fn().mockResolvedValue(errorResponse);
    
        const alertSpy = jest.spyOn(Alert, 'alert');
    
        const { getByTestId } = renderTestComponent();
    
        fireEvent.changeText(getByTestId('usernameInput'), 'newUsername');
        fireEvent.changeText(getByTestId('passwordInput'), 'newPassword');
    
        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid credentials');
    });
});