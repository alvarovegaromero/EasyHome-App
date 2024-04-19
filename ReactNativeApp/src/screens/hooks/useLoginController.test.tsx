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

const TestComponent = () => {
    const { username, setUsername, password, setPassword, handleLoginSubmit, navigateRegisterScreen, navigateResetPasswordScreen } = useLoginController();

    return (
        <View>
            <TextInput testID="usernameInput" value={username} onChangeText={setUsername} />
            <TextInput testID="passwordInput" value={password} onChangeText={setPassword} />
            <Button testID="submitButton" onPress={handleLoginSubmit} title="Submit" />
            <Button testID="registerButton" onPress={navigateRegisterScreen} title="Register" />
            <Button testID="resetPasswordButton" onPress={navigateResetPasswordScreen} title="Reset Password" />
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

interface ResponseObject {
    token: string;
    username: string;
}

const mockSuccesfulFetch = (response: ResponseObject) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(response),
            headers: new Headers(),
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
}

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
        mockSuccesfulFetch({ token: 'dummy_token', username: 'newUsername' });
    
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

        expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen', { username: 'newUsername' }); 
    });

    it('Should navigate to HomeScreen when login is successful', async () => {
        mockSuccesfulFetch({ token: 'dummy_token', username: 'newUsername' });

        const { getByTestId } = renderTestComponent();

        fireEvent.changeText(getByTestId('usernameInput'), 'newUsername');
        fireEvent.changeText(getByTestId('passwordInput'), 'newPassword');

        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });

        expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen', { username: 'newUsername' });
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

    it('should navigate to register screen', async () => {
        const { getByTestId } = renderTestComponent();

        await act(async () => {
            fireEvent.press(getByTestId('registerButton'));
        });

        expect(mockedNavigate).toHaveBeenCalledWith('RegisterScreen');
    });

    it('should navigate to reset password screen', async () => {
        const { getByTestId } = renderTestComponent();

        await act(async () => {
            fireEvent.press(getByTestId('resetPasswordButton'));
        });

        expect(mockedNavigate).toHaveBeenCalledWith('ResetPasswordScreen');
    });
});