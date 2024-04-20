import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';
import useHomeController from './hooks/useHomeController';
import { RouteProp } from '@react-navigation/native';
import { MyStackParamsList } from '../../components/types';
import { StackNavigationProp } from '@react-navigation/stack';

jest.mock('./hooks/useHomeController', () => {
    const handleLogout = jest.fn();
    const navigateProfileScreen = jest.fn();

    return () => ({
        handleLogout,
        navigateProfileScreen,
    });
});

const renderScreen = () => {
    const [route, navigation] = [{
        key: 'HomeScreen',
        name: 'HomeScreen',
        params: { username: 'myUsername' },
    }, {
        navigate: jest.fn(),
    }] as const;

    return render(
        <HomeScreen 
            route={route as RouteProp<MyStackParamsList, "HomeScreen">} 
            navigation={navigation as unknown as StackNavigationProp<MyStackParamsList, "HomeScreen">} 
        />
    );
};

describe('HomeScreen', () => {
    it('should render all components', () => {
        const { getByText, getByTestId } = renderScreen();

        expect(getByText("Hola myUsername, you're logged in!!!!")).toBeTruthy();

    
        expect(getByTestId('LogoutButton')).toBeTruthy();
        expect(getByTestId('ProfileButton')).toBeTruthy();
    });

    it('should call the correct functions when buttons are pressed', () => {
        const { getByTestId } = renderScreen();
    
        const { handleLogout, navigateProfileScreen } = useHomeController();

        expect(handleLogout).not.toHaveBeenCalled();
        expect(navigateProfileScreen).not.toHaveBeenCalled();
        
        fireEvent.press(getByTestId('LogoutButton'));
        fireEvent.press(getByTestId('ProfileButton'));
        
        expect(handleLogout).toHaveBeenCalled();
        expect(navigateProfileScreen).toHaveBeenCalled();
    });
});