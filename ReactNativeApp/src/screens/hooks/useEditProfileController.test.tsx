import { act, renderHook } from '@testing-library/react-native';
import useEditProfileController from './useEditProfileController';
import { Alert} from 'react-native';

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

const renderTestHookTest = () => {
    return renderHook(() => useEditProfileController('initialUsername', 'initialEmail', 'initialFirstName', 'initialLastName'));
};

const mockSuccesfulFetch = () => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(),
        })
    );
};

const mockFailedFetch = (errorMessage: string) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            ok: false,
            status: 400,
            json: () => Promise.resolve({ error: errorMessage }),
        })
    );
};

describe('useEditProfileController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render initial states', () => {
        const { result } = renderTestHookTest();

        expect(result.current.username).toBe('initialUsername');
        expect(result.current.email).toBe('initialEmail');
        expect(result.current.firstName).toBe('initialFirstName');
        expect(result.current.lastName).toBe('initialLastName');
    });

    it('should update states', () => {
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.setUsername('newUsername');
            result.current.setEmail('newEmail');
            result.current.setFirstName('newFirstName');
            result.current.setLastName('newLastName');
        });
    
        expect(result.current.username).toBe('newUsername');
        expect(result.current.email).toBe('newEmail');
        expect(result.current.firstName).toBe('newFirstName');
        expect(result.current.lastName).toBe('newLastName');
    });
    
    it('should handle successful edit profile submit', async () => {
        const { result } = renderTestHookTest();
    
        mockSuccesfulFetch();
    
        await act(async () => {
            result.current.handleEditProfileSubmit();
        });
    
        expect(mockedNavigate).toHaveBeenCalledWith('ProfileScreen');
    });
    
    it('should handle failed edit profile submit', async () => {
        const { result } = renderTestHookTest();
    
        const alertSpy = jest.spyOn(Alert, 'alert');
    
        mockFailedFetch('Failed');
    
        await act(async () => {
            result.current.handleEditProfileSubmit();
        });
    
        expect(alertSpy).toHaveBeenCalledWith('Error', 'Failed');
        expect(mockedNavigate).not.toHaveBeenCalledWith('ProfileScreen');
    });
    
    it('should go back when handleGoBack is called', () => {
        const { result } = renderTestHookTest();
    
        act(() => {
            result.current.handleGoBack();
        });
    
        expect(mockedGoBack).toHaveBeenCalled();
    });
});