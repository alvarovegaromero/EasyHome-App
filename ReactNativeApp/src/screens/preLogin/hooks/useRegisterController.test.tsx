import { act, renderHook } from '@testing-library/react-native';
import useRegisterController from './useRegisterController';
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
    return renderHook(() => useRegisterController());
};


describe('useRegisterController', () => {
    it('should update states', () => {
        const { result } = renderTestHookTest();

        act(() => {
            result.current.setUsername('newUsername');
            result.current.setEmail('newEmail');
            result.current.setPassword('newPassword');
            result.current.setConfirmPassword('newPassword');
            result.current.setFirstName('newFirstName');
            result.current.setLastName('newLastName');
        });

        expect(result.current.username).toBe('newUsername');
        expect(result.current.email).toBe('newEmail');
        expect(result.current.password).toBe('newPassword');
        expect(result.current.confirmPassword).toBe('newPassword');
        expect(result.current.firstName).toBe('newFirstName');
        expect(result.current.lastName).toBe('newLastName');
    });

    it('should display an alert when username, email, password, or confirmPassword are empty', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert');

        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('');
            result.current.setEmail('');
            result.current.setPassword('');
            result.current.setConfirmPassword('');
        });
    
        await act(async () => {
            await result.current.handleRegisterSubmit();
        });
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Username, email, password and confirmation password must be filled');
    });
    
    it('should display an alert when passwords do not match', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert');

        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setEmail('newEmail');
            result.current.setPassword('newPassword');
            result.current.setConfirmPassword('differentPassword');
        });
    
        await act(async () => {
            await result.current.handleRegisterSubmit();
        });
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Passwords do not match. Please enter matching passwords.');
    });

    it('should display an alert when email format is not valid', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert');

        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setEmail('newEmail');
            result.current.setPassword('newPassword');
            result.current.setConfirmPassword('newPassword');
        });
    
        await act(async () => {
            await result.current.handleRegisterSubmit();
        });
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid email format');
    });

    it('should handle register submit with valid username, email, password, and confirmPassword', async () => {
        //mockSuccesfulFetch({ id: 'dummy', token: 'dummy_token', username: 'newUsername' });
        mockSuccesfulFetch({});

        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setEmail('newEmail@email.com');
            result.current.setPassword('newPassword');
            result.current.setConfirmPassword('newPassword');
        });
    
        await act(async () => {
            await result.current.handleRegisterSubmit();
        });
    
        expect(fetch).toHaveBeenCalledWith(
            `${BASE_URL}/api/users/register`,
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: 'newUsername', email: 'newEmail@email.com', password: 'newPassword', confirmPassword: 'newPassword'}),
            })
        );
    });

    it('should navigate to HomeScreen when response is ok', async () => {
        mockSuccesfulFetch({});
    
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setEmail('newEmail@email.com');
            result.current.setPassword('newPassword');
            result.current.setConfirmPassword('newPassword');
        });
    
        await act(async () => {
            await result.current.handleRegisterSubmit();
        });
    
        expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen'); 
    });

    it('should update UserContext with id and username when login is successful', async () => {
        mockSuccesfulFetch({ id: 'dummy', username: 'newUsername'});
        
        const mockSetId = jest.fn();
        const mockSetContextUsername = jest.fn();
    
        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue({ setId: mockSetId, setContextUsername: mockSetContextUsername });
    
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setEmail('newEmail@email.com');
            result.current.setPassword('newPassword');
            result.current.setConfirmPassword('newPassword');
        });
    
        await act(async () => {
            result.current.handleRegisterSubmit();
        });
    
        expect(mockSetId).toHaveBeenCalledWith('dummy');
        expect(mockSetContextUsername).toHaveBeenCalledWith('newUsername');
    
        useContextSpy.mockRestore();
    });

    
    it('should display alert when response is not ok', async () => {
        mockFailedFetch('Invalid credentials');
        const alertSpy = jest.spyOn(Alert, 'alert');
    
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setEmail('newEmail@email.com');
            result.current.setPassword('newPassword');
            result.current.setConfirmPassword('newPassword');
        });
    
        await act(async () => {
            await result.current.handleRegisterSubmit();
        });
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Invalid credentials');
    });

    it('should navigate to LoginScreen', async () => {
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.navigateLoginScreen();
        });
    
        expect(mockedNavigate).toHaveBeenCalledWith('LoginScreen');
    });

    it('should navigate to ResetPasswordScreen', async () => {
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.navigateResetPasswordScreen();
        });
    
        expect(mockedNavigate).toHaveBeenCalledWith('ResetPasswordScreen');
    });
});
