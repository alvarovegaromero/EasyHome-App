import { act, renderHook, waitFor } from '@testing-library/react-native';
import useProfileController from './useProfileController';
import { mockSuccesfulFetch } from '../../../../utils/utilsTestingHooks';


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
            addListener: jest.fn().mockImplementation((event, callback) => callback()),
        }),
    };
});

const renderTestHookTest = () => {
    return renderHook(() => useProfileController());
};


describe('useLoginController', () => {
    it('should be undefined while fetchData has not been done', () => {
        const { result } = renderTestHookTest();

        expect(result.current.username).toBe("");
        expect(result.current.email).toBe("");
        expect(result.current.firstName).toBe("");
        expect(result.current.lastName).toBe("");
    });

    it('should render the fetched data', async () => {  
        const testData = {
            username: 'username',
            email: 'email@example.com',
            firstName: 'John',
            lastName: 'Doe',
        };

        mockSuccesfulFetch(testData);

        const { result } = renderTestHookTest();
    
        await waitFor(() => {
            expect(result.current.username).toBe(testData.username);
            expect(result.current.email).toBe(testData.email);
            expect(result.current.firstName).toBe(testData.firstName);
            expect(result.current.lastName).toBe(testData.lastName);
        });
    });

    it('should navigate to EditProfileScreen', () => {
        const { result } = renderTestHookTest();

        act(() => {
            result.current.navigateEditProfileScreen();
        });

        expect(mockedNavigate).toHaveBeenCalledWith('EditProfileScreen', { username: '', email: '', firstName: '', lastName: '' });
    });
    
    it('should navigate to HomeScreen', () => {
        const { result } = renderTestHookTest();

        act(() => {
            result.current.handleGoBack();
        });

        expect(mockedNavigate).toHaveBeenCalledWith('HomeScreen', { username: '' });
    });
});