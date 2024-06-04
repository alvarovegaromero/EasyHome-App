import {act, renderHook, waitFor} from '@testing-library/react-native';
import useGroupSettingsController from './useGroupSettingsController';
import {
  mockFailedFetch,
  mockSuccesfulFetch,
  pressSecondOptionAlert,
} from '../../../../utils/utilsTestingHooks';
import {BASE_URL} from '../../../../config';
import {Alert} from 'react-native';
import React from 'react';

jest.mock('@react-native-clipboard/clipboard', () => ({
  setString: jest.fn(),
}));

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
  return renderHook(() => useGroupSettingsController());
};

describe('useGroupSettingsController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('dialog', () => {
    it('dialogVisible should be false on mount', () => {
      const {result} = renderTestHookTest();

      expect(result.current.dialogVisible).toBe(false);
    });

    it('should set dialogVisible to true', async () => {
      mockSuccesfulFetch({});

      const mockGroupId = 'dummy_id';

      const useContextSpy = jest.spyOn(React, 'useContext');
      useContextSpy.mockReturnValue({groupId: mockGroupId});

      const {result} = renderTestHookTest();

      await act(() => {
        result.current.generateJoinCode();
      });

      await waitFor(() => expect(result.current.dialogVisible).toBe(true));

      useContextSpy.mockRestore();
    });

    it('should set dialogVisible to false', () => {
      const {result} = renderTestHookTest();

      act(() => {
        result.current.closeDialog();
      });

      expect(result.current.dialogVisible).toBe(false);
    });
  });

  describe('fetchGroupUsersData', () => {
    it('should call proper endpoint for fetching group users when just render', async () => {
      mockSuccesfulFetch({users: []});

      const mockGroupId = 'dummy_id';

      const useContextSpy = jest.spyOn(React, 'useContext');
      useContextSpy.mockReturnValue({groupId: mockGroupId});

      renderTestHookTest();

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}/api/groups/${mockGroupId}/users`,
          expect.objectContaining({
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token dummy_token',
            },
          }),
        );
      });
    });

    it('should fetch proper group users data', async () => {
      const {result} = renderTestHookTest();
      expect(result.current.groupUsers).toStrictEqual([]);
      expect(result.current.isOwner).toBe(false); // default value - can't be tested in next test

      const mockGroupUsersData = {
        users: [
          {id: '1', name: 'dummy_name', email: 'dummy_email', is_owner: true},
        ],
      };
      mockSuccesfulFetch(mockGroupUsersData);

      await waitFor(() =>
        expect(result.current.groupUsers).toStrictEqual(
          mockGroupUsersData.users,
        ),
      );
    });

    it('should setIsOwner to true if user is owner', async () => {
      const mockId = '1';

      const useContextSpy = jest.spyOn(React, 'useContext');
      useContextSpy.mockReturnValue({id: mockId});

      const mockGroupUsersData = {
        users: [
          {id: '1', name: 'dummy_name', email: 'dummy_email', is_owner: true},
        ],
      };
      mockSuccesfulFetch(mockGroupUsersData);

      const {result} = renderTestHookTest();

      await waitFor(() => expect(result.current.isOwner).toBe(true));
    });

    it('should show error alert on fetch users error', async () => {
      mockFailedFetch("Fetch group's users failed");

      const alertSpy = jest.spyOn(Alert, 'alert');
      renderTestHookTest();

      await waitFor(() =>
        expect(alertSpy).toHaveBeenCalledWith(
          'Error',
          "Fetch group's users failed",
        ),
      );
    });
  });

  describe('confirmAndLeaveGroup', () => {
    it('should call Alert.alert with correct arguments', async () => {
      const {result} = renderTestHookTest();

      const alertSpy = jest.spyOn(Alert, 'alert');

      result.current.confirmAndLeaveGroup();

      expect(alertSpy).toHaveBeenCalledWith(
        'Confirmation',
        'Are you sure you want to leave the group?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: expect.any(Function), // verify a function is passed
          },
        ],
      );
    });

    describe('leaveGroup', () => {
      it('should call leaveGroup when OK is pressed', async () => {
        mockSuccesfulFetch({});

        const mockGroupId = 'dummy_id';

        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue({groupId: mockGroupId});

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndLeaveGroup();

        await waitFor(() => pressSecondOptionAlert(alertSpy)); // simulate OK press

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}/api/groups/${mockGroupId}/leave`,
          expect.objectContaining({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token dummy_token',
            },
          }),
        );

        useContextSpy.mockRestore();
      });

      it('should navigate to home after successful leave', async () => {
        mockSuccesfulFetch({});

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndLeaveGroup();

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen');
      });

      it('should clear groupId when leave is succesful', async () => {
        mockSuccesfulFetch({});

        const mockGroupId = 'dummy_id';
        const mockSetGroupId = jest.fn();

        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue({
          groupId: mockGroupId,
          setGroupId: mockSetGroupId,
        });

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndLeaveGroup();

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(mockSetGroupId).toHaveBeenCalledWith('');
      });

      it('should show error alert on leave group error', async () => {
        mockFailedFetch('Leave group failed');

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndLeaveGroup();

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(alertSpy).toHaveBeenCalledWith('Error', 'Leave group failed');
      });
    });
  });

  describe('confirmAndDeleteGroup', () => {
    it('should call Alert.alert with correct arguments', async () => {
      const {result} = renderTestHookTest();

      const alertSpy = jest.spyOn(Alert, 'alert');

      result.current.confirmAndDeleteGroup();

      expect(alertSpy).toHaveBeenCalledWith(
        'Confirmation',
        'Are you sure you want to delete the group?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: expect.any(Function),
          },
        ],
      );
    });

    describe('deleteGroup', () => {
      it('should call deleteGroup when OK is pressed', async () => {
        mockSuccesfulFetch({});

        const mockGroupId = 'dummy_id';

        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue({groupId: mockGroupId});

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndDeleteGroup();

        await waitFor(() => pressSecondOptionAlert(alertSpy)); // simulate OK press

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}/api/groups/${mockGroupId}`,
          expect.objectContaining({
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token dummy_token',
            },
          }),
        );

        useContextSpy.mockRestore();
      });

      it('should navigate to home after successful delete', async () => {
        mockSuccesfulFetch({});

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndDeleteGroup();

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen');
      });

      it('should delete groupId when delete is succesful', async () => {
        //maybe can be removed
        mockSuccesfulFetch({});

        const mockGroupId = 'dummy_id';
        const mockSetGroupId = jest.fn();

        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue({
          groupId: mockGroupId,
          setGroupId: mockSetGroupId,
        });

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndDeleteGroup();

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(mockSetGroupId).toHaveBeenCalledWith('');
      });

      it('should show error alert on delete group error', async () => {
        mockFailedFetch('Delete group failed');

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndDeleteGroup();

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(alertSpy).toHaveBeenCalledWith('Error', 'Delete group failed');
      });
    });
  });

  describe('confirmAndKickUser', () => {
    const mockKickedUserId = 'dummy_user_id';

    it('should call Alert.alert with correct arguments', async () => {
      const {result} = renderTestHookTest();

      const alertSpy = jest.spyOn(Alert, 'alert');

      result.current.confirmAndKickUser(mockKickedUserId);

      expect(alertSpy).toHaveBeenCalledWith(
        'Confirmation',
        'Are you sure you want to remove this user from the group?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: expect.any(Function),
          },
        ],
      );
    });

    describe('kickUser', () => {
      it('should call kickUser when OK is pressed', async () => {
        mockSuccesfulFetch({});

        const mockGroupId = 'dummy_id';

        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue({groupId: mockGroupId});

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndKickUser(mockKickedUserId);

        await waitFor(() => pressSecondOptionAlert(alertSpy)); // simulate OK press

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}/api/groups/${mockGroupId}/kick/${mockKickedUserId}`,
          expect.objectContaining({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token dummy_token',
            },
          }),
        );

        useContextSpy.mockRestore();
      });

      it('should show error alert on kick user error', async () => {
        mockFailedFetch('Kick user failed');

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndKickUser(mockKickedUserId);

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(alertSpy).toHaveBeenCalledWith('Error', 'Kick user failed');
      });

      it('should provide proper error message in alert', async () => {
        mockFailedFetch('Kick user failed');

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndKickUser(mockKickedUserId);

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(alertSpy).toHaveBeenCalledWith('Error', 'Kick user failed');
      });
    });
  });

  describe('confirmAndPromoteUser', () => {
    const mockPromotedUserId = 'dummy_user_id';

    it('should call Alert.alert with correct arguments', async () => {
      const {result} = renderTestHookTest();

      const alertSpy = jest.spyOn(Alert, 'alert');

      result.current.confirmAndPromoteUser(mockPromotedUserId);

      expect(alertSpy).toHaveBeenCalledWith(
        'Confirmation',
        'Are you sure you want to promote this user to owner?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: expect.any(Function),
          },
        ],
      );
    });

    describe('promoteUser', () => {
      it('should call proper e promoteUser when OK is pressed', async () => {
        mockSuccesfulFetch({});

        const mockGroupId = 'dummy_id';

        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue({groupId: mockGroupId});

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndPromoteUser(mockPromotedUserId);

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(fetch).toHaveBeenNthCalledWith(
          2,
          `${BASE_URL}/api/groups/${mockGroupId}/change_owner/dummy_user_id`,
          expect.objectContaining({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token dummy_token',
            },
          }),
        );

        useContextSpy.mockRestore();
      });

      it('should fetch group users data after successful promote', async () => {
        mockSuccesfulFetch({});

        const mockGroupId = 'dummy_id';

        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue({groupId: mockGroupId});

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndPromoteUser(mockPromotedUserId);

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(fetch).toHaveBeenLastCalledWith(
          `${BASE_URL}/api/groups/${mockGroupId}/users`,
          expect.objectContaining({
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token dummy_token',
            },
          }),
        );
      });

      it('should show error alert on promote user error', async () => {
        mockFailedFetch('Promote user failed');

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndPromoteUser(mockPromotedUserId);

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(alertSpy).toHaveBeenCalledWith('Error', 'Promote user failed');
      });
    });
  });

  describe('generateJoinCode', () => {
    it('should call proper endpoint for generating join code', async () => {
      mockSuccesfulFetch({join_code: 'dummy_code'});

      const mockGroupId = 'dummy_id';

      const useContextSpy = jest.spyOn(React, 'useContext');
      useContextSpy.mockReturnValue({groupId: mockGroupId});

      const {result} = renderTestHookTest();

      await act(() => {
        result.current.generateJoinCode();
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}/api/groups/${mockGroupId}/generate_code`,
          expect.objectContaining({
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token dummy_token',
            },
          }),
        );
      });

      useContextSpy.mockRestore();
    });

    it('should set joinCode to response data', async () => {
      mockSuccesfulFetch({join_code: 'dummy_code'});

      const {result} = renderTestHookTest();

      expect(result.current.joinCode).toBe('');

      await act(() => {
        result.current.generateJoinCode();
      });

      await waitFor(() => expect(result.current.joinCode).toBe('dummy_code'));
    });

    it('should set dialogVisible to true', async () => {
      mockSuccesfulFetch({join_code: 'dummy_code'});

      const {result} = renderTestHookTest();

      await act(() => {
        result.current.generateJoinCode();
      });

      await waitFor(() => expect(result.current.dialogVisible).toBe(true));
    });

    it('should show error alert on generate join code error', async () => {
      mockFailedFetch('Generate join code failed');

      const alertSpy = jest.spyOn(Alert, 'alert');
      const {result} = renderTestHookTest();

      await act(() => {
        result.current.generateJoinCode();
      });

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith(
          'Error',
          'Generate join code failed',
        );
      });
    });
  });

  describe('copyJoinCodeToClipboard', () => {
    it('should copy join code to clipboard', async () => {
      mockSuccesfulFetch({join_code: 'dummy_code'});

      const {result} = renderTestHookTest();

      await act(() => {
        result.current.generateJoinCode();
      });

      await act(() => {
        result.current.copyJoinCodeToClipboard();
      });

      expect(
        require('@react-native-clipboard/clipboard').setString,
      ).toHaveBeenCalledWith('dummy_code');
    });

    it('should set dialogVisible to false', async () => {
      mockSuccesfulFetch({join_code: 'dummy_code'});

      const {result} = renderTestHookTest();

      await act(() => {
        result.current.generateJoinCode();
      });

      await act(() => {
        result.current.copyJoinCodeToClipboard();
      });

      expect(result.current.dialogVisible).toBe(false);
    });
  });

  describe('navigate', () => {
    it('should navigate to GroupHomeScreen', () => {
      const {result} = renderTestHookTest();

      act(() => {
        result.current.navigateGroupHome();
      });

      expect(mockedNavigate).toHaveBeenCalledWith('GroupHomeScreen');
    });
  });
});
