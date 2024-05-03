import { act, renderHook } from '@testing-library/react-native';
import useLoginController from './useLoginController';
import { Alert } from 'react-native';
import { BASE_URL } from '../../../config';
import { mockFailedFetch, mockSuccesfulFetch } from '../../../utils/utilsTestingHooks';
import React from 'react';


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


describe('useLoginController', () => {
    it('should update username and password states', () => {
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
        mockSuccesfulFetch({});
            
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
    });

    it('Should navigate to HomeScreen when login is successful', async () => {    
        mockSuccesfulFetch({});

        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setPassword('newPassword');
        });
    
        await act(async () => {
            result.current.handleLoginSubmit();
        });
    
        expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen');
    });

    it('should update UserContext with id and username when login is successful', async () => {
        mockSuccesfulFetch({ id: 'dummy', username: 'newUsername' });
        
        const mockSetId = jest.fn();
        const mockSetContextUsername = jest.fn();
    
        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue({ setId: mockSetId, setContextUsername: mockSetContextUsername });
    
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setPassword('newPassword');
        });
    
        await act(async () => {
            result.current.handleLoginSubmit();
        });
    
        expect(mockSetId).toHaveBeenCalledWith('dummy');
        expect(mockSetContextUsername).toHaveBeenCalledWith('newUsername');
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

    it('should navigate to RegisterScreen', async () => {
        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.navigateRegisterScreen();
        });

        expect(mockedNavigate).toHaveBeenCalledWith('RegisterScreen');
    });

    it('should navigate to ResetPasswordScreen', async () => {
        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.navigateResetPasswordScreen();
        });

        expect(mockedNavigate).toHaveBeenCalledWith('ResetPasswordScreen');
    });
});
