import {renderHook, waitFor} from '@testing-library/react-native';
import useAddExpenseController from './useAddExpenseController';

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
  return renderHook(() => useAddExpenseController());
};

describe('useAddExpenseController', () => {
  describe('initialStates and setStates', () => {
    it('should update concept, payer', async () => {
      const {result} = renderTestHookTest();
      expect(result.current.concept).toBe(undefined);
      expect(result.current.payer).toBe(undefined);

      result.current.setConcept('dummy_concept');
      await waitFor(() => expect(result.current.concept).toBe('dummy_concept'));

      result.current.setPayer('dummy_payer');
      await waitFor(() => expect(result.current.payer).toBe('dummy_payer'));
    });

    it('should change amount', async () => {
      const {result} = renderTestHookTest();
      expect(result.current.amount).toBe(undefined);

      result.current.handleAmountChange('123.12');
      await waitFor(() => expect(result.current.amount).toBe('123.12'));
      result.current.handleAmountChange('123a.12');
      await waitFor(() => expect(result.current.amount).toBe('123.12'));
      result.current.handleAmountChange('123,12');
      await waitFor(() => expect(result.current.amount).toBe('123.12'));
      result.current.handleAmountChange('123,123');
      await waitFor(() => expect(result.current.amount).toBe('123.12'));
      result.current.handleAmountChange('321.1');
      await waitFor(() => expect(result.current.amount).toBe('321.1'));
    });

    it('should update selectedUsers', async () => {
      const {result} = renderTestHookTest();

      //initial state - useEffect set all users to true (selected)
      expect(result.current.selectedUsers).toEqual({});

      result.current.handleCheckBoxChange(1, true);
      await waitFor(() =>
        expect(result.current.selectedUsers).toEqual({1: true}),
      );

      result.current.handleCheckBoxChange(2, false);
      await waitFor(() =>
        expect(result.current.selectedUsers).toEqual({1: true, 2: false}),
      );

      result.current.handleCheckBoxChange(1, false);
      await waitFor(() =>
        expect(result.current.selectedUsers).toEqual({1: false, 2: false}),
      );
    });

    it('should update date', async () => {
      const {result} = renderTestHookTest();
      expect(result.current.date.toISOString().split('T')[0]) //compare only date, not time
        .toEqual(new Date().toISOString().split('T')[0]);

      const date = new Date(2021, 1, 1);
      result.current.setDate(date);

      result.current.setDate(date);
      await waitFor(() => {
        expect(result.current.date.toISOString().split('T')[0]).toEqual(
          date.toISOString().split('T')[0],
        );
      });
    });
  });

  describe('fetchGroupUsersData', () => {});

  describe('handleCreateExpenseSubmit', () => {});

  describe('navigation', () => {
    it('should navigate to ExpensesHomeScreen', () => {
      const {result} = renderTestHookTest();
      result.current.navigateExpensesHomeScreen();
      expect(mockedNavigate).toHaveBeenCalledWith('ExpensesHomeScreen');
    });
  });
});
