import {
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
import GroupFooter from '../../../utils/GroupFooter/GroupFooter';
import {Icon} from '@rneui/themed';

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
              <Icon
                name="exit-to-app"
                type="material-community"
                reverse
                reverseColor="white"
                color="#FF7F50"
                accessibilityLabel="Leave Group Button"
                onPress={confirmAndLeaveGroup}
                size={50}
                testID="LeaveGroupButton"
              />
            </View>
            {isOwner && (
              <View style={stylesGroupSettingsScreen.containerButton}>
                <Icon
                  name="delete"
                  type="material-community"
                  reverse
                  reverseColor="white"
                  color="#FF7F50"
                  accessibilityLabel="Delete Group Button"
                  onPress={confirmAndDeleteGroup}
                  size={50}
                  testID="DeleteGroupButton"
                />
              </View>
            )}
            <View
              style={
                !isOwner
                  ? stylesGroupSettingsScreen.containerButton
                  : stylesGroupSettingsScreen.lastButtonContainer
              }>
              <Icon
                name="share-variant"
                type="material-community"
                reverse
                reverseColor="white"
                color="#2196F3"
                accessibilityLabel="Get join code"
                onPress={generateJoinCode}
                size={50}
                testID="GetJoinCodeButton"
              />
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
      <GroupFooter activeSection="GroupSettings" />
    </SafeAreaView>
  );
};

export default GroupSettingsScreen;
