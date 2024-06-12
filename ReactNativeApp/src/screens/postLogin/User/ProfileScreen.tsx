import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import generalStyles from '../../../styles/styles';
import stylesProfileScreen from '../../../styles/stylesProfileScreens';
import useProfileController from './hooks/useProfileController';
import {Icon} from '@rneui/themed';
import Header from '../../../utils/Header/Header';

const ProfileScreen: React.FunctionComponent = () => {
  const {username, email, firstName, lastName, navigateEditProfileScreen} =
    useProfileController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <Header secctionText="My Profile" />
        <View style={generalStyles.defaultContainerScreen}>
          <View style={stylesProfileScreen.containerProfileScreen}>
            <View style={stylesProfileScreen.containerSection}>
              <Text
                accessibilityLabel={`Username:`}
                style={stylesProfileScreen.styleTextTitleSection}>
                Username:
              </Text>

              <Text
                accessibilityLabel={`${username}`}
                style={stylesProfileScreen.textsMyProfile}>
                {username}
              </Text>
            </View>
            <View style={stylesProfileScreen.containerSection}>
              <Text
                accessibilityLabel={`Email:`}
                style={stylesProfileScreen.styleTextTitleSection}>
                Email:
              </Text>
              <Text
                accessibilityLabel={` ${email}`}
                style={stylesProfileScreen.textsMyProfile}>
                {email}
              </Text>
            </View>

            <View style={stylesProfileScreen.containerSection}>
              <Text
                accessibilityLabel={`First name:`}
                style={stylesProfileScreen.styleTextTitleSection}>
                First Name:
              </Text>
              <Text
                accessibilityLabel={`${firstName ? firstName : 'No name provided'}`}
                style={stylesProfileScreen.textsMyProfile}>
                {firstName ? (
                  firstName
                ) : (
                  <Text style={generalStyles.redColor}>No name provided</Text>
                )}
              </Text>
            </View>
            <View style={stylesProfileScreen.containerSection}>
              <Text
                accessibilityLabel={`Last name:`}
                style={stylesProfileScreen.styleTextTitleSection}>
                Last Name:
              </Text>
              <Text
                accessibilityLabel={`Last name:`}
                style={stylesProfileScreen.textsMyProfile}>
                {lastName ? (
                  lastName
                ) : (
                  <Text style={generalStyles.redColor}>
                    No last name provided
                  </Text>
                )}
              </Text>
            </View>
          </View>

          <View style={stylesProfileScreen.containerEditIcon}>
            <Icon
              name="pencil"
              type="material-community"
              reverse
              reverseColor="white"
              color="#2196F3"
              accessibilityLabel="Edit profile data button"
              onPress={navigateEditProfileScreen}
              size={40}
              testID="EditProfileButton"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
