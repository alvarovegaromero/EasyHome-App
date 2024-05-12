import { act, renderHook, waitFor } from '@testing-library/react-native';
import useHomeController from './useHomeController';
import { Alert } from 'react-native';
import { BASE_URL } from '../../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockFailedFetch, mockSuccesfulFetch } from '../../../../utils/utilsTestingHooks';
import React from 'react';


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

    describe('dialog', () => {
        it('dialogVisible should be false on mount', () => {
            const { result } = renderTestHookTest();

            expect(result.current.dialogVisible).toBe(false);
        });

        it('should set dialogVisible to true', () => {
            const { result } = renderTestHookTest();

            act(() => {
                result.current.showDialog();
            });

            expect(result.current.dialogVisible).toBe(true);
        });

        it('should set dialogVisible to false', () => {
            const { result } = renderTestHookTest();

            act(() => {
                result.current.showDialog();
            });

            act(() => {
                result.current.closeDialog();
            });

            expect(result.current.dialogVisible).toBe(false);
        });
    });

    describe('fetchGroups', () => {
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

        it('should fetch groups on mount', async () => {
            const mockGroups = [{ id: '1', name: 'group1' }, { id: '2', name: 'group2' }];
            mockSuccesfulFetch({groups : mockGroups});

            const { result } = renderTestHookTest();
        
            await waitFor(() => expect(result.current.groups).toEqual(mockGroups));
        });

        it('should fetch groups on mount and when groupId is changed', async () => {
            const mockGroups = [{ id: '1', name: 'group1' }, { id: 2, name: 'group2' }];
            mockSuccesfulFetch({groups : mockGroups});

            const { result, rerender } = renderHook(() => useHomeController());

            await waitFor(() => expect(result.current.groups).toEqual(mockGroups)); //on mount

            let mockGroupId = '1';
            const mockSetGroupId = jest.fn().mockImplementation(newGroupId => {
                mockGroupId = newGroupId;
            });

            const useContextSpy = jest.spyOn(React, 'useContext');
            useContextSpy.mockImplementation(() => ({ groupId: mockGroupId, setGroupId: mockSetGroupId }));

            const mockGroupsChanged = [{ id: '3', name: 'group3' }, { id: '4', name: 'group4' }];
            mockSuccesfulFetch({groups : mockGroupsChanged});

            //mockSetGroupId('2'); - TODO: Cause rerender by changing groupId
            rerender({}); //useEffect is called again 

            await waitFor(() => expect(result.current.groups).toEqual(mockGroupsChanged)); //changed
        
            useContextSpy.mockRestore(); 
        });

        it('should handle fetch groups failure', async () => {
            mockFailedFetch('Fetch groups failed');
            const alertSpy = jest.spyOn(Alert, 'alert');

            const { result } = renderTestHookTest();

            await waitFor(() => expect(result.current.groups).toEqual([]));

            expect(alertSpy).toHaveBeenCalledWith('Error', 'Fetch groups failed');
        });
    });

    describe('handleLogout', () => {
        it('should call proper endpoint when handling logout', async () => {
            mockSuccesfulFetch({ message: 'Logged out successfully' });

            const { result } = renderTestHookTest();

            await act(() => {
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

            await act(() => {
                result.current.handleLogout();
            });

            expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
        });

        it('should handle logout failure', async () => {
            mockFailedFetch('Logout failed');
            const alertSpy = jest.spyOn(Alert, 'alert');
        
            const { result } = renderTestHookTest();

            await act(() => {
                result.current.handleLogout();
            });
        
            expect(alertSpy).toHaveBeenCalledWith('Error', 'Logout failed');
            expect(AsyncStorage.removeItem).not.toHaveBeenCalled();
        });

        it('should navigate to LoginScreen when logout is succesful', async () => {
            mockSuccesfulFetch({ message: 'Logged out successfully' });

            const { result } = renderTestHookTest();

            await act(() => {
                result.current.handleLogout();
            });

            expect(mockedNavigate).toHaveBeenCalledWith('LoginScreen');
        });

        it('should clear contextUsername and id when logout is succesful', async () => {
            const mockSetContextUsername = jest.fn();
            const mockSetId = jest.fn();
            const useContextSpy = jest.spyOn(React, 'useContext');
            useContextSpy.mockReturnValue({ setContextUsername: mockSetContextUsername, setId: mockSetId });

            mockSuccesfulFetch({ message: 'Logged out successfully' });

            const { result } = renderTestHookTest();

            await act(() => {
                result.current.handleLogout();
            });

            expect(mockSetContextUsername).toHaveBeenCalledWith('');
            expect(mockSetId).toHaveBeenCalledWith('');

            useContextSpy.mockRestore();
        });
    });

    describe('joinGroup', () => {
        it('should fail when trying to join group without code', async () => {
            const alertSpy = jest.spyOn(Alert, 'alert');

            const { result } = renderTestHookTest();

            act(() => {
                result.current.joinGroup();
            });

            expect(alertSpy).toHaveBeenCalledWith('Error', 'Join code must be filled');
        });

        it('should call proper endpoint when joining group', async () => {
            let mockJoinCode = '1234';

            const { result } = renderTestHookTest();

            act(() => {
                result.current.setJoinCode(mockJoinCode);
            });

            await act(() => {
                result.current.joinGroup();
            });

            expect(fetch).toHaveBeenNthCalledWith(
                2,
                `${BASE_URL}/api/groups/join`,
                expect.objectContaining({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token dummy_token',
                    },
                    body: JSON.stringify({ joinCode: mockJoinCode }),
                })
            );
        });

        it('should call navigateGroupHomeScreen when joining group is succesful', async () => {
            mockSuccesfulFetch({ id: '1' });

            const { result } = renderTestHookTest();

            act(() => {
                result.current.setJoinCode('1234');
            });

            await act(() => {
                result.current.joinGroup();
            });

            expect(mockedNavigate).toHaveBeenCalledWith('GroupHomeScreen');
        });

        it('should set groupId context when joining a group', async () => {
            const mockSetGroupId = jest.fn();
            const useContextSpy = jest.spyOn(React, 'useContext');
            useContextSpy.mockReturnValue({ setGroupId: mockSetGroupId });
            
            const mockId = 'dummy'
            mockSuccesfulFetch({ id: mockId });

            const { result } = renderTestHookTest();

            act(() => {
                result.current.setJoinCode('1234');
            });

            await act(() => {
                result.current.joinGroup();
            });

            expect(mockSetGroupId).toHaveBeenCalledWith(mockId);    

            useContextSpy.mockRestore();
        });

        it('should handle join group failure', async () => {
            mockFailedFetch('Join group failed');
            const alertSpy = jest.spyOn(Alert, 'alert');

            const { result } = renderTestHookTest();

            act(() => {
                result.current.setJoinCode('1234');
            });

            await act(() => {
                result.current.joinGroup();
            });

            expect(alertSpy).toHaveBeenCalledWith('Error', 'Join group failed');
        });
    });

    describe('navigate', () => {
        it('should navigate to ProfileScreen', async () => {
            const { result } = renderTestHookTest();

            await act(async () => {
                result.current.navigateProfileScreen();
            });

            expect(mockedNavigate).toHaveBeenCalledWith('ProfileScreen');
        });

        it('should navigate to CreateGroupScreen', async () => {
            const { result } = renderTestHookTest();

            await act(() => {
                result.current.navigateCreateGroupScreen();
            });

            expect(mockedNavigate).toHaveBeenCalledWith('CreateGroupScreen');
        });

        it('should navigate to GroupHomeScreen', async () => {
            var mock_id = "1";
            const { result } = renderTestHookTest();

            await act(() => {
                result.current.navigateGroupHomeScreen(mock_id);
            });

            expect(mockedNavigate).toHaveBeenCalledWith('GroupHomeScreen');
        });

        it('should update groupId when navigating to GroupHomeScreen', async () => {
            const mockSetGroupId = jest.fn();
            const useContextSpy = jest.spyOn(React, 'useContext');
            useContextSpy.mockReturnValue({ setGroupId: mockSetGroupId });
            
            const mock_id = "1";
            const { result } = renderTestHookTest();

            await act(() => {
                result.current.navigateGroupHomeScreen(mock_id);
            });

            expect(mockSetGroupId).toHaveBeenCalledWith(mock_id);
        });
    });
});