import {fireEvent, render} from '@testing-library/react-native';
import GroupSettingsScreen from './GroupSettingsScreen';
import useGroupSettingsController from './hooks/useGroupSettingsController';

let mockDialogVisible = false;
let mockIsOwner = true;

jest.mock('./hooks/useGroupSettingsController', () => {
  const mockConfirmAndLeaveGroup = jest.fn();
  const mockConfirmAndDeleteGroup = jest.fn();
  const mockGenerateJoinCode = jest.fn();
  const mockCloseDialog = jest.fn();
  const mockConfirmAndKickUser = jest.fn();
  const mockConfirmAndPromoteUser = jest.fn();
  const mockCopyJoinCodeToClipboard = jest.fn();
  const mockNavigateGroupHome = jest.fn();

  return () => ({
    confirmAndLeaveGroup: mockConfirmAndLeaveGroup,
    confirmAndDeleteGroup: mockConfirmAndDeleteGroup,
    generateJoinCode: mockGenerateJoinCode,
    dialogVisible: mockDialogVisible,
    closeDialog: mockCloseDialog,
    joinCode: 'myJoinCode1234',
    confirmAndKickUser: mockConfirmAndKickUser,
    confirmAndPromoteUser: mockConfirmAndPromoteUser,
    copyJoinCodeToClipboard: mockCopyJoinCodeToClipboard,
    groupUsers: [
      {
        username: 'myUsername',
        is_owner: true,
        id: 1,
      },
      {
        username: 'otherUser',
        is_owner: false,
        id: 2,
      },
    ],
    isOwner: mockIsOwner,
    navigateGroupHome: mockNavigateGroupHome,
  });
});

const renderScreen = () => {
  return render(<GroupSettingsScreen />);
};

describe('GroupSettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all components', () => {
    const {getByText, queryByText, getByTestId} = renderScreen();

    expect(getByText('Members:')).toBeTruthy();

    expect(getByText('myUsername')).toBeTruthy();
    expect(getByTestId('CrownIconOwner')).toBeTruthy();

    expect(getByText('otherUser')).toBeTruthy();
    expect(getByTestId('PromoteUserIcon-otherUser')).toBeTruthy();
    expect(getByTestId('KickUserIcon-otherUser')).toBeTruthy();

    expect(getByTestId('LeaveGroupButton')).toBeTruthy();
    expect(getByTestId('DeleteGroupButton')).toBeTruthy();
    expect(getByTestId('GetJoinCodeButton')).toBeTruthy();
    expect(getByTestId('GoBackToGroupHomeButton')).toBeTruthy();

    expect(queryByText('myJoinCode1234')).toBeNull(); //dialog not visible
  });

  it('should show dialog when enabled', () => {
    mockDialogVisible = true;

    const {getByText, getByTestId} = renderScreen();

    expect(getByText('Join Code')).toBeTruthy();
    expect(getByText('myJoinCode1234')).toBeTruthy();
    expect(getByTestId('CloseDialogutton')).toBeTruthy();
    expect(getByTestId('CopyJoinCodeButton')).toBeTruthy();

    mockDialogVisible = false;
  });

  it('should call the correct functions when buttons are pressed', () => {
    mockDialogVisible = true;

    const {getByTestId} = renderScreen();

    const {
      confirmAndLeaveGroup,
      confirmAndDeleteGroup,
      generateJoinCode,
      closeDialog,
      copyJoinCodeToClipboard,
      navigateGroupHome,
      confirmAndKickUser,
      confirmAndPromoteUser,
    } = useGroupSettingsController();

    expect(confirmAndLeaveGroup).not.toHaveBeenCalled();
    expect(confirmAndDeleteGroup).not.toHaveBeenCalled();
    expect(generateJoinCode).not.toHaveBeenCalled();
    expect(closeDialog).not.toHaveBeenCalled(); //dialog is visible from last test
    expect(copyJoinCodeToClipboard).not.toHaveBeenCalled();
    expect(navigateGroupHome).not.toHaveBeenCalled();
    expect(confirmAndKickUser).not.toHaveBeenCalled();
    expect(confirmAndPromoteUser).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('LeaveGroupButton'));
    fireEvent.press(getByTestId('DeleteGroupButton'));
    fireEvent.press(getByTestId('GetJoinCodeButton'));
    fireEvent.press(getByTestId('CloseDialogutton'));
    fireEvent.press(getByTestId('CopyJoinCodeButton'));
    fireEvent.press(getByTestId('GoBackToGroupHomeButton'));
    fireEvent.press(getByTestId('PromoteUserIcon-otherUser'));
    fireEvent.press(getByTestId('KickUserIcon-otherUser'));

    expect(confirmAndLeaveGroup).toHaveBeenCalled();
    expect(confirmAndDeleteGroup).toHaveBeenCalled();
    expect(generateJoinCode).toHaveBeenCalled();
    expect(closeDialog).toHaveBeenCalled();
    expect(copyJoinCodeToClipboard).toHaveBeenCalled();
    expect(navigateGroupHome).toHaveBeenCalled();
    expect(confirmAndKickUser).toHaveBeenCalled();
    expect(confirmAndPromoteUser).toHaveBeenCalled();

    mockDialogVisible = false;
  });

  it('should not show delete group button and kick and promote a user if user is not owner', () => {
    mockIsOwner = false;

    const {getByText, queryByTestId} = renderScreen();

    expect(getByText('myUsername')).toBeTruthy();

    expect(getByText('otherUser')).toBeTruthy();
    expect(queryByTestId('PromoteUserIcon-otherUser')).toBeNull();
    expect(queryByTestId('KickUserIcon-otherUser')).toBeNull();

    expect(queryByTestId('DeleteGroupButton')).toBeNull();
  });
});
