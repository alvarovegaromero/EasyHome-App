import {render, fireEvent} from '@testing-library/react-native';
import CreateGroupScreen from './CreateGroupScreen';
import useCreateGroupController from './hooks/useCreateGroupController';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('./hooks/useCreateGroupController', () => {
  const setName = jest.fn();
  const setDescription = jest.fn();
  const setCurrency = jest.fn();
  const handleCreateGroupSubmit = jest.fn();
  const handleGoBack = jest.fn();

  return () => ({
    name: '',
    setName,
    description: '',
    setDescription,
    currency: '',
    setCurrency,
    currencies: [['USD', 'United States Dollar']],
    handleCreateGroupSubmit,
    handleGoBack,
  });
});

const TestComponent = () => (
  <NavigationContainer>
    <CreateGroupScreen />
  </NavigationContainer>
);

const renderScreen = () => {
  return render(<TestComponent />);
};

describe('CreateGroupScreen', () => {
  it('should render all components', () => {
    const {getByText, getByTestId} = renderScreen();

    expect(getByText('Create Group')).toBeTruthy();
    expect(getByTestId('NameInput')).toBeTruthy();
    expect(getByText('Description:')).toBeTruthy();
    expect(getByTestId('DescriptionInput')).toBeTruthy();
    expect(getByText('Currency:')).toBeTruthy();
    expect(getByTestId('CurrencyPicker')).toBeTruthy();

    expect(getByTestId('CancelButton')).toBeTruthy();
    expect(getByTestId('CreateGroupButton')).toBeTruthy();
  });

  it('should update states when inputs are changed', () => {
    const {getByTestId} = renderScreen();

    const {setName, setDescription, setCurrency} = useCreateGroupController();

    expect(setName).not.toHaveBeenCalledWith();
    expect(setDescription).not.toHaveBeenCalledWith();
    expect(setCurrency).not.toHaveBeenCalledWith();

    fireEvent.changeText(getByTestId('NameInput'), 'newName');
    fireEvent.changeText(getByTestId('DescriptionInput'), 'newDescription');

    // picker component calls the onValueChange prop when a new item is selected
    fireEvent(getByTestId('CurrencyPicker'), 'onValueChange', 'newCurrency');

    expect(setName).toHaveBeenCalledWith('newName');
    expect(setDescription).toHaveBeenCalledWith('newDescription');
    expect(setCurrency).toHaveBeenCalledWith('newCurrency');
  });

  it('should call the correct functions when buttons are pressed', () => {
    const {getByTestId} = renderScreen();

    const {handleGoBack, handleCreateGroupSubmit} = useCreateGroupController();

    expect(handleGoBack).not.toHaveBeenCalled();
    expect(handleCreateGroupSubmit).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('CancelButton'));
    fireEvent.press(getByTestId('CreateGroupButton'));

    expect(handleGoBack).toHaveBeenCalled();
    expect(handleCreateGroupSubmit).toHaveBeenCalled();
  });
});
