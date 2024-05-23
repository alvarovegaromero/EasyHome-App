import {render, fireEvent} from '@testing-library/react-native';
import ProfileScreen from './ProfileScreen';
import useProfileController from './hooks/useProfileController';

jest.mock('./hooks/useProfileController', () => {
  const handleGoBack = jest.fn();
  const navigateEditProfileScreen = jest.fn();

  return () => ({
    username: 'myUsername',
    email: 'myEmail',
    firstName: 'myFirstName',
    lastName: 'myLastName',
    handleGoBack,
    navigateEditProfileScreen,
  });
});

const renderScreen = () => {
  return render(<ProfileScreen />);
};

describe('ProfileScreen', () => {
  it('should render all components', () => {
    const {getByText, getByTestId} = renderScreen();

    expect(getByText('My Profile:')).toBeTruthy();

    expect(getByText('Username: myUsername')).toBeTruthy();
    expect(getByText('Email: myEmail')).toBeTruthy();
    expect(getByText('First Name: myFirstName')).toBeTruthy();
    expect(getByText('Last Name: myLastName')).toBeTruthy();

    expect(getByTestId('GoBackButton')).toBeTruthy();
    expect(getByTestId('EditProfileButton')).toBeTruthy();
  });

  it('should call the correct functions when buttons are pressed', () => {
    const {getByTestId} = renderScreen();

    const {handleGoBack, navigateEditProfileScreen} = useProfileController();

    expect(handleGoBack).not.toHaveBeenCalled();
    expect(navigateEditProfileScreen).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('GoBackButton'));
    fireEvent.press(getByTestId('EditProfileButton'));

    expect(handleGoBack).toHaveBeenCalled();
    expect(navigateEditProfileScreen).toHaveBeenCalled();
  });
});
