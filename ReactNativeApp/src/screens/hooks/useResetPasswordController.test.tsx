import { render, fireEvent, act } from '@testing-library/react-native';
import useResetPasswordController from './useResetPasswordController';
import { Alert, Button, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BASE_URL } from '../../config';

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
    const { email, setEmail, handleResetPasswordSubmit, navigateLoginScreen, navigateRegisterScreen } = useResetPasswordController();

    return (
        <View>
            <TextInput testID="emailInput" value={email} onChangeText={setEmail} />
            <Button testID="submitButton" onPress={handleResetPasswordSubmit} title="Submit" />
            <Button testID="loginButton" onPress={navigateLoginScreen} title="Login" />
            <Button testID="registerButton" onPress={navigateRegisterScreen} title="Register" />
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
    message: string;
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

describe('useResetPasswordController', () => {
    it('should update email state', () => {
        const { getByTestId } = renderTestComponent();
        fireEvent.changeText(getByTestId('emailInput'), 'newEmail');

        expect(getByTestId('emailInput').props.value).toBe('newEmail');
    });

    it('should handle reset password submit with valid email', async () => {
        mockSuccesfulFetch({ message: 'Reset password request sent successfully' });
    
        const { getByTestId } = renderTestComponent();
    
        fireEvent.changeText(getByTestId('emailInput'), 'newEmail@example.com');
    
        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });
    
        expect(fetch).toHaveBeenCalledWith(
            `${BASE_URL}/api/users/reset-password`,
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: 'newEmail@example.com' }),
            })
        );
    });
    
    it('should display alert when response is not ok', async () => {
        const errorResponse = {
            ok: false,
            status: 400,
            json: jest.fn().mockResolvedValue({ error: 'Invalid email' }),
        };
    
        global.fetch = jest.fn().mockResolvedValue(errorResponse);
    
        const alertSpy = jest.spyOn(Alert, 'alert');
    
        const { getByTestId } = renderTestComponent();
    
        fireEvent.changeText(getByTestId('emailInput'), 'newEmail@example.com');
    
        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid email');
    });

    it('should navigate to login screen', () => {
        const { getByTestId } = renderTestComponent();
        fireEvent.press(getByTestId('loginButton'));

        expect(mockedNavigate).toHaveBeenCalledWith('LoginScreen');
    });

    it('should navigate to register screen', () => {
        const { getByTestId } = renderTestComponent();
        fireEvent.press(getByTestId('registerButton'));

        expect(mockedNavigate).toHaveBeenCalledWith('RegisterScreen');
    });
});