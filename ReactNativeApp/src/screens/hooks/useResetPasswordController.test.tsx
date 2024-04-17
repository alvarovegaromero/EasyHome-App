import { render, fireEvent, act } from '@testing-library/react-native';
import useResetPasswordController from './useResetPasswordController';
import { Alert, Button, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BASE_URL } from '../../config';

jest.mock('react-native/Libraries/Alert/Alert', () => ({
    alert: jest.fn(),
}));


const TestComponent = () => {
    const { email, setEmail, handleResetPasswordSubmit, navigateLoginScreen, navigateRegisterScreen } = useResetPasswordController();

    return (
        <View>
            <TextInput testID="emailInput" value={email} onChangeText={setEmail} />
            <Button testID="submitButton" onPress={handleResetPasswordSubmit} title="Submit" />
            <Button testID="loginButton" onPress={navigateLoginScreen} title="Login" />
            <Button testID="registerButton" onPress={navigateRegisterScreen} title="Register" />
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

describe('useResetPasswordController', () => {
    it('should update email state', () => {
        const { getByTestId } = renderTestComponent();
        fireEvent.changeText(getByTestId('emailInput'), 'newEmail');

        expect(getByTestId('emailInput').props.value).toBe('newEmail');
    });

    // Add more tests here for handleResetPasswordSubmit, navigateLoginScreen, navigateRegisterScreen
});