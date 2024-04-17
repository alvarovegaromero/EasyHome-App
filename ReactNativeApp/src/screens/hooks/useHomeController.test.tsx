import { render, fireEvent, act } from '@testing-library/react-native';
import useHomeController from './useHomeController';
import { Alert, Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BASE_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('dummy_token')),
    removeItem: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));

const TestComponent = () => {
    const { handleLogout } = useHomeController();

    return (
        <View>
            <Button testID="logoutButton" onPress={handleLogout} title="Logout" />
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

describe('useHomeController', () => {
    it('should handle logout', async () => {
        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Logged out successfully' }),
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

        await act(async () => {
            fireEvent.press(getByTestId('logoutButton'));
        });

        expect(fetch).toHaveBeenCalledWith(
            `${BASE_URL}/api/users/logout`,
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token dummy_token',
                },
            })
        );

        expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
    });

    it('should handle logout failure', async () => {
        // Mock the AsyncStorage.getItem function to return a dummy token
        AsyncStorage.getItem = jest.fn().mockResolvedValue('dummy_token');
    
        // Mock the fetch function to return a response with ok: false
        const errorResponse = {
            ok: false,
            status: 400,
            json: jest.fn().mockResolvedValue({ error: 'Logout failed' }),
        };
        global.fetch = jest.fn().mockResolvedValue(errorResponse);
    
        const alertSpy = jest.spyOn(Alert, 'alert');
    
        const { getByTestId } = renderTestComponent();

        await act(async () => {
            fireEvent.press(getByTestId('logoutButton'));
        });    

        expect(fetch).toHaveBeenCalledWith(
            `${BASE_URL}/api/users/logout`,
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token dummy_token',
                },
            })
        );
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Logout failed');
        //expect(AsyncStorage.removeItem).not.toHaveBeenCalled();
    });
});