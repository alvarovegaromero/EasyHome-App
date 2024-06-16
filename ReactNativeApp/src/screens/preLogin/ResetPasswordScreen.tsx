import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import stylesResetPasswordScreen from '../../styles/stylesResetPasswordScreen';
import generalStyles from '../../styles/styles';
import useResetPasswordController from './hooks/useResetPasswordController';
import ButtonWithIcon from '../../utils/ButtonWithIcon/ButtonWithIcon';

const ResetPasswordScreen: React.FunctionComponent = () => {
  const {
    email,
    setEmail,
    handleResetPasswordSubmit,
    navigateLoginScreen,
    navigateRegisterScreen,
  } = useResetPasswordController();

  return (
    <SafeAreaView style={generalStyles.defaultSafeAreaView}>
      <ScrollView contentContainerStyle={generalStyles.defaultScrollView}>
        <View style={stylesResetPasswordScreen.containerInitialImage}>
          <Image
            source={require('../../../assets/images/logoWithTextNoBackground.png')}
            style={stylesResetPasswordScreen.logo}
            accessibilityLabel="EasyHome logo"
            testID="Logo"
          />
        </View>

        <View style={stylesResetPasswordScreen.containerInputs}>
          <Text
            accessibilityLabel="Write your email so we can send you an email 
                                for resetting your password"
            style={stylesResetPasswordScreen.textHeaderResetPassword}>
            Write your email so we can send you an email for resetting your
            password
          </Text>
          <View style={stylesResetPasswordScreen.containerInputEmail}>
            <Text
              style={generalStyles.defaultTextStyleLoginRegisterReset}
              accessibilityLabel="email">
              Email:
            </Text>
            <TextInput
              style={generalStyles.defaultInput}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              accessibilityLabel="Input for the username"
              testID="EmailInput"
            />
          </View>
          <View style={generalStyles.defaultContainerButton}>
            <View style={generalStyles.defaultButton}>
              <ButtonWithIcon
                title="RESET PASSWORD"
                onPress={handleResetPasswordSubmit}
                accessibilityLabel="Reset password button"
                testID="ResetPasswordButton"
                name="lock-reset"
              />
            </View>
          </View>
        </View>

        <View style={stylesResetPasswordScreen.containerOtherInfo}>
          <View
            style={stylesResetPasswordScreen.containerRegisterAndResetPassword}>
            <View style={stylesResetPasswordScreen.containerLogin}>
              <Text
                style={generalStyles.defaultTextStyleLoginRegisterReset}
                accessibilityLabel="Already joined? Use log in">
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

            <View style={stylesResetPasswordScreen.containerRegister}>
              <Text
                style={generalStyles.defaultTextStyleLoginRegisterReset}
                accessibilityLabel="Want to join? Register!">
                Want to join? Register!
              </Text>
              <View style={generalStyles.defaultContainerButton}>
                <View style={generalStyles.defaultButton}>
                  <ButtonWithIcon
                    title="REGISTER"
                    onPress={navigateRegisterScreen}
                    accessibilityLabel="Button for redirection to register page"
                    testID="RegisterButton"
                    name="account-plus"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
