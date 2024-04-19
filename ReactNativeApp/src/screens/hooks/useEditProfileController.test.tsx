import { render, fireEvent, act } from '@testing-library/react-native';
import useEditProfileController from './useEditProfileController';
import { Alert, Button, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native-reanimated/lib/typescript/Animated';

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn()
}));

const mockedNavigate = jest.fn();
const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            goBack: mockedGoBack,
            navigate: mockedNavigate,
        }),
    };
});

const TestComponent = () => {
    const { username, setUsername, email, setEmail, firstName, setFirstName, lastName, setLastName, handleEditProfileSubmit, handleGoBack } = useEditProfileController('initialUsername', 'initialEmail', 'initialFirstName', 'initialLastName');

    return (
        <View>
            <TextInput testID="usernameInput" value={username} onChangeText={setUsername} />
            <TextInput testID="emailInput" value={email} onChangeText={setEmail} />
            <TextInput testID="firstNameInput" value={firstName} onChangeText={setFirstName} />
            <TextInput testID="lastNameInput" value={lastName} onChangeText={setLastName} />
            <Button testID="submitButton" onPress={handleEditProfileSubmit} title="Submit" />
            <Button testID="goBackButton" onPress={handleGoBack} title="Go Back" />
            <Button testID="editProfileButton" onPress={() => {}} title="Edit Profile" />
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

describe('useEditProfileController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render initial states', () => {
        const { getByTestId } = renderTestComponent();

        expect(getByTestId('usernameInput').props.value).toBe('initialUsername');
        expect(getByTestId('emailInput').props.value).toBe('initialEmail');
        expect(getByTestId('firstNameInput').props.value).toBe('initialFirstName');
        expect(getByTestId('lastNameInput').props.value).toBe('initialLastName');
    });

    it('should update states', () => {
        const { getByTestId } = renderTestComponent();

        const usernameInput = getByTestId('usernameInput');
        const emailInput = getByTestId('emailInput');
        const firstNameInput = getByTestId('firstNameInput');
        const lastNameInput = getByTestId('lastNameInput');

        fireEvent.changeText(usernameInput, 'newUsername');
        fireEvent.changeText(emailInput, 'newEmail');
        fireEvent.changeText(firstNameInput, 'newFirstName');
        fireEvent.changeText(lastNameInput, 'newLastName');

        expect(usernameInput.props.value).toBe('newUsername');
        expect(emailInput.props.value).toBe('newEmail');
        expect(firstNameInput.props.value).toBe('newFirstName');
        expect(lastNameInput.props.value).toBe('newLastName');
    });

    it('should handle successful edit profile submit', async () => {
        const { getByTestId } = renderTestComponent();

        global.fetch = jest.fn(() =>
            Promise.resolve(
                new Response(JSON.stringify({}), {
                    status: 200,
                    headers: {
                        'Content-type': 'application/json'
                    },
                })
            )
        );

        fireEvent.press(getByTestId('submitButton'));

        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });
        
        expect(mockedNavigate).toHaveBeenCalledWith('ProfileScreen');
    });

    it('should handle failed edit profile submit', async () => {
        const { getByTestId } = renderTestComponent();
        
        const alertSpy = jest.spyOn(Alert, 'alert');

        global.fetch = jest.fn(() =>
            Promise.resolve(
                new Response(JSON.stringify({ error: 'Failed' }), {
                    status: 400,
                    headers: {
                        'Content-type': 'application/json'
                    },
                })
            )
        );

        await act(async () => {
            fireEvent.press(getByTestId('submitButton'));
        });

        expect(alertSpy).toHaveBeenCalledWith('Error', 'Failed');
        expect(mockedNavigate).not.toHaveBeenCalledWith('ProfileScreen');
    });

    
    it('should go back when goBackButton is pressed', () => {
        const { getByTestId } = renderTestComponent();

        fireEvent.press(getByTestId('goBackButton'));

        expect(mockedGoBack).toHaveBeenCalled();
    });
});