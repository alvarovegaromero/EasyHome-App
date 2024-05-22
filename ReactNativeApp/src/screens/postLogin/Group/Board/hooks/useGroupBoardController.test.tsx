import { renderHook } from "@testing-library/react-native";
import useGroupBoardController from "./useGroupBoardController";


jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('dummy_token')),
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
        }),
    };
});

const renderTestHookTest = () => {
    return renderHook(() => useGroupBoardController());
};


describe('useGroupBoardController', () => {
    describe('navigation', () => {
        it('should navigate to GroupHomeScreen', () => {
            const { result } = renderTestHookTest();
            result.current.navigateGroupHome();
            expect(mockedNavigate).toHaveBeenCalledWith('GroupHomeScreen');
        });
    });
});
