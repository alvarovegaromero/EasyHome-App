import { render, fireEvent, act } from '@testing-library/react-native';
import useRegisterController from './useRegisterController';
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
    const { username, setUsername, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, firstName, setFirstName, lastName, setLastName, handleRegisterSubmit} = useRegisterController();

    return (
        <View>
            <TextInput testID="usernameInput" value={username} onChangeText={setUsername} />
            <TextInput testID="emailInput" value={email} onChangeText={setEmail} />
            <TextInput testID="passwordInput" value={password} onChangeText={setPassword} />
            <TextInput testID="confirmPasswordInput" value={confirmPassword} onChangeText={setConfirmPassword} />
            <TextInput testID="firstNameInput" value={firstName} onChangeText={setFirstName} />
            <TextInput testID="lastNameInput" value={lastName} onChangeText={setLastName} />
            <Button testID="submitButton" onPress={handleRegisterSubmit} title="Submit" />
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

describe('useRegisterController', () => {
    it('should update state', () => {
        const { getByTestId } = renderTestComponent();
        fireEvent.changeText(getByTestId('usernameInput'), 'newUsername');
        fireEvent.changeText(getByTestId('emailInput'), 'newEmail');
        fireEvent.changeText(getByTestId('passwordInput'), 'newPassword');
        fireEvent.changeText(getByTestId('confirmPasswordInput'), 'newPassword');
        fireEvent.changeText(getByTestId('firstNameInput'), 'newFirstName');
        fireEvent.changeText(getByTestId('lastNameInput'), 'newLastName');

        expect(getByTestId('usernameInput').props.value).toBe('newUsername');
        expect(getByTestId('emailInput').props.value).toBe('newEmail');
        expect(getByTestId('passwordInput').props.value).toBe('newPassword');
        expect(getByTestId('confirmPasswordInput').props.value).toBe('newPassword');
        expect(getByTestId('firstNameInput').props.value).toBe('newFirstName');
        expect(getByTestId('lastNameInput').props.value).toBe('newLastName');
    });

    it('should display an alert when username, email, password, or confirmPassword are empty', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert');
        const { getByTestId } = renderTestComponent();
    
        fireEvent.changeText(getByTestId('usernameInput'), '');
        fireEvent.changeText(getByTestId('emailInput'), '');
        fireEvent.changeText(getByTestId('passwordInput'), '');
        fireEvent.changeText(getByTestId('confirmPasswordInput'), '');
    
        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Username, email, password and confirmation password must be filled');
    });
    
    it('should display an alert when passwords do not match', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert');
        const { getByTestId } = renderTestComponent();
    
        fireEvent.changeText(getByTestId('usernameInput'), 'newUsername');
        fireEvent.changeText(getByTestId('emailInput'), 'newEmail');
        fireEvent.changeText(getByTestId('passwordInput'), 'newPassword');
        fireEvent.changeText(getByTestId('confirmPasswordInput'), 'differentPassword');
    
        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Passwords do not match. Please enter matching passwords.');
    });

    it('should handle register submit with valid username, email, password, and confirmPassword', async () => {
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: 'dummy_token', username: 'newUsername' }),
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
    
        const { getByTestId } = renderTestComponent();
    
        fireEvent.changeText(getByTestId('usernameInput'), 'newUsername');
        fireEvent.changeText(getByTestId('emailInput'), 'newEmail');
        fireEvent.changeText(getByTestId('passwordInput'), 'newPassword');
        fireEvent.changeText(getByTestId('confirmPasswordInput'), 'newPassword');
    
        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });
    
        expect(fetch).toHaveBeenCalledWith(
            `${BASE_URL}/api/users/register`,
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: 'newUsername', email: 'newEmail', password: 'newPassword', confirmPassword: 'newPassword'}),
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
        fireEvent.changeText(getByTestId('emailInput'), 'newEmail');
        fireEvent.changeText(getByTestId('passwordInput'), 'newPassword');
        fireEvent.changeText(getByTestId('confirmPasswordInput'), 'newPassword');
    
        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid credentials');
    });
});