import {render, fireEvent} from '@testing-library/react-native';
import ProfileScreen from './ProfileScreen';
import useProfileController from './hooks/useProfileController';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('./hooks/useProfileController', () => {
  const navigateEditProfileScreen = jest.fn();

  return () => ({
    username: 'myUsername',
    email: 'myEmail',
    firstName: 'myFirstName',
    lastName: 'myLastName',
    navigateEditProfileScreen,
  });
});

const TestComponent = () => (
  <NavigationContainer>
    <ProfileScreen />
  </NavigationContainer>
);

const renderScreen = () => {
  return render(<TestComponent />);
};

describe('ProfileScreen', () => {
  it('should render all components', () => {
    const {getByText, getByTestId} = renderScreen();

    expect(getByText('Username:')).toBeTruthy();
    expect(getByText('Email:')).toBeTruthy();
    expect(getByText('First Name:')).toBeTruthy();
    expect(getByText('Last Name:')).toBeTruthy();

    expect(getByText('myUsername')).toBeTruthy();
    expect(getByText('myEmail')).toBeTruthy();
    expect(getByText('myFirstName')).toBeTruthy();
    expect(getByText('myLastName')).toBeTruthy();

    expect(getByTestId('EditProfileButton')).toBeTruthy();
  });

  it('should call the correct functions when buttons are pressed', () => {
    const {getByTestId} = renderScreen();

    const {navigateEditProfileScreen} = useProfileController();

    expect(navigateEditProfileScreen).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('EditProfileButton'));

    expect(navigateEditProfileScreen).toHaveBeenCalled();
  });
});
