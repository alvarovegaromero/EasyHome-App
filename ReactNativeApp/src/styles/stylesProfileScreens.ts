import {StyleSheet} from 'react-native';
import generalStyles from './styles';

const stylesProfileScreen = StyleSheet.create({
  containerProfileScreen: {
    ...generalStyles.defaultContainerScreen,
    marginLeft: 10,
  },

  containerSection: {
    flexDirection: 'row',
    marginTop: 10,
  },

  textsMyProfile: {
    fontSize: 18,
  },

  styleTextTitleSection: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },

  containerEditIcons: {
    flexDirection: 'row',
    marginLeft: 10,
  },

  styleTextEditTitleSection: {
    fontSize: 18,
    marginBottom: 2,
    marginTop: 5,
  },

  containerEditIcon: {
    marginTop: 20,
  },
});

export default stylesProfileScreen;
