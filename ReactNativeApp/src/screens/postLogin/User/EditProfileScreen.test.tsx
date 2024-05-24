import {render, fireEvent} from '@testing-library/react-native';
import EditProfileScreen from './EditProfileScreen';
import useEditProfileController from './hooks/useEditProfileController';
import {RouteProp} from '@react-navigation/native';
import {MyStackParamsList} from '../../../components/types';
import {StackNavigationProp} from '@react-navigation/stack';

const initialUsername = 'myUsername';
const initialEmail = 'myEmail';
const initialFirstName = 'myFirstName';
const initialLastName = 'myLastName';

jest.mock('./hooks/useEditProfileController', () => {
  const setUsername = jest.fn();
  const setEmail = jest.fn();
  const setFirstName = jest.fn();
  const setLastName = jest.fn();
  const handleEditProfileSubmit = jest.fn();
  const handleGoBack = jest.fn();

  return () => ({
    username: initialUsername,
    setUsername,
    email: initialEmail,
    setEmail,
    firstName: initialFirstName,
    setFirstName,
    lastName: initialLastName,
    setLastName,
    handleEditProfileSubmit,
    handleGoBack,
  });
});

const renderScreen = () => {
  const [route, navigation] = [
    {
      key: 'EditProfileScreen',
      name: 'EditProfileScreen',
      params: {
        username: initialUsername,
        email: initialEmail,
        firstName: initialFirstName,
        lastName: initialLastName,
      },
    },
    {
      navigate: jest.fn(),
    },
  ] as const;

  return render(
    <EditProfileScreen
      route={route as RouteProp<MyStackParamsList, 'EditProfileScreen'>}
      navigation={
        navigation as unknown as StackNavigationProp<
          MyStackParamsList,
          'EditProfileScreen'
        >
      }
    />,
  );
};

describe('ProfileScreen', () => {
  it('should render all components', () => {
    const {getByText, getByTestId} = renderScreen();

    expect(getByText('My Profile:')).toBeTruthy();

    expect(getByTestId('UsernameInput')).toBeTruthy();
    expect(getByTestId('EmailInput')).toBeTruthy();
    expect(getByTestId('FirstNameInput')).toBeTruthy();
    expect(getByTestId('LastNameInput')).toBeTruthy();

    expect(getByTestId('GoBackButton')).toBeTruthy();
    expect(getByTestId('SaveChangesButton')).toBeTruthy();
  });

  it('inputs should have the initial values at the beginning', () => {
    const {getByTestId} = renderScreen();

    expect(getByTestId('UsernameInput').props.value).toBe(initialUsername);
    expect(getByTestId('EmailInput').props.value).toBe(initialEmail);
    expect(getByTestId('FirstNameInput').props.value).toBe(initialFirstName);
    expect(getByTestId('LastNameInput').props.value).toBe(initialLastName);
  });

  it('should update states when inputs are changed', () => {
    const {getByTestId} = renderScreen();

    const {setUsername, setEmail, setFirstName, setLastName} =
      useEditProfileController(
        initialUsername,
        initialEmail,
        initialFirstName,
        initialLastName,
      );

    expect(setUsername).not.toHaveBeenCalledWith();
    expect(setEmail).not.toHaveBeenCalledWith();
    expect(setFirstName).not.toHaveBeenCalledWith();
    expect(setLastName).not.toHaveBeenCalledWith();

    fireEvent.changeText(getByTestId('UsernameInput'), 'newUsername');
    fireEvent.changeText(getByTestId('EmailInput'), 'newEmail');
    fireEvent.changeText(getByTestId('FirstNameInput'), 'newFirstName');
    fireEvent.changeText(getByTestId('LastNameInput'), 'newLastName');

    expect(setUsername).toHaveBeenCalledWith('newUsername');
    expect(setEmail).toHaveBeenCalledWith('newEmail');
    expect(setFirstName).toHaveBeenCalledWith('newFirstName');
    expect(setLastName).toHaveBeenCalledWith('newLastName');
  });

  it('should call the correct functions when buttons are pressed', () => {
    const {getByTestId} = renderScreen();

    const {handleGoBack, handleEditProfileSubmit} = useEditProfileController(
      initialUsername,
      initialEmail,
      initialFirstName,
      initialLastName,
    );

    expect(handleGoBack).not.toHaveBeenCalled();
    expect(handleEditProfileSubmit).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('GoBackButton'));
    fireEvent.press(getByTestId('SaveChangesButton'));

    expect(handleGoBack).toHaveBeenCalled();
    expect(handleEditProfileSubmit).toHaveBeenCalled();
  });
});
