import { act, renderHook, waitFor } from '@testing-library/react-native';
import useHomeController from './useHomeController';
import { Alert } from 'react-native';
import { BASE_URL } from '../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockFailedFetch, mockSuccesfulFetch } from '../../../../utils/utilsTestingHooks';


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

    it('should fetch groups on mount', async () => {
        const mockGroups = [{ id: 1, name: 'group1' }, { id: 2, name: 'group2' }];
        mockSuccesfulFetch(mockGroups);
    
        const { result } = renderTestHookTest();
    
        await waitFor(() => {
            expect(result.current.groups).toEqual(mockGroups);
        });
    });
    /*
    it('should call proper endpoint for fetching groups', async () => {
        mockSuccesfulFetch({});

        renderTestHookTest();

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                `${BASE_URL}/api/groups`,
                expect.objectContaining({
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token dummy_token',
                    },
                })
            );
        });
    });

    it('should call proper endpoint when handling logout', async () => {
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
    });

    it('should delete token from AsyncStorage when logout is succesful', async () => {
        mockSuccesfulFetch({ message: 'Logged out successfully' });

        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.handleLogout();
        });

        expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
    });

    it('should handle logout failure', async () => {
        mockFailedFetch('Logout failed');
        const alertSpy = jest.spyOn(Alert, 'alert');
    
        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.handleLogout();
        });
    
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

    it('should navigate to CreateGroupScreen', async () => {
        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.navigateCreateGroupScreen();
        });

        expect(mockedNavigate).toHaveBeenCalledWith('CreateGroupScreen');
    });

    it('should navigate to GroupHomeScreen', async () => {
        var mock_id = "1";
        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.navigateGroupHomeScreen(mock_id);
        });

        expect(mockedNavigate).toHaveBeenCalledWith('GroupHomeScreen');
    });*/
});