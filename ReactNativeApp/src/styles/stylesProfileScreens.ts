import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesProfileScreen = StyleSheet.create({
  containerProfile: {
    ...generalStyles.defaultLateralMargins,
    marginTop: 40,
  },

  headerMyProfile: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  textsMyProfile: {
    marginTop: 10,
    fontSize: 18,
  },

  containerButtonsProfile: {
    ...generalStyles.defaultLateralMargins,
    marginTop: 20,
  },

  containerGoBackButton: {
    marginTop: 20,
  },

  containerEditProfileButton: {
    marginTop: 20,
  },
});

export default stylesProfileScreen;
