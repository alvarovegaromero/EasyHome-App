import {fireEvent, render} from '@testing-library/react-native';
import GroupHomeScreen from './GroupHomeScreen';
import useGroupHomeController from './hooks/useGroupHomeController';

jest.mock('./hooks/useGroupHomeController', () => {
  const navigateSettings = jest.fn();
  const navigateHome = jest.fn();
  const navigateExpenses = jest.fn();

  return () => ({
    groupName: 'myGroupName',
    navigateSettings,
    navigateHome,
    navigateExpenses,
  });
});

const renderScreen = () => {
  return render(<GroupHomeScreen />);
};

describe('GroupHomeScreen', () => {
  it('should render all components', () => {
    const {getByText, getByTestId} = renderScreen();

    expect(getByText('myGroupName')).toBeTruthy();

    expect(getByText('What do you want to do today?')).toBeTruthy();

    expect(getByTestId('DistributeExpensesButton')).toBeTruthy();
    expect(getByTestId('ManageShoppingListsButton')).toBeTruthy();
    expect(getByTestId('DistributeHouseholdChoresButton')).toBeTruthy();
    expect(getByTestId('ViewThePantryButton')).toBeTruthy();
    expect(getByTestId('GroupBoardButton')).toBeTruthy();
    expect(getByTestId('GroupSettingsButton')).toBeTruthy();
    expect(getByTestId('GoBackToHomeButton')).toBeTruthy();
  });

  it('should call the correct functions when buttons are pressed', () => {
    const {getByTestId} = renderScreen();

    const {navigateSettings, navigateHome, navigateExpenses} =
      useGroupHomeController();

    expect(navigateSettings).not.toHaveBeenCalled();
    expect(navigateHome).not.toHaveBeenCalled();
    expect(navigateExpenses).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('GroupSettingsButton'));
    fireEvent.press(getByTestId('GoBackToHomeButton'));
    fireEvent.press(getByTestId('DistributeExpensesButton'));

    expect(navigateSettings).toHaveBeenCalled();
    expect(navigateHome).toHaveBeenCalled();
    expect(navigateExpenses).toHaveBeenCalled();
  });
});
