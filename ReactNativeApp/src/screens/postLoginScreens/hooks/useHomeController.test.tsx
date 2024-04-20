import { act, renderHook } from '@testing-library/react-native';
import useHomeController from './useHomeController';
import { Alert } from 'react-native';
import { BASE_URL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockFailedFetch, mockSuccesfulFetch } from '../../../utils/utilsTestingHooks';


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

const renderTestHookTest = () => {
    return renderHook(() => useHomeController());
};


describe('useHomeController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    it('should handle logout', async () => {
        mockSuccesfulFetch({ message: 'Logged out successfully' });

        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.handleLogout();
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
        mockFailedFetch('Logout failed');
        const alertSpy = jest.spyOn(Alert, 'alert');
    
        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.handleLogout();
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
        expect(AsyncStorage.removeItem).not.toHaveBeenCalled();
    });

    it('should navigate to LoginScreen when logout is succesful', async () => {
        mockSuccesfulFetch({ message: 'Logged out successfully' });

        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.handleLogout();
        });

        expect(mockedNavigate).toHaveBeenCalledWith('LoginScreen');
    });

    it('should navigate to ProfileScreen', async () => {
        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.navigateProfileScreen();
        });

        expect(mockedNavigate).toHaveBeenCalledWith('ProfileScreen');
    });
});