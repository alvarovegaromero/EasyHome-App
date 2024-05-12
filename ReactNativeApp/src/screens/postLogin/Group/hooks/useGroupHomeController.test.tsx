import { renderHook, waitFor } from "@testing-library/react-native";
import useGroupHomeController from "./useGroupHomeController";
import React from "react";
import { mockFailedFetch, mockSuccesfulFetch } from "../../../../utils/utilsTestingHooks";
import { BASE_URL } from "../../../../config";
import { Alert } from "react-native";


jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('dummy_token')),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
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
    return renderHook(() => useGroupHomeController());
};


describe('useGroupHomeController', () => {
    describe('fetchGroupData', () => {
        it('should call proper endpoint for fetching groups', async () => {
            mockSuccesfulFetch({});
    
            const mockGroupId = 'dummy_id';
    
            const useContextSpy = jest.spyOn(React, 'useContext');
            useContextSpy.mockReturnValue({ groupId: mockGroupId });
    
            renderTestHookTest();
    
            await waitFor(() => {
                expect(fetch).toHaveBeenCalledWith(
                    `${BASE_URL}/api/groups/${mockGroupId}`,
                    expect.objectContaining({
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token dummy_token',
                        },
                    })
                );
            });
    
            useContextSpy.mockRestore(); 
        });

        it('should fetch proper group data', async () => {
            const { result } = renderTestHookTest();
            expect(result.current.groupName).toBe('');
            
            const mockGroupData = { id: '1', name: 'dummy_name', 
                                description: 'dummy_description', currency: 'dummy_currency', 
                                creation_date: 'dummy_creation_date', owner: 'dummy_owner'};
    
            mockSuccesfulFetch(mockGroupData);
    
            //setGroupName is also tested as it is used in the hook
            await waitFor(() => expect(result.current.groupName).toBe(mockGroupData.name));
        });

        it('should display error alert when fetch fails', async () => {
            const mockErrorMessage = "Fetch group's data failed"
            mockFailedFetch(mockErrorMessage);
    
            jest.spyOn(Alert, 'alert');
            renderTestHookTest();  
    
            await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Error', mockErrorMessage));
        });
    });

    describe('navigation', () => {
        it('should navigate to GroupSettingsScreen', () => {
            const { result } = renderTestHookTest();
            result.current.navigateSettings();
            expect(mockedNavigate).toHaveBeenCalledWith('GroupSettingsScreen');
        });

        it('should navigate to HomeScreen', () => {
            const { result } = renderTestHookTest();
            result.current.navigateHome();
            expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen');
        });
    
        it('should update groupId when navigating to HomeScreen', () => {
            const mockSetGroupId = jest.fn();
            const useContextSpy = jest.spyOn(React, 'useContext');
            useContextSpy.mockReturnValue({ setGroupId: mockSetGroupId });

            const { result } = renderTestHookTest();
            result.current.navigateHome();

            expect(mockSetGroupId).toHaveBeenCalledWith('');
        });
    });
});
