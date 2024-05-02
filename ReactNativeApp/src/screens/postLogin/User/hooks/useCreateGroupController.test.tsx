import { act, renderHook, waitFor } from "@testing-library/react-native";
import useCreateGroupController from "./useCreateGroupController";
import { Alert } from 'react-native';
import { mockFailedFetch, mockSuccesfulFetch } from "../../../../utils/utilsTestingHooks";
import { BASE_URL } from "../../../../config";
import React from "react";


jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('dummy_token')),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: mockedNavigate,
            goBack: mockedGoBack,
        }),
    };
});

const renderTestHookTest = () => {
    return renderHook(() => useCreateGroupController());
};

describe('useCreateGroupController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update name, description and currency states', () => {
        const { result } = renderTestHookTest();
    
        expect(result.current.name).toBe('');
        expect(result.current.description).toBe('');
        expect(result.current.currency).toBe('');
        
        act(() => {
            result.current.setName('newName');
            result.current.setDescription('newDescription');
            result.current.setCurrency('newCurrency');
        });
    
        expect(result.current.name).toBe('newName');
        expect(result.current.description).toBe('newDescription');
        expect(result.current.currency).toBe('newCurrency');
    });

    it('should handle create group submit with empty name or currency', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert');
        
        const { result } = renderTestHookTest();

        await act(async () => {
            result.current.handleCreateGroupSubmit();
        });

        expect(alertSpy).toHaveBeenCalledWith('Error', 'Name and currency are required');
    });

    it('should call proper endpoint for retrieving currencies', async () => {
        mockSuccesfulFetch({ });

        const { result } = renderTestHookTest();

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                `${BASE_URL}/api/currencies`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token dummy_token',
                    },
                }
            );
        });
    });

    it('should update currencies when fetchCurrencies is called', async () => {
        const mockCurrencies = ['USD', 'EUR', 'GBP'];
        mockSuccesfulFetch(mockCurrencies);

        const { result } = renderTestHookTest();
        
        await waitFor(() => {
            expect(result.current.currencies).toEqual(mockCurrencies);
        });
    });

    it('should display alert when fetchCurrencies fails', async () => {
        mockFailedFetch('Error');

        const alertSpy = jest.spyOn(Alert, 'alert');

        const { result } = renderTestHookTest();
        
        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith('Error', 'Error');
        });
    });

    it('should handle create group submit with valid name and currency', async () => {
        mockSuccesfulFetch({ });
    
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setName('newName');
            result.current.setDescription('newDescription');
            result.current.setCurrency('USD');
        });
    
        await act(async () => {
            result.current.handleCreateGroupSubmit();
        });
    
        expect(fetch).toHaveBeenNthCalledWith(
            2,
            `${BASE_URL}/api/groups/create`,
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token dummy_token`,
                },
                body: JSON.stringify({ name: 'newName', description: 'newDescription', currency: 'USD' }),
            })
        );
    });

    it('should navigate to GroupHomeScreen when creation is successful', async () => {
        mockSuccesfulFetch({});

        const { result } = renderTestHookTest();

        act(() => {
            result.current.setName('newName');
            result.current.setCurrency('USD');
        });

        await act(async () => {
            result.current.handleCreateGroupSubmit();
        });

        expect(mockedNavigate).toHaveBeenCalledWith('GroupHomeScreen');
    });

    it('should update groupId when creation is successful', async () => {
        const mockSetGroupId = jest.fn();
        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue({ setGroupId: mockSetGroupId });
        
        mockSuccesfulFetch({ id: 'dummy' });

        const { result } = renderTestHookTest();

        act(() => {
            result.current.setName('newName');
            result.current.setCurrency('USD');
        });

        await act(async () => {
            result.current.handleCreateGroupSubmit();
        });

        expect(mockSetGroupId).toHaveBeenCalledWith('dummy');
    });

    it('should display alert when response is not ok', async () => {
        mockFailedFetch('Error');

        const alertSpy = jest.spyOn(Alert, 'alert');

        const { result } = renderTestHookTest();

        act(() => {
            result.current.setName('newName');
            result.current.setCurrency('USD');
        });

        await act(async () => {
            result.current.handleCreateGroupSubmit();
        });

        expect(alertSpy).toHaveBeenCalledWith('Error', 'Error');
    });

    it('should navigate back to HomeScreen', () => {
        const { result } = renderTestHookTest();

        act(() => {
            result.current.handleGoBack();
        });

        expect(mockedGoBack).toHaveBeenCalled();
    });
});
