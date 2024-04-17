import { render, fireEvent, act } from '@testing-library/react-native';
import useEditProfileController from './useEditProfileController';
import { Button, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn()
}));

const TestComponent = () => {
    const { username, setUsername, handleEditProfileSubmit } = useEditProfileController('initialUsername', 'initialEmail', 'initialFirstName', 'initialLastName');

    return (
        <View>
            <TextInput testID="usernameInput" value={username} onChangeText={setUsername} />
            <Button testID="submitButton" onPress={handleEditProfileSubmit} title="Submit" />
        </View>
    );
};

describe('useEditProfileController', () => {
    it('should update username state', () => {
        const { getByTestId } = render(
            <NavigationContainer>
                <TestComponent/>
            </NavigationContainer>
        );

        fireEvent.changeText(getByTestId('usernameInput'), 'newUsername');

        expect(getByTestId('usernameInput').props.value).toBe('newUsername');
    });
});