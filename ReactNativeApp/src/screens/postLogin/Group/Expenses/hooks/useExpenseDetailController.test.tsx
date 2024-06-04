import {BASE_URL} from '../../../../../config';
import {Alert} from 'react-native';
import useExpenseDetailController from './useExpenseDetailController';
import {renderHook, waitFor} from '@testing-library/react-native';
import React from 'react';
import {
  mockFailedFetch,
  mockSuccesfulFetch,
} from '../../../../../utils/utilsTestingHooks';

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
  return renderHook(() => useExpenseDetailController());
};

describe('useExpenseDetailController', () => {
  describe('fetchExpenseDetails', () => {
    it('should call proper endpoint for fetching expenses when just render', async () => {
      mockSuccesfulFetch({});

      const mockGroupId = 'dummy_id';
      const mockExpenseId = 'dummy_id2';

      const useContextSpy = jest.spyOn(React, 'useContext');
      useContextSpy.mockReturnValue({
        groupId: mockGroupId,
        expenseId: mockExpenseId,
      });

      renderTestHookTest();

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}/api/expense_distribution/${mockGroupId}/expenses/${mockExpenseId}`,
          expect.objectContaining({
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token dummy_token',
            },
          }),
        );
      });

      useContextSpy.mockRestore();
    });

    it('should fetch proper expense details', async () => {
      const {result} = renderTestHookTest();
      expect(result.current.expense).toBe(undefined);

      const mockExpenseData = {
        id: 'dummy_id',
        name: 'dummy_name',
        amount: '10',
        date_paid: '2021-08-01',
        paid_by: 'dummy_paid_by',
        debtors: 'dummy_debtors',
        date_added: '2021-08-01',
      };
      mockSuccesfulFetch(mockExpenseData);

      await waitFor(() =>
        expect(result.current.expense).toStrictEqual({
          ...mockExpenseData,
          amount: 10,
          date_paid: new Date(mockExpenseData.date_paid),
          date_added: new Date(mockExpenseData.date_added),
        }),
      );
    });

    it('should show error alert when fetch fails', async () => {
      mockFailedFetch("Fetch expense's details failed");

      const alertSpy = jest.spyOn(Alert, 'alert');
      renderTestHookTest();

      await waitFor(() =>
        expect(alertSpy).toHaveBeenCalledWith(
          'Error',
          "Fetch expense's details failed",
        ),
      );
    });
  });

  describe('navigation', () => {
    it('should navigate to ExpensesHomeScreen', async () => {
      const {result} = renderTestHookTest();

      result.current.navigateExpensesHomeScreen();

      expect(mockedNavigate).toHaveBeenCalledWith('ExpensesHomeScreen');
    });

    it('should update expensesId when navigating to ExpensesHomeScreen', () => {
      const mockSetExpenseId = jest.fn();
      const useContextSpy = jest.spyOn(React, 'useContext');
      useContextSpy.mockReturnValue({setExpenseId: mockSetExpenseId});

      const {result} = renderTestHookTest();

      result.current.navigateExpensesHomeScreen();

      expect(mockSetExpenseId).toHaveBeenCalledWith('');
    });
  });
});
