import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import generalStyles from '../../../../styles/styles';
import useGroupBoardController from './hooks/useGroupBoardController';
import stylesGroupBoardScreen from '../../../../styles/stylesGroupBoardScreen';

const GroupBoardScreen: React.FunctionComponent = () => {
  const {
    boardContent,
    setBoardContent,
    isEditable,
    allowEdit,
    saveChanges,
    navigateGroupHome,
  } = useGroupBoardController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={stylesGroupBoardScreen.containerHeader}>
            <Text
              accessibilityLabel="Group Board"
              style={generalStyles.defaultHeader}>
              {' '}
              Group Board{' '}
            </Text>
          </View>
          <View style={stylesGroupBoardScreen.containerButtonAndBoard}>
            <View style={stylesGroupBoardScreen.containerBoard}>
              <ScrollView>
                {isEditable ? (
                  <TextInput
                    multiline
                    autoCapitalize="none"
                    value={boardContent}
                    onChangeText={setBoardContent}
                    accessibilityLabel="Board content input"
                    testID="BoardContentInput"
                  />
                ) : (
                  <Text accessibilityLabel={`Board Content: ${boardContent}`}>
                    {boardContent}
                  </Text>
                )}
              </ScrollView>
            </View>

            {isEditable ? (
              <View style={stylesGroupBoardScreen.containerBoardButton}>
                <Button
                  title="Save"
                  onPress={saveChanges}
                  accessibilityLabel="Save changes button"
                  testID="SaveChangesButton"
                />
              </View>
            ) : (
              <View style={stylesGroupBoardScreen.containerBoardButton}>
                <Button
                  title="Edit"
                  onPress={allowEdit}
                  accessibilityLabel="Allow edition button"
                  testID="AllowEditionButton"
                />
              </View>
            )}
          </View>

          <View style={generalStyles.defaultContainerButton}>
            <View style={generalStyles.defaultButton}>
              <Button
                title="Go to Group Home"
                onPress={navigateGroupHome}
                accessibilityLabel="Go to Group Home button"
                testID="GoToGroupHomeButton"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupBoardScreen;
