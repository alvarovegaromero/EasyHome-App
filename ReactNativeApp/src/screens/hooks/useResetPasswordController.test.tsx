import { render, fireEvent, act } from '@testing-library/react-native';
import useResetPasswordController from './useResetPasswordController';
import { Alert, Button, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BASE_URL } from '../../config';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));


const TestComponent = () => {
    const { email, setEmail, handleResetPasswordSubmit } = useResetPasswordController();

    return (
        <View>
            <TextInput testID="emailInput" value={email} onChangeText={setEmail} />
            <Button testID="submitButton" onPress={handleResetPasswordSubmit} title="Submit" />
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

describe('useResetPasswordController', () => {
    it('should update email state', () => {
        const { getByTestId } = renderTestComponent();
        fireEvent.changeText(getByTestId('emailInput'), 'newEmail');

        expect(getByTestId('emailInput').props.value).toBe('newEmail');
    });

    it('should handle reset password submit with valid email', async () => {
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Reset password request sent successfully' }),
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
});