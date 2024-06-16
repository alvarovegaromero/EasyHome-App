import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesLoginScreen = StyleSheet.create({
  containerRegisterInputsAndButton: {
    ...generalStyles.defaultLateralMargins,
    marginTop: 20,
    marginBottom: 55,
  },

  containerRegisterInputs: {
    marginBottom: 10,
  },

  containerOtherInfo: {
    ...generalStyles.defaultLateralMargins,
  },

  containerLogin: {
    alignItems: 'center',
    marginBottom: 20,
  },

  containerResetPassword: {
    alignItems: 'center',
    marginBottom: 20,
  },

  registerInputs: {
    ...generalStyles.defaultInput,
    height: 40,
  },

  containerLastNameInput: {
    marginBottom: 0,
  },
});

export default stylesLoginScreen;
