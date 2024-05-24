import {render, fireEvent} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import useHomeController from './hooks/useHomeController';

var mockDialogVisible = false;
var mockGroups = [
  {id: '1', name: 'Group 1'},
  {id: '2', name: 'Group 2'},
];

jest.mock('./hooks/useHomeController', () => {
  const handleLogout = jest.fn();
  const navigateProfileScreen = jest.fn();
  const showDialog = jest.fn();
  const closeDialog = jest.fn();
  const setJoinCode = jest.fn();
  const joinGroup = jest.fn();
  const navigateGroupHomeScreen = jest.fn();
  const navigateCreateGroupScreen = jest.fn();

  return () => ({
    username: 'myUsername',
    groups: mockGroups,
    handleLogout,
    showDialog,
    closeDialog,
    dialogVisible: mockDialogVisible,
    setJoinCode,
    joinGroup,
    navigateGroupHomeScreen,
    navigateProfileScreen,
    navigateCreateGroupScreen,
  });
});

const renderScreen = () => {
  return render(<HomeScreen />);
};

describe('HomeScreen', () => {
  it('should render all components', () => {
    const {getByText, getByTestId} = renderScreen();

    expect(getByText('Hello myUsername!')).toBeTruthy();
    expect(getByText('Select the group you want to see:')).toBeTruthy();
    expect(getByText('Your Groups:')).toBeTruthy();
    expect(getByText('Group 1')).toBeTruthy();
    expect(getByText('Group 2')).toBeTruthy();

    expect(getByTestId('LogoutButton')).toBeTruthy();
    expect(getByTestId('ProfileButton')).toBeTruthy();
    expect(getByTestId('JoinGroupButton')).toBeTruthy();
    expect(getByTestId('CreateGroupButton')).toBeTruthy();
  });

  it('if there are no groups, it should render the correct message', () => {
    mockGroups = [];
    const {getByText} = renderScreen();

    expect(getByText('You are not part of any group yet :(')).toBeTruthy();
    expect(getByText('Join or Create a Group to see them here')).toBeTruthy();
  });

  it('should call the correct functions when buttons are pressed', () => {
    const {getByTestId} = renderScreen();

    const {
      handleLogout,
      navigateProfileScreen,
      showDialog,
      navigateCreateGroupScreen,
    } = useHomeController();

    expect(handleLogout).not.toHaveBeenCalled();
    expect(navigateProfileScreen).not.toHaveBeenCalled();
    expect(showDialog).not.toHaveBeenCalled();
    expect(navigateCreateGroupScreen).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('LogoutButton'));
    fireEvent.press(getByTestId('ProfileButton'));
    fireEvent.press(getByTestId('JoinGroupButton'));
    fireEvent.press(getByTestId('CreateGroupButton'));

    expect(handleLogout).toHaveBeenCalled();
    expect(navigateProfileScreen).toHaveBeenCalled();
    expect(showDialog).toHaveBeenCalled();
    expect(navigateCreateGroupScreen).toHaveBeenCalled();
  });

  it('should handle group join dialog correctly', () => {
    mockDialogVisible = true;
    const {getByText} = renderScreen();

    // Verify that the dialog is rendered correctly
    expect(getByText('Join Group')).toBeTruthy();
    expect(
      getByText('Enter the join code for the group you want to join.'),
    ).toBeTruthy();

    const {closeDialog, joinGroup} = useHomeController();

    expect(closeDialog).not.toHaveBeenCalled();
    expect(joinGroup).not.toHaveBeenCalled();

    // Simulate pressing the Cancel and Join buttons
    fireEvent.press(getByText('Cancel'));
    fireEvent.press(getByText('Join'));

    expect(closeDialog).toHaveBeenCalled();
    expect(joinGroup).toHaveBeenCalled();
  });
});
