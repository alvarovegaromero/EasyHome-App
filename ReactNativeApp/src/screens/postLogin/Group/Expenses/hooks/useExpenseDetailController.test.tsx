import {BASE_URL} from '../../../../../config';
import {Alert} from 'react-native';
import useExpenseDetailController from './useExpenseDetailController';
import {renderHook, waitFor} from '@testing-library/react-native';
import React from 'react';
import {
  mockFailedFetch,
  mockSuccesfulFetch,
  pressSecondOptionAlert,
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  describe('confirmAndDeleteExpense', () => {
    it('should show alert for confirming deletion', async () => {
      const {result} = renderTestHookTest();

      const alertSpy = jest.spyOn(Alert, 'alert');

      result.current.confirmAndDeleteExpense();

      expect(alertSpy).toHaveBeenCalledWith(
        'Confirmation',
        'Are you sure you want to delete this expense?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: expect.any(Function),
          },
        ],
      );
    });

    describe('deleteExpense', () => {
      it('should call deleteExpense when confirming deletion', async () => {
        mockSuccesfulFetch({});

        const mockGroupId = 'dummy_id';
        const mockExpenseId = 'dummy_id2';

        const useContextSpy = jest.spyOn(React, 'useContext');
        useContextSpy.mockReturnValue({
          groupId: mockGroupId,
          expenseId: mockExpenseId,
        });

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndDeleteExpense();

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        expect(fetch).toHaveBeenCalledWith(
          `${BASE_URL}/api/expense_distribution/${mockGroupId}/expenses/${mockExpenseId}`,
          expect.objectContaining({
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token dummy_token',
            },
          }),
        );

        useContextSpy.mockRestore();
      });

      it(
        'should navigate to GroupExpensesScreen and clear expenseId ' +
          'when delete is successful',
        async () => {
          mockSuccesfulFetch({});

          const mockGroupId = 'dummy_id';
          const mockExpenseId = 'dummy_id2';
          const mockSetExpenseId = jest.fn();

          const useContextSpy = jest.spyOn(React, 'useContext');
          useContextSpy.mockReturnValue({
            groupId: mockGroupId,
            expenseId: mockExpenseId,
            setExpenseId: mockSetExpenseId,
          });

          const {result} = renderTestHookTest();

          const alertSpy = jest.spyOn(Alert, 'alert');

          result.current.confirmAndDeleteExpense();

          await waitFor(() => pressSecondOptionAlert(alertSpy));

          expect(mockedNavigate).toHaveBeenCalledWith('GroupExpensesScreen');
          expect(mockSetExpenseId).toHaveBeenCalledWith('');

          useContextSpy.mockRestore();
        },
      );

      it('should show error alert when delete fails', async () => {
        mockFailedFetch('Delete expense failed');

        const {result} = renderTestHookTest();

        const alertSpy = jest.spyOn(Alert, 'alert');

        result.current.confirmAndDeleteExpense();

        await waitFor(() => pressSecondOptionAlert(alertSpy));

        await waitFor(() =>
          expect(alertSpy).toHaveBeenCalledWith(
            'Error',
            'Delete expense failed',
          ),
        );
      });
    });
  });
});
