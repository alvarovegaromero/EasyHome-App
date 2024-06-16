import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesLoginScreen = StyleSheet.create({
  containerInitialImage: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 254, //as image is not a perfect square, height is not equal to width.
  },

  containerLoginInputs: {
    ...generalStyles.defaultLateralMargins,
    flex: 0.3,
  },
  containerInputUsername: {
    marginBottom: 10,
  },
  containerInputPassword: {
    marginBottom: 10,
  },
  containerOtherInfo: {
    ...generalStyles.defaultLateralMargins,
    flex: 0.4,
  },

  containerRegister: {
    alignItems: 'center',
    marginBottom: 20,
  },

  containerResetPassword: {
    alignItems: 'center',
    marginBottom: 20,
  },

  containerRegisterAndResetPassword: {
    flex: 0.3,
  },

  containerVersion: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default stylesLoginScreen;
