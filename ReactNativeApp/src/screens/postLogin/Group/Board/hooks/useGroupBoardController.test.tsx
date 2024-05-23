import { renderHook, waitFor } from "@testing-library/react-native";
import useGroupBoardController from "./useGroupBoardController";
import React from "react";
import { BASE_URL } from "../../../../../config";
import { mockFailedFetch, mockSuccesfulFetch } from "../../../../../utils/utilsTestingHooks";
import { Alert } from "react-native";


jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('dummy_token')),
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
    return renderHook(() => useGroupBoardController());
};


describe('useGroupBoardController', () => {
    describe('boardContent', () => {
        it('should set boardContent', async () => {
            const { result } = renderTestHookTest();
            result.current.setBoardContent('dummy_content');
            await waitFor(() => expect(result.current.boardContent).toBe('dummy_content'));
        });

        describe('fetchGroupBoardContent', () => {
            it('should call proper endpoint for fetching group board content', async () => {
                mockSuccesfulFetch({});
                
                const mockGroupId = 'dummy_id';

                const useContextSpy = jest.spyOn(React, 'useContext');
                useContextSpy.mockReturnValue({ groupId: mockGroupId });

                renderTestHookTest();

                await waitFor(() => {
                    expect(fetch).toHaveBeenCalledWith(
                        `${BASE_URL}/api/shared_board/${mockGroupId}`,
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

            it('should fetch proper group board content', async () => {
                mockSuccesfulFetch({ data: 'dummy_content' });

                const { result } = renderTestHookTest();

                expect(result.current.boardContent).toBe(''); 

                await waitFor(() => {
                    expect(result.current.boardContent).toBe('dummy_content');
                });
            });

            it('should handle fetch error', async () => {
                const mockErrorMessage = "Fetch group's board data failed"
                mockFailedFetch(mockErrorMessage);
        
                jest.spyOn(Alert, 'alert');
                renderTestHookTest();  
        
                await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Error', mockErrorMessage));
            });
        });
    });

    describe('allowEdit', () => {
        it('should set isEditable to true', async () => {
            const { result } = renderTestHookTest();
            expect(result.current.isEditable).toBe(false);
            result.current.allowEdit();
            await waitFor(() => expect(result.current.isEditable).toBe(true));
        });

        it('should set isEditable to false', async () => {
            const { result } = renderTestHookTest();
            result.current.allowEdit();
            await waitFor(() => expect(result.current.isEditable).toBe(true));
            result.current.saveChanges();
            await waitFor(() => expect(result.current.isEditable).toBe(false));
        });

        describe('saveChangesRequest', () => {
            it('should call proper endpoint for saving group board content', async () => {
                mockSuccesfulFetch({ data: 'dummy_content' });
                
                const mockGroupId = 'dummy_id';
        
                const useContextSpy = jest.spyOn(React, 'useContext');
                useContextSpy.mockReturnValue({ groupId: mockGroupId });
        
                const { result } = renderTestHookTest();

                await waitFor(() => { result.current.saveChanges() });

                await waitFor(() => {
                    expect(fetch).toHaveBeenLastCalledWith(
                        `${BASE_URL}/api/shared_board/${mockGroupId}`,
                        expect.objectContaining({
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Token dummy_token',
                            },
                            body: JSON.stringify({
                                content: result.current.boardContent
                            })
                        })
                    );
                });
        
                useContextSpy.mockRestore(); 
            });

            it('should show alert when save is successful', async () => {
                mockSuccesfulFetch({ data: 'dummy_content' });
                
                const mockGroupId = 'dummy_id';
        
                const useContextSpy = jest.spyOn(React, 'useContext');
                useContextSpy.mockReturnValue({ groupId: mockGroupId });
        
                const { result } = renderTestHookTest();

                await waitFor(() => { result.current.saveChanges() });

                jest.spyOn(Alert, 'alert');
        
                await waitFor(() => expect(Alert.alert).toHaveBeenLastCalledWith('Success', 'Changes saved successfully'));

                useContextSpy.mockRestore(); 
            });
    
            it('should handle save error', async () => {
                const mockErrorMessage = "Save group's board data failed"
                mockFailedFetch(mockErrorMessage);
        
                const mockGroupId = 'dummy_id';
        
                const useContextSpy = jest.spyOn(React, 'useContext');
                useContextSpy.mockReturnValue({ groupId: mockGroupId });
        
                const { result } = renderTestHookTest();

                await waitFor(() => { result.current.saveChanges() });
                
                await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Error', mockErrorMessage));
            });
        });
    });

    describe('navigation', () => {
        it('should navigate to GroupHomeScreen', () => {
            const { result } = renderTestHookTest();
            result.current.navigateGroupHome();
            expect(mockedNavigate).toHaveBeenCalledWith('GroupHomeScreen');
        });
    });
});
