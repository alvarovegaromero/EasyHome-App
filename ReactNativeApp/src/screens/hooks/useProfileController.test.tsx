import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import useProfileController from './useProfileController';

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
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
            addListener: jest.fn().mockImplementation((event, callback) => callback()),
        }),
    };
});

const TestComponent = () => {
    const { username, email, firstName, lastName, handleGoBack, navigateEditProfileScreen } = useProfileController();
    return (
        <View>
            <Text testID="usernameText">{username}</Text>
            <Text testID="emailText">{email}</Text>
            <Text testID="firstNameText">{firstName}</Text>
            <Text testID="lastNameText">{lastName}</Text>
            <Button testID="goBackButton" onPress={handleGoBack} title="Go Back" />
            <Button testID="editProfileButton" onPress={navigateEditProfileScreen} title="Edit Profile" />
        </View>
    );
};

const renderTestComponent = () => {
    return render(
        <NavigationContainer>
            <TestComponent/>
        </NavigationContainer>
    );
};


describe('useLoginController', () => {
    it('should be undefined while fetchData has not been done yet', () => {
        const { getByTestId } = renderTestComponent();

        expect(getByTestId('usernameText').props.value).toBe(undefined);
        expect(getByTestId('emailText').props.value).toBe(undefined);
        expect(getByTestId('firstNameText').props.value).toBe(undefined);
        expect(getByTestId('lastNameText').props.value).toBe(undefined);
    });

    it('should navigate to EditProfileScreen', () => {
        const { getByTestId } = renderTestComponent();

        fireEvent.press(getByTestId('editProfileButton'));
        expect(mockedNavigate).toHaveBeenCalledWith('EditProfileScreen', { username: '', email: '', firstName: '', lastName: '' });
    });
    
    it('should navigate to HomeScreen', () => {
        const { getByTestId } = renderTestComponent();

        fireEvent.press(getByTestId('goBackButton'));
        expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen', { username: '' });
    });
});