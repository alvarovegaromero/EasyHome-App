import {fireEvent, render} from '@testing-library/react-native';
import GroupHomeScreen from './GroupHomeScreen';
import useGroupHomeController from './hooks/useGroupHomeController';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('./hooks/useGroupHomeController', () => {
  const navigateSettings = jest.fn();
  const navigateHome = jest.fn();
  const navigateExpenses = jest.fn();
  const navigateBoard = jest.fn();
  const navigateChores = jest.fn();
  const navigateShoppingList = jest.fn();

  return () => ({
    groupName: 'myGroupName',
    navigateSettings,
    navigateHome,
    navigateExpenses,
    navigateBoard,
    navigateChores,
    navigateShoppingList,
  });
});

const TestComponent = () => (
  <NavigationContainer>
    <GroupHomeScreen />
  </NavigationContainer>
);

const renderScreen = () => {
  return render(<TestComponent />);
};

describe('GroupHomeScreen', () => {
  it('should render all components', () => {
    const {getByText, getByTestId} = renderScreen();

    expect(getByText('myGroupName')).toBeTruthy();

    expect(getByTestId('DistributeExpensesIcon')).toBeTruthy();
    expect(getByTestId('ManageShoppingListsIcon')).toBeTruthy();
    expect(getByTestId('HouseholdChoresIcon')).toBeTruthy();
    expect(getByTestId('ViewThePantryIcon')).toBeTruthy();
    expect(getByTestId('GroupBoardIcon')).toBeTruthy();
    expect(getByTestId('GroupSettingsIcon')).toBeTruthy();
    expect(getByTestId('GoBackToHomeIcon')).toBeTruthy();
  });

  it('should call the correct functions when buttons are pressed', () => {
    const {getByTestId} = renderScreen();

    const {
      navigateSettings,
      navigateHome,
      navigateExpenses,
      navigateBoard,
      navigateChores,
      navigateShoppingList,
    } = useGroupHomeController();

    expect(navigateSettings).not.toHaveBeenCalled();
    expect(navigateHome).not.toHaveBeenCalled();
    expect(navigateExpenses).not.toHaveBeenCalled();
    expect(navigateBoard).not.toHaveBeenCalled();
    expect(navigateChores).not.toHaveBeenCalled();
    expect(navigateShoppingList).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('GroupSettingsIcon'));
    fireEvent.press(getByTestId('GoBackToHomeIcon'));
    fireEvent.press(getByTestId('DistributeExpensesIcon'));
    fireEvent.press(getByTestId('GroupBoardIcon'));
    fireEvent.press(getByTestId('HouseholdChoresIcon'));
    fireEvent.press(getByTestId('ManageShoppingListsIcon'));

    expect(navigateSettings).toHaveBeenCalled();
    expect(navigateHome).toHaveBeenCalled();
    expect(navigateExpenses).toHaveBeenCalled();
    expect(navigateBoard).toHaveBeenCalled();
    expect(navigateChores).toHaveBeenCalled();
    expect(navigateShoppingList).toHaveBeenCalled();
  });
});
