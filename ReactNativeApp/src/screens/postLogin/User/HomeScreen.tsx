import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useHomeController from './hooks/useHomeController';
import {Group} from './types';
import Dialog from 'react-native-dialog';
import generalStyles from '../../../styles/styles';
import stylesHomeScreen from '../../../styles/stylesHomeScreen';
import {Icon} from '@rneui/base';

const HomeScreen: React.FunctionComponent = () => {
  const {
    username,
    groups,
    handleLogout,
    showDialog,
    closeDialog,
    dialogVisible,
    setJoinCode,
    joinGroup,
    navigateGroupHomeScreen,
    navigateProfileScreen,
    navigateCreateGroupScreen,
  } = useHomeController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
        <View style={generalStyles.defaultContainerScreen}>
          <View style={stylesHomeScreen.containerHeaders}>
            <Text
              accessibilityLabel={`Hello ${username}`}
              style={generalStyles.defaultHeader}>
              Hello {username}!
            </Text>
            <Text
              accessibilityLabel="Select the group you want to see:"
              style={generalStyles.defaultSubHeader}>
              Select the group you want to see:
            </Text>
          </View>

          <View style={stylesHomeScreen.containerGroups}>
            <ScrollView>
              {groups.length === 0 ? (
                <View style={stylesHomeScreen.containerNoGroups}>
                  <Text
                    accessibilityLabel="You are not part of any group"
                    style={stylesHomeScreen.textNoGroups}>
                    You are not part of any group yet :(
                  </Text>
                  <Text
                    accessibilityLabel="Join or Create a Group to see them here"
                    style={stylesHomeScreen.textNoGroups}>
                    Join or Create a Group to see them here
                  </Text>
                </View>
              ) : (
                <>
                  <Text style={stylesHomeScreen.listTitle}> Your Groups: </Text>
                  {groups.map((group: Group) => (
                    <TouchableOpacity
                      key={group.id}
                      style={stylesHomeScreen.listButton}
                      onPress={() =>
                        navigateGroupHomeScreen(
                          group.id.toString(),
                          group.owner,
                        )
                      }>
                      <Icon name="group" size={24} color="#000" />
                      <Text
                        accessibilityLabel={`Group name: ${group.name}`}
                        style={stylesHomeScreen.styleTextGroup}>
                        {group.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </ScrollView>
          </View>

          <View style={stylesHomeScreen.containerButtons}>
            <View style={stylesHomeScreen.container2Buttons}>
              <Icon
                name="home-group-plus"
                type="material-community"
                reverse
                reverseColor="white"
                color="#2196F3"
                accessibilityLabel="Create a Group"
                onPress={navigateCreateGroupScreen}
                size={60}
                testID="CreateGroupButton"
              />
              <Icon
                name="account-multiple-plus"
                type="material-community"
                reverse
                reverseColor="white"
                color="#2196F3"
                accessibilityLabel="Join a Group"
                onPress={showDialog}
                size={60}
                testID="JoinGroupButton"
              />
            </View>

            <View style={stylesHomeScreen.container2Buttons}>
              <Icon
                name="account"
                type="material-community"
                reverse
                reverseColor="white"
                color="#2196F3"
                accessibilityLabel="Navigate to Profile"
                onPress={navigateProfileScreen}
                size={60}
                testID="ProfileButton"
              />
              <Icon
                name="logout"
                type="material-community"
                reverse
                reverseColor="white"
                color="#FF7F50"
                accessibilityLabel="Logout"
                onPress={handleLogout}
                size={60}
                testID="LogoutButton"
              />
            </View>
          </View>

          <Dialog.Container visible={dialogVisible}>
            <Dialog.Title>Join Group</Dialog.Title>
            <Dialog.Description>
              Enter the join code for the group you want to join.
            </Dialog.Description>
            <Dialog.Input
              onChangeText={setJoinCode}
              accessibilityLabel="Input for entering the join code"
            />
            <Dialog.Button
              label="Cancel"
              onPress={closeDialog}
              accessibilityLabel="Cancel button"
            />
            <Dialog.Button
              label="Join"
              onPress={joinGroup}
              accessibilityLabel="Join button"
            />
          </Dialog.Container>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
