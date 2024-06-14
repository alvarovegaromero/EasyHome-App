import {fireEvent, render} from '@testing-library/react-native';
import GroupBoardScreen from './GroupBoardScreen';
import useGroupBoardController from './hooks/useGroupBoardController';
import {NavigationContainer} from '@react-navigation/native';

let mockIsEditable = false;
jest.mock('./hooks/useGroupBoardController', () => {
  const mockAllowEdit = jest.fn();
  const mockSaveChanges = jest.fn();
  const mockSetBoardContent = jest.fn();
  const mockDiscardChanges = jest.fn();

  return () => ({
    boardContent: 'dummy_content',
    setBoardContent: mockSetBoardContent,
    isEditable: mockIsEditable,
    allowEdit: mockAllowEdit,
    saveChanges: mockSaveChanges,
    discardChanges: mockDiscardChanges,
  });
});

const TestComponent = () => (
  <NavigationContainer>
    <GroupBoardScreen />
  </NavigationContainer>
);

const renderScreen = () => {
  return render(<TestComponent />);
};

describe('GroupBoardScreen', () => {
  describe('isEditable set to false', () => {
    it('should render all components', () => {
      const {getByText, getByTestId} = renderScreen();

      expect(getByText('dummy_content')).toBeTruthy();
      expect(getByTestId('AllowEditionButton')).toBeTruthy();
    });

    it('should call the correct functions when buttons are pressed', () => {
      const {getByTestId} = renderScreen();

      const {allowEdit} = useGroupBoardController();

      expect(allowEdit).not.toHaveBeenCalled();

      fireEvent.press(getByTestId('AllowEditionButton'));

      expect(allowEdit).toHaveBeenCalled();
    });
  });

  describe('isEditable set to true', () => {
    it('should render all components', () => {
      mockIsEditable = true;

      const {getByTestId} = renderScreen();

      expect(getByTestId('BoardContentInput').props.value).toBe(
        'dummy_content',
      );
      expect(getByTestId('SaveChangesButton')).toBeTruthy();
      expect(getByTestId('DiscardChangesButton')).toBeTruthy();
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

      const {saveChanges, discardChanges} = useGroupBoardController();

      fireEvent.press(getByTestId('SaveChangesButton'));
      fireEvent.press(getByTestId('DiscardChangesButton'));

      expect(saveChanges).toHaveBeenCalled();
      expect(discardChanges).toHaveBeenCalled();
    });
  });
});
