import {SafeAreaView, ScrollView, Text, TextInput, View} from 'react-native';
import generalStyles from '../../../../styles/styles';
import useGroupBoardController from './hooks/useGroupBoardController';
import stylesGroupBoardScreen from '../../../../styles/stylesGroupBoardScreen';
import GroupFooter from '../../../../utils/GroupFooter/GroupFooter';
import {Icon} from '@rneui/themed';
import Header from '../../../../utils/Header/Header';

const GroupBoardScreen: React.FunctionComponent = () => {
  const {
    boardContent,
    setBoardContent,
    isEditable,
    allowEdit,
    discardChanges,
    saveChanges,
  } = useGroupBoardController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <Header secctionText="Group Board" />
        <View style={generalStyles.defaultContainerScreen}>
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
                <Icon
                  name="content-save"
                  type="material-community"
                  reverse
                  reverseColor="white"
                  color="#2196F3"
                  accessibilityLabel="Save changes button"
                  onPress={saveChanges}
                  size={40}
                  testID="SaveChangesButton"
                />
                <Icon
                  name="close-thick"
                  type="material-community"
                  reverse
                  reverseColor="white"
                  color="#FF7F50"
                  accessibilityLabel="Discard changes button"
                  onPress={discardChanges}
                  size={40}
                  testID="DiscardChangesButton"
                />
              </View>
            ) : (
              <View style={stylesGroupBoardScreen.containerBoardButton}>
                <Icon
                  name="pencil"
                  type="material-community"
                  reverse
                  reverseColor="white"
                  color="#2196F3"
                  accessibilityLabel="Allow edition button"
                  onPress={allowEdit}
                  size={40}
                  testID="AllowEditionButton"
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <GroupFooter activeSection="Board" />
    </SafeAreaView>
  );
};

export default GroupBoardScreen;
