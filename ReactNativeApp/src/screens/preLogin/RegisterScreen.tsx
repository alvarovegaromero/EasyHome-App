import React from 'react';
import {View, TextInput, SafeAreaView, ScrollView, Text} from 'react-native';
import stylesRegisterScreen from '../../styles/stylesRegisterScreen';
import generalStyles from '../../styles/styles';
import useRegisterController from './hooks/useRegisterController';
import ButtonWithIcon from '../../utils/ButtonWithIcon/ButtonWithIcon';

const RegisterScreen: React.FunctionComponent = () => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    handleRegisterSubmit,
    navigateLoginScreen,
    navigateResetPasswordScreen,
  } = useRegisterController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView style={generalStyles.defaultScrollView}>
        <View style={stylesRegisterScreen.containerRegisterInputsAndButton}>
          <View style={stylesRegisterScreen.containerRegisterInputs}>
            <View style={generalStyles.defaultContainerTextAndInput}>
              <Text
                accessibilityLabel="Username:"
                style={generalStyles.defaultTextStyleLoginRegisterReset}>
                Username:
              </Text>
              <TextInput
                style={stylesRegisterScreen.registerInputs}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                accessibilityLabel="Username input field"
                testID="UsernameInput"
              />
            </View>
            <View style={generalStyles.defaultContainerTextAndInput}>
              <Text
                accessibilityLabel="Email:"
                style={generalStyles.defaultTextStyleLoginRegisterReset}>
                Email:
              </Text>
              <TextInput
                style={stylesRegisterScreen.registerInputs}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                accessibilityLabel="Email input field"
                testID="EmailInput"
              />
            </View>
            <View style={generalStyles.defaultContainerTextAndInput}>
              <Text
                accessibilityLabel="Password:"
                style={generalStyles.defaultTextStyleLoginRegisterReset}>
                Password:
              </Text>
              <TextInput
                style={stylesRegisterScreen.registerInputs}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                accessibilityLabel="Password input field"
                testID="PasswordInput"
              />
            </View>
            <View style={generalStyles.defaultContainerTextAndInput}>
              <Text
                accessibilityLabel="Confirm Password:"
                style={generalStyles.defaultTextStyleLoginRegisterReset}>
                Confirm Password:
              </Text>
              <TextInput
                style={stylesRegisterScreen.registerInputs}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                accessibilityLabel="Confirm Password input field"
                testID="ConfirmPasswordInput"
              />
            </View>
            <View style={generalStyles.defaultContainerTextAndInput}>
              <Text
                accessibilityLabel="First Name (optional):"
                style={generalStyles.defaultTextStyleLoginRegisterReset}>
                First Name (optional):
              </Text>
              <TextInput
                style={stylesRegisterScreen.registerInputs}
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="none"
                accessibilityLabel="First Name input field"
                testID="FirstNameInput"
              />
            </View>
            <View style={generalStyles.defaultContainerTextAndInput}>
              <Text
                accessibilityLabel="Last Name (optional):"
                style={generalStyles.defaultTextStyleLoginRegisterReset}>
                Last Name (optional):
              </Text>
              <TextInput
                style={stylesRegisterScreen.registerInputs}
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="none"
                accessibilityLabel="Last Name input field"
                testID="LastNameInput"
              />
            </View>
          </View>
          <View style={generalStyles.defaultContainerButton}>
            <View style={generalStyles.defaultButton}>
              <ButtonWithIcon
                title="REGISTER"
                onPress={handleRegisterSubmit}
                accessibilityLabel="Register button"
                testID="RegisterButton"
                name="account-plus"
              />
            </View>
          </View>
        </View>

        <View style={stylesRegisterScreen.containerOtherInfo}>
          <View style={stylesRegisterScreen.containerLogin}>
            <Text
              accessibilityLabel="Already joined? Use log in"
              style={generalStyles.defaultTextStyleLoginRegisterReset}>
              Already joined? Use log in
            </Text>
            <View style={generalStyles.defaultContainerButton}>
              <View style={generalStyles.defaultButton}>
                <ButtonWithIcon
                  title="LOGIN"
                  onPress={navigateLoginScreen}
                  accessibilityLabel="Button for redirection to login page"
                  testID="LoginButton"
                  name="login"
                />
              </View>
            </View>
          </View>

          <View style={stylesRegisterScreen.containerResetPassword}>
            <Text
              accessibilityLabel="Forgot your password?"
              style={generalStyles.defaultTextStyleLoginRegisterReset}>
              Forgot your password?
            </Text>
            <View style={generalStyles.defaultContainerButton}>
              <View style={generalStyles.defaultButton}>
                <ButtonWithIcon
                  title="RESET PASSWORD"
                  onPress={navigateResetPasswordScreen}
                  accessibilityLabel="Button for redirection to reset password page"
                  testID="ResetPasswordButton"
                  name="lock-reset"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
