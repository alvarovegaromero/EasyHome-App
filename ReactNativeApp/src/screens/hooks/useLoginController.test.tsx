import { act, renderHook } from '@testing-library/react-native';
import useLoginController from './useLoginController';
import { Alert } from 'react-native';
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

const renderTestHookTest = () => {
    return renderHook(() => useLoginController());
};

const mockSuccesfulFetch = (response: {token: string, username: string}) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(response),
        })
    );
}

const mockFailedFetch = (errorMessage: string) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: false,
            status: 400,
            json: () => Promise.resolve({ error: errorMessage }),
        })
    );
};

describe('useLoginController', () => {
    it('should update username and password state', () => {
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setPassword('newPassword');
        });
    
        expect(result.current.username).toBe('newUsername');
        expect(result.current.password).toBe('newPassword');
    });

    it('should handle login submit with empty username or password', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert');
        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.handleLoginSubmit();
        });

        expect(alertSpy).toHaveBeenCalledWith('Error', 'Username and password must be filled');
    });

    it('should handle login submit with valid username and password', async () => {
        mockSuccesfulFetch({ token: 'dummy_token', username: 'newUsername' });
    
        const { result } = renderTestHookTest();

        act(() => {
            result.current.setUsername('newUsername');
            result.current.setPassword('newPassword');
        });

        await act(async () => {
            result.current.handleLoginSubmit();
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
    
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setPassword('newPassword');
        });
    
        await act(async () => {
            result.current.handleLoginSubmit();
        });
    
        expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen', { username: 'newUsername' });
    });

    it('should display alert when response is not ok', async () => {
        mockFailedFetch('Invalid credentials');

        const alertSpy = jest.spyOn(Alert, 'alert');
    
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setPassword('newPassword');
        });
    
        await act(async () => {
            result.current.handleLoginSubmit();
        });
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid credentials');
    });

    it('should navigate to register screen', async () => {
        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.navigateRegisterScreen();
        });

        expect(mockedNavigate).toHaveBeenCalledWith('RegisterScreen');
    });

    it('should navigate to reset password screen', async () => {
        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.navigateResetPasswordScreen();
        });

        expect(mockedNavigate).toHaveBeenCalledWith('ResetPasswordScreen');
    });
});