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
    const { handleLogout, navigateProfileScreen } = useHomeController();

    return (
        <View>
            <Button testID="logoutButton" onPress={handleLogout} title="Logout" />
            <Button testID="profileButton" onPress={navigateProfileScreen} title="Profile" />
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
};

describe('useHomeController', () => {
    it('should handle logout', async () => {
        mockSuccesfulFetch({ message: 'Logged out successfully' });

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
        AsyncStorage.getItem = jest.fn().mockResolvedValue('dummy_token');
    
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

    it('should navigate to LoginScreen when logout is succesful', async () => {
        mockSuccesfulFetch({ message: 'Logged out successfully' });

        const { getByTestId } = renderTestComponent();

        await act(async () => {
            fireEvent.press(getByTestId('logoutButton'));
        });

        expect(mockedNavigate).toHaveBeenCalledWith('LoginScreen');
    });

    it('should navigate to ProfileScreen', async () => {
        const { getByTestId } = renderTestComponent();

        await act(async () => {
            fireEvent.press(getByTestId('profileButton'));
        });

        expect(mockedNavigate).toHaveBeenCalledWith('ProfileScreen');
    });
});