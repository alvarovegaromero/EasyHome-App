import {fireEvent, render} from '@testing-library/react-native';
import GroupBoardScreen from './GroupBoardScreen';
import useGroupBoardController from './hooks/useGroupBoardController';

let mockIsEditable = false;
jest.mock('./hooks/useGroupBoardController', () => {
  const mockAllowEdit = jest.fn();
  const mockSaveChanges = jest.fn();
  const mockNavigateGroupHome = jest.fn();
  const mockSetBoardContent = jest.fn();

  return () => ({
    boardContent: 'dummy_content',
    setBoardContent: mockSetBoardContent,
    isEditable: mockIsEditable,
    allowEdit: mockAllowEdit,
    saveChanges: mockSaveChanges,
    navigateGroupHome: mockNavigateGroupHome,
  });
});

const renderScreen = () => {
  return render(<GroupBoardScreen />);
};

describe('GroupBoardScreen', () => {
  describe('isEditable set to false', () => {
    it('should render all components', () => {
      const {getByText, getByTestId} = renderScreen();

      expect(getByText('dummy_content')).toBeTruthy();
      expect(getByTestId('AllowEditionButton')).toBeTruthy();
      expect(getByTestId('GoToGroupHomeButton')).toBeTruthy();
    });

    it('should call the correct functions when button are pressed', () => {
      const {getByTestId} = renderScreen();

      const {allowEdit, navigateGroupHome} = useGroupBoardController();

      expect(allowEdit).not.toHaveBeenCalled();
      expect(navigateGroupHome).not.toHaveBeenCalled();

      fireEvent.press(getByTestId('AllowEditionButton'));
      fireEvent.press(getByTestId('GoToGroupHomeButton'));

      expect(allowEdit).toHaveBeenCalled();
      expect(navigateGroupHome).toHaveBeenCalled();
    });
  });

  describe('isEditable set to true', () => {
    it('should render all components', () => {
      mockIsEditable = true;

      const {getByTestId} = renderScreen();

      expect(getByTestId('BoardContentInput').props.value).toBe('dummy_content');
      expect(getByTestId('SaveChangesButton')).toBeTruthy();
    });

    it('should update states when inputs are changed', () => {
      mockIsEditable = true;

      const {getByTestId} = renderScreen();

      const {setBoardContent} = useGroupBoardController();

      expect(setBoardContent).not.toHaveBeenCalled();

      fireEvent.changeText(getByTestId('BoardContentInput'), 'newContent');

      expect(setBoardContent).toHaveBeenCalledWith('newContent');
    });

    it('should call the correct functions when button are pressed', () => {
      mockIsEditable = true;

      const {getByTestId} = renderScreen();

      const {saveChanges} = useGroupBoardController();

      fireEvent.press(getByTestId('SaveChangesButton'));

      expect(saveChanges).toHaveBeenCalled();
    });
  });
});
