import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import generalStyles from '../../../styles/styles';
import useGroupSettingsController from './hooks/useGroupSettingsController';
import Dialog from 'react-native-dialog';
import stylesGroupSettingsScreen from '../../../styles/stylesGroupSettingsScreen';
import {User} from './types';

const GroupSettingsScreen: React.FunctionComponent = () => {
  const {
    confirmAndLeaveGroup,
    confirmAndDeleteGroup,
    generateJoinCode,
    dialogVisible,
    closeDialog,
    joinCode,
    confirmAndKickUser,
    confirmAndPromoteUser,
    copyJoinCodeToClipboard,
    groupUsers,
    isOwner,
    navigateGroupHome,
  } = useGroupSettingsController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={stylesGroupSettingsScreen.containerUsersPart}>
            <Text
              accessibilityLabel="Members"
              style={generalStyles.defaultHeader}>
              Members:
            </Text>
            <View style={stylesGroupSettingsScreen.containerUsers}>
              <ScrollView>
                {groupUsers.map((user: User) => (
                  <View
                    key={user.id}
                    style={stylesGroupSettingsScreen.listElement}>
                    <View style={stylesGroupSettingsScreen.containerRow}>
                      <Text
                        accessibilityLabel={`User: ${user.username}`}
                        style={stylesGroupSettingsScreen.textList}>
                        {user.username}
                      </Text>
                      {user.is_owner && (
                        <Image
                          source={require('../../../../assets/images/crownIcon.png')}
                          style={stylesGroupSettingsScreen.crownIconListElement}
                          testID="CrownIconOwner"
                          accessibilityLabel="Crown Icon for owner"
                        />
                      )}
                    </View>
                    {isOwner && (
                      <View style={stylesGroupSettingsScreen.containerRow}>
                        {!user.is_owner && (
                          <>
                            <TouchableOpacity
                              onPress={() =>
                                confirmAndPromoteUser(user.id.toString())
                              }>
                              <Image
                                source={require('../../../../assets/images/crownIcon.png')}
                                style={
                                  stylesGroupSettingsScreen.crownIconListElement
                                }
                                testID={`PromoteUserIcon-${user.username}`}
                                accessibilityLabel={`Promote User Icon for ${user.username}`}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() =>
                                confirmAndKickUser(user.id.toString())
                              }>
                              <Image
                                source={require('../../../../assets/images/crossIcon.png')}
                                style={stylesGroupSettingsScreen.crossIconList}
                                testID={`KickUserIcon-${user.username}`}
                                accessibilityLabel={`Kick User Icon for ${user.username}`}
                              />
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={stylesGroupSettingsScreen.containerButtons}>
            <View style={stylesGroupSettingsScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Leave group"
                  onPress={confirmAndLeaveGroup}
                  accessibilityLabel="Leave group button"
                  testID="LeaveGroupButton"
                />
              </View>
            </View>
            {isOwner && (
              <View style={stylesGroupSettingsScreen.containerButton}>
                <View style={generalStyles.defaultButton}>
                  <Button
                    title="Delete group"
                    onPress={confirmAndDeleteGroup}
                    accessibilityLabel="Delete group button"
                    testID="DeleteGroupButton"
                  />
                </View>
              </View>
            )}
            <View style={stylesGroupSettingsScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Get join code"
                  onPress={generateJoinCode}
                  accessibilityLabel="Get join code button"
                  testID="GetJoinCodeButton"
                />
              </View>
            </View>
            <View style={stylesGroupSettingsScreen.containerButton}>
              <View style={generalStyles.defaultButton}>
                <Button
                  title="Go back to Group Home"
                  onPress={navigateGroupHome}
                  accessibilityLabel="Go back to Group Home button"
                  testID="GoBackToGroupHomeButton"
                />
              </View>
            </View>
          </View>

          <Dialog.Container visible={dialogVisible}>
            <Dialog.Title accessibilityLabel="Join Code">
              Join Code
            </Dialog.Title>
            <Dialog.Description accessibilityLabel={`Join Code: ${joinCode}`}>
              {joinCode}
            </Dialog.Description>
            <Dialog.Button
              label="Close"
              onPress={closeDialog}
              accessibilityLabel="Close Dialog Button"
              testID="CloseDialogutton"
            />
            <Dialog.Button
              label="Copy"
              onPress={copyJoinCodeToClipboard}
              accessibilityLabel="Copy Join Code Button"
              testID="CopyJoinCodeButton"
            />
          </Dialog.Container>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupSettingsScreen;
